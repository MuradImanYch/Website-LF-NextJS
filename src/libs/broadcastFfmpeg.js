const { spawn, exec } = require('child_process');
const cron = require('node-cron');
const db = require('./db');

// Функция для трансляции и записи
async function startStreamingAndRecording(url, broadcastLink) {
    const broadcastLinks = broadcastLink.split(' '); // Массив ссылок для потоков
    const matchDir = `/var/www/html/lf-nextjs/public/hls/${url}`;

    // Создаем папку для записи HLS и WebM
    exec(`mkdir -p ${matchDir}`, (error) => {
        if (error) {
            console.error(`Ошибка создания директории: ${error.message}`);
            return;
        }
    });

    // Делаем изначально NULL для broadcastLink
    await db.query('UPDATE broadcasts SET broadcastLink = NULL WHERE url = ?', [url]);

    // Обновляем статус трансляции на "live"
    await db.query('UPDATE broadcasts SET status = ? WHERE url = ?', ['live', url]);

    // Массив для хранения всех ссылок на .webm
    const webmLinks = [];

    // Запускаем процесс для каждой ссылки
    for (const [index, link] of broadcastLinks.entries()) {
        // Добавляем ссылку в broadcastLink, как есть
        await db.query(
            'UPDATE broadcasts SET broadcastLink = CONCAT(IFNULL(broadcastLink, ""), " ", ?) WHERE url = ?',
            [link, url]
        );

        // Проверяем, содержит ли ссылка значение "185.236.230.34:8280"
        if (!link.includes("185.236.230.34:8280")) {
            console.log(`Пропущена обработка для ссылки: ${link}`);
            continue; // Пропустить обработку этой ссылки
        }

        const flag = link.split('_flag_')[1] || ''; // Получаем флаг

        // HLS процесс
        const hlsProcess = spawn('/usr/bin/ffmpeg', [
            '-i', link.split('_flag_')[0],
            '-i', '/var/www/html/lf-nextjs/public/assets/ico/tv-logo.webp',
            '-filter_complex', '[1]scale=150:120[logo];[0]scale=854:480[video];[video][logo]overlay=W-w-30:0',
            '-c:v', 'libx264',
            '-preset', 'ultrafast', // Ультрабыстрая предустановка
            '-crf', '28',           // Высокое значение для уменьшения размера файла
            '-c:a', 'aac',
            '-b:a', '96k',          // Низкий битрейт для аудио
            '-f', 'hls',
            '-hls_time', '10',
            '-hls_list_size', '6',
            '-hls_flags', 'delete_segments',
            '-hls_segment_filename', `/var/www/html/lf-nextjs/public/hls/${url}-${index}_%03d.ts`,
            '-t', '02:30:00', // Ограничение времени для HLS
            `/var/www/html/lf-nextjs/public/hls/${url}-${index}.m3u8`
        ]);

        // WebM процесс
        const webmProcess = spawn('/usr/bin/ffmpeg', [
            '-i', link.split('_flag_')[0],
            '-i', '/var/www/html/lf-nextjs/public/assets/ico/tv-logo.webp',
            '-filter_complex', '[1]scale=150:120[logo];[0]scale=854:480[video];[video][logo]overlay=W-w-30:0',
            '-c:v', 'libvpx',
            '-b:v', '600k',          // Низкий битрейт
            '-c:a', 'libvorbis',
            '-b:a', '96k',           // Низкий битрейт для аудио
            '-t', '02:30:00',       // Ограничение времени для WebM
            `/var/www/html/lf-nextjs/public/hls/${url}/${url}-${index}.webm`
        ]);

        // Логирование ошибок HLS процесса
        hlsProcess.stderr.on('data', (data) => {
            console.error(`HLS ошибка: ${data.toString()}`);
        });

        // Завершение HLS процесса
        hlsProcess.on('close', async (code) => {
            console.log(`HLS процесс завершен с кодом ${code}`);
            if (code === 0) {
                // Удаление файлов .ts и .m3u8 для данного url
                exec(`rm -f /var/www/html/lf-nextjs/public/hls/${url}-${index}_*.ts /var/www/html/lf-nextjs/public/hls/${url}-${index}.m3u8`, (error) => {
                    if (error) {
                        console.error(`Ошибка удаления файлов: ${error.message}`);
                    } else {
                        console.log(`Файлы .ts и .m3u8 для ${url}-${index} успешно удалены`);
                    }
                });
            } else {
                console.error(`Ошибка завершения HLS, код: ${code}`);
            }
        });

        // Логирование ошибок WebM процесса
        webmProcess.stderr.on('data', (data) => {
            console.error(`WebM ошибка: ${data.toString()}`);
        });

        // Завершение WebM процесса
        webmProcess.on('close', async (code) => {
            console.log(`WebM процесс завершен с кодом ${code}`);
            if (code === 0) {
                const webmLink = `https://legfootball.com/hls/${url}/${url}-${index}.webm_flag_${flag}`;
                webmLinks.push(webmLink); // Добавляем ссылку в массив

                // После успешного завершения обновляем статус
                await db.query('UPDATE broadcasts SET status = ? WHERE url = ?', ['finished', url]);
            } else {
                console.error(`Ошибка записи WebM, завершено с кодом: ${code}`);
            }

            // Обновление replyLink после завершения всех процессов
            if (webmLinks.length === broadcastLinks.length) {
                await db.query('UPDATE broadcasts SET replyLink = CONCAT(IFNULL(replyLink, ""), " ", ?) WHERE url = ?', [webmLinks.join(' '), url]);
            }
        });
    }
}

// Планируем выполнение трансляции и записи через cron
cron.schedule('*/1 * * * *', async () => { // Проверка каждую минуту
    let connection;
    try {
        connection = await db.getConnection();
        const [matches] = await connection.query('SELECT * FROM broadcasts WHERE status = "scheduled"');
        const now = new Date();

        matches.forEach(match => {
            const matchTime = new Date(`${new Date().toDateString()} ${match.time}`);
            const startTime = new Date(matchTime.getTime() - 15 * 60000); // Старт за 15 минут до матча

            if (now >= startTime && match.status === 'scheduled') {
                startStreamingAndRecording(match.url, match.broadcastLink); // Запуск трансляции
            }
        });
    } catch (err) {
        console.error(err);
    } finally {
        if (connection) connection.release();
    }
});