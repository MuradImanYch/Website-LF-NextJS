const db = require('./db');
const fs = require('fs');
const path = require('path');
const OpenAI = require('openai');
const cheerio = require('cheerio');
const axios = require('axios');
const openai = new OpenAI({
    apiKey: process.env.OPENAI_KEY,
});
const config = require('../../public/conf.json');

async function updateSitemap() {
    try {
        const [rows] = await db.query('SELECT url, urlEn, date FROM news');
        if (rows.length > 0) {
            let sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>\n`;
            sitemapContent += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

            rows.forEach(row => {
                // Преобразуем дату в объект Date
                const date = new Date(row.date);

                // Форматируем дату вручную в формат "YYYY-MM-DDTHH:MM:SS+00:00"
                const formattedDate = date.toISOString().replace('Z', '+00:00');

                // URL для основного и английского версий
                const urls = [
                    { loc: `${config.domain}/news/read/${row.url}`, lastmod: formattedDate },
                    { loc: `${config.domain}/en/news/read/${row.urlEn}`, lastmod: formattedDate }
                ];

                urls.forEach(url => {
                    sitemapContent += `  <url>\n`;
                    sitemapContent += `    <loc>${url.loc}</loc>\n`;
                    sitemapContent += `    <lastmod>${url.lastmod}</lastmod>\n`;
                    sitemapContent += `    <changefreq>daily</changefreq>\n`; // Добавлено значение changefreq
                    sitemapContent += `    <priority>0.8</priority>\n`; // Добавлено значение priority
                    sitemapContent += `  </url>\n`;
                });
            });

            sitemapContent += `</urlset>`;

            // Запись в файл sitemap-news.xml
            const filePath = path.join('/var/www/html/lf-nextjs/public', 'sitemap-news.xml');
            fs.writeFileSync(filePath, sitemapContent);
            console.log('sitemap-news.xml успешно обновлён');
        }
    } catch (error) {
        console.error('Ошибка при обновлении sitemap-news.xml:', error);
    }
}

const autoGenerateNews = () => {
    setInterval(async () => {
        let links = ['https://www.liveresult.ru/news/Futbol', 'https://news.sportbox.ru/Vidy_sporta/Futbol', 'https://terrikon.com/football'];
        let selectedLink = links[Math.floor(Math.random() * links.length)];

        await axios.get(selectedLink)
        .then(response => response.data)
        .then(response => {
            const $ = cheerio.load(response);

            if (selectedLink.includes('liveresult.ru')) {
                axios.get('https://www.liveresult.ru' + $('body > liveresult-root > main > section > article:nth-child(1) > div > header > div > a').attr('href'))
                    .then(response => response.data)
                    .then(async response => {
                        const $ = cheerio.load(response);
            
                        async function main() {
                            const imgSrc = $('body > liveresult-root > main > article > div.article-media > figure > img').attr('src');
                            
                            if (imgSrc) {
                                const jsonData = await openai.chat.completions.create({
                                    messages: [{ role: 'user', content: `Прошу тебя выступить в роли профессионального копирайтера и переосмыслить предоставленный текст, используя синонимы, чтобы создать уникальную версию, в которой используется естественный стиль. Пожалуйста, сохраните исходное форматирование и смысл текста, придерживаясь красивого литературного языка и избегая стилистических и грамматических ошибок. Предоставленный текст будет разделен на части, однако помните, что он образует единую целостность. Пожалуйста, обеспечь высокую сложность и разнообразие контента, чтобы избежать повторов и успешно пройти проверку на уникальность. Вот текст: ${$('.article-text').find('p').text()} На выходе предоставь JSON-объект в следующем формате: {"title": Составь уникальные SEO заголовок этой статьи, после того как сделал копирайтинг и рерайтинг под вышеуказанное условие. Так же удали упоминание источника сайта и всяких ссылок. Обязательно оберни название футбольных команд и клубов в эти «» кавычки, "description": Составь небольшое уникальное SEO превью. Так же удали упоминание источника сайта и всяких ссылок. Обязательно оберни название футбольных команд и клубов в эти «» кавычки, "keywords": Составь ключевые слова под этот текст. Делай все через запятую и с маленькой буквой. Тут не надо обворачивать названия клубов в кавычки. Так же удали упоминание источника сайта и всяких ссылок, так же возьми ключевые слова упомянутые в title и description. Исключение слов: "футбол", "спорт", "content": Ну и самое главное, сделай полный рерайтинг и копирайтинг этой новости так, чтобы она была уникальная и SEO. Замени все слова, все предложения на аналогичный смысл, чтобы не был плагиатом. Так же составь правильную структуру текста, по грамматике, по абзацу и замени некоторые слова на синонимы или похожее по смыслу. Обязательно составь текст по абзацам и оберни абзац в тег "<p>". Так же удали упоминание источника сайта и всяких ссылок. Обязательно оберни название футбольных команд и клубов в эти «» кавычки, "category": напиши правильную категорию турнира или лиги. Можешь написать на латинице или кириллице. Можешь использовать сокращённое слово или аббревиатуру для турнира или лиги которая упоминается в этой новости. Исключение слов: "футбол", "спорт", "tags": Тут составь  массив тегов, которые подходят для этой новости. Можешь написать на латинице и кириллице. Можешь использовать сокращённые слова или аббревиатуры для турнира или лиги которая упоминается в этой новости. Исключение слов: "футбол", "спорт", "img": ${imgSrc}, "url": Через транслитом составь url структуру исходя из заголовка только на латинице, "titleEn": Аналогично на английском, "descriptionEn": Аналогично на английском, "keywordsEn": Аналогично на английском, "contentEn": Аналогично на английском, "categoryEn": Аналогично на английском, "tagsEn": Аналогично на английском, "urlEn": составь url структуру исходя из английского заголовка} Пожалуйста, убедись, что в JSON нет тройных обратных кавычек или других специальных символов. Все строки и ключи должны быть заключены в двойные кавычки. Пожалуйста, предоставь только JSON. Верни только JSON-объект, без объяснений.`}], 
                                    model: 'gpt-4o',
                                });
            
                                // Получение данных JSON
                                const parsedData = JSON.parse(jsonData.choices[0].message.content.replaceAll('json', '').replaceAll('```', ''));
            
                                // Скачивание изображения
                                const savePath = path.join('/var/www/html/lf-nextjs/public/assets/news'); // Путь для сохранения на сервере
                                const imgName = parsedData.urlEn.replace(/[^a-zA-Z0-9-_]/g, '') + path.extname(imgSrc); // Используем urlEn для имени файла
                                const localImageUrl = `${imgName}`; // Локальный путь для БД
            
                                // Создаем папку, если её нет
                                if (!fs.existsSync(savePath)) {
                                    fs.mkdirSync(savePath, { recursive: true });
                                }
            
                                try {
                                    // Загружаем изображение и сохраняем его локально
                                    const responseImage = await axios.get(imgSrc, { responseType: 'arraybuffer' });
                                    fs.writeFileSync(path.join(savePath, imgName), responseImage.data);
            
                                    // Вставка данных в БД
                                    await db.query('INSERT INTO `news` (category, title, img, content, meta_description, meta_keywords, author, tags, titleEn, meta_descriptionEn, meta_keywordsEn, contentEn, categoryEn, tagsEn, url, urlEn) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', 
                                        [
                                            parsedData.category,
                                            parsedData.title,
                                            localImageUrl, // Локальный URL для изображения
                                            parsedData.content,
                                            parsedData.description,
                                            parsedData.keywords,
                                            '',
                                            JSON.stringify(parsedData.tags),
                                            parsedData.titleEn,
                                            parsedData.descriptionEn,
                                            parsedData.keywordsEn,
                                            parsedData.contentEn,
                                            parsedData.categoryEn,
                                            JSON.stringify(parsedData.tagsEn),
                                            parsedData.url,
                                            parsedData.urlEn
                                        ]
                                    );
            
                                    setTimeout(async () => {
                                        // Обновление url и urlEn
                                        const [result] = await db.query(`SELECT MAX(id) AS maxId FROM news`);
                                        if (result.length > 0) {
                                            const maxId = result[0].maxId;
            
                                            const [recordResult] = await db.query(`SELECT * FROM news WHERE id = ?`, [maxId]);
                                            if (recordResult.length > 0) {
                                                const lastRecord = recordResult[0];
                                                const newUrl = `${lastRecord.id}-${lastRecord.url}`;
                                                const newUrlEn = `${lastRecord.id}-${lastRecord.urlEn}`;
            
                                                // Обновление записи с добавлением id в начало URL
                                                await db.query(`UPDATE news SET url = ?, urlEn = ? WHERE id = ?`, [newUrl, newUrlEn, maxId]);
                                                console.log('URL и URL_EN успешно обновлены.');
                                            }
                                        }
                                    }, 3000);
            
                                    console.log('Новость успешно добавлена');
                                } catch (error) {
                                    console.error('Ошибка при скачивании изображения:', error);
                                }
                            }
                        }
            
                        main();
                    })
                    .catch(err => { console.log(err); });
            }

            if (selectedLink.includes('news.sportbox.ru')) {
                axios.get('https://news.sportbox.ru' + $('.grid-padding-left-right-15 li:nth-child(1) div a').attr('href'))
                    .then(response => response.data)
                    .then(async response => {
                        const $ = cheerio.load(response);
            
                        async function main() {
                            const imgSrc = $('#node-content > div.col-lg-8.col-md-8.col-sm-12.col-xs-12 > div.node-content__body > div.node-content__logo > a > img').attr('src');
                            
                            if (imgSrc) {
                                const jsonData = await openai.chat.completions.create({
                                    messages: [{ role: 'user', content: `Прошу тебя выступить в роли профессионального копирайтера и переосмыслить предоставленный текст, используя синонимы, чтобы создать уникальную версию, в которой используется естественный стиль. Пожалуйста, сохраните исходное форматирование и смысл текста, придерживаясь красивого литературного языка и избегая стилистических и грамматических ошибок. Предоставленный текст будет разделен на части, однако помните, что он образует единую целостность. Пожалуйста, обеспечь высокую сложность и разнообразие контента, чтобы избежать повторов и успешно пройти проверку на уникальность. Вот текст: ${$('.js-mediator-article').find('p').text()} На выходе предоставь JSON-объект в следующем формате: {"title": Составь уникальные SEO заголовок этой статьи, после того как сделал копирайтинг и рерайтинг под вышеуказанное условие. Так же удали упоминание источника сайта и всяких ссылок. Обязательно оберни название футбольных команд и клубов в эти «» кавычки, "description": Составь небольшое уникальное SEO превью. Так же удали упоминание источника сайта и всяких ссылок. Обязательно оберни название футбольных команд и клубов в эти «» кавычки, "keywords": Составь ключевые слова под этот текст. Делай все через запятую и с маленькой буквой. Тут не надо обворачивать названия клубов в кавычки. Так же удали упоминание источника сайта и всяких ссылок, так же возьми ключевые слова упомянутые в title и description. Исключение слов: "футбол", "спорт", "content": Ну и самое главное, сделай полный рерайтинг и копирайтинг этой новости так, чтобы она была уникальная и SEO. Замени все слова, все предложения на аналогичный смысл, чтобы не был плагиатом. Так же составь правильную структуру текста, по грамматике, по абзацу и замени некоторые слова на синонимы или похожее по смыслу. Обязательно составь текст по абзацам и оберни абзац в тег "<p>". Так же удали упоминание источника сайта и всяких ссылок. Обязательно оберни название футбольных команд и клубов в эти «» кавычки, "category": напиши правильную категорию турнира или лиги. Можешь написать на латинице или кириллице. Можешь использовать сокращённое слово или аббревиатуру для турнира или лиги которая упоминается в этой новости. Исключение слов: "футбол", "спорт", "tags": Тут составь  массив тегов, которые подходят для этой новости. Можешь написать на латинице и кириллице. Можешь использовать сокращённые слова или аббревиатуры для турнира или лиги которая упоминается в этой новости. Исключение слов: "футбол", "спорт", "img": ${imgSrc}, "url": Через транслитом составь url структуру исходя из заголовка только на латинице, "titleEn": Аналогично на английском, "descriptionEn": Аналогично на английском, "keywordsEn": Аналогично на английском, "contentEn": Аналогично на английском, "categoryEn": Аналогично на английском, "tagsEn": Аналогично на английском, "urlEn": составь url структуру исходя из английского заголовка} Пожалуйста, убедись, что в JSON нет тройных обратных кавычек или других специальных символов. Все строки и ключи должны быть заключены в двойные кавычки. Пожалуйста, предоставь только JSON. Верни только JSON-объект, без объяснений.`}], 
                                    model: 'gpt-4o',
                                });
            
                                // Получение данных JSON
                                const parsedData = JSON.parse(jsonData.choices[0].message.content.replaceAll('json', '').replaceAll('```', ''));
            
                                // Скачивание изображения
                                const savePath = path.join('/var/www/html/lf-nextjs/public/assets/news'); // Путь для сохранения на сервере
                                const imgName = parsedData.urlEn.replace(/[^a-zA-Z0-9-_]/g, '') + path.extname(imgSrc); // Используем urlEn для имени файла
                                const localImageUrl = `${imgName}`; // Локальный путь для БД
            
                                // Создаем папку, если её нет
                                if (!fs.existsSync(savePath)) {
                                    fs.mkdirSync(savePath, { recursive: true });
                                }
            
                                try {
                                    // Загружаем изображение и сохраняем его локально
                                    const responseImage = await axios.get(imgSrc, { responseType: 'arraybuffer' });
                                    fs.writeFileSync(path.join(savePath, imgName), responseImage.data);
            
                                    // Вставка данных в БД
                                    await db.query('INSERT INTO `news` (category, title, img, content, meta_description, meta_keywords, author, tags, titleEn, meta_descriptionEn, meta_keywordsEn, contentEn, categoryEn, tagsEn, url, urlEn) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', 
                                        [
                                            parsedData.category,
                                            parsedData.title,
                                            localImageUrl, // Локальный URL для изображения
                                            parsedData.content,
                                            parsedData.description,
                                            parsedData.keywords,
                                            '',
                                            JSON.stringify(parsedData.tags),
                                            parsedData.titleEn,
                                            parsedData.descriptionEn,
                                            parsedData.keywordsEn,
                                            parsedData.contentEn,
                                            parsedData.categoryEn,
                                            JSON.stringify(parsedData.tagsEn),
                                            parsedData.url,
                                            parsedData.urlEn
                                        ]
                                    );
            
                                    setTimeout(async () => {
                                        // Обновление url и urlEn
                                        const [result] = await db.query(`SELECT MAX(id) AS maxId FROM news`);
                                        if (result.length > 0) {
                                            const maxId = result[0].maxId;
            
                                            const [recordResult] = await db.query(`SELECT * FROM news WHERE id = ?`, [maxId]);
                                            if (recordResult.length > 0) {
                                                const lastRecord = recordResult[0];
                                                const newUrl = `${lastRecord.id}-${lastRecord.url}`;
                                                const newUrlEn = `${lastRecord.id}-${lastRecord.urlEn}`;
            
                                                // Обновление записи с добавлением id в начало URL
                                                await db.query(`UPDATE news SET url = ?, urlEn = ? WHERE id = ?`, [newUrl, newUrlEn, maxId]);
                                                console.log('URL и URL_EN успешно обновлены.');
                                            }
                                        }
                                    }, 3000);
            
                                    console.log('Новость успешно добавлена');
                                } catch (error) {
                                    console.error('Ошибка при скачивании изображения:', error);
                                }
                            }
                        }
            
                        main();
                    })
                    .catch(err => {
                        console.log(err);
                    });
            }

            if (selectedLink.includes('terrikon.com')) {
                axios.get('https://terrikon.com' + $('#container > div.content-site > div:nth-child(4) > div:nth-child(4) > dl:nth-child(2) > dd:nth-child(2) > a').attr('href'))
                    .then(response => response.data)
                    .then(async response => {
                        const $ = cheerio.load(response);
            
                        async function main() {
                            const imgSrc = "https://terrikon.com" + $('.article .pimc img').attr('src'); // Измените селектор, если необходимо
            
                            if (imgSrc) {
                                const jsonData = await openai.chat.completions.create({
                                    messages: [{ role: 'user', content: `Прошу тебя выступить в роли профессионального копирайтера и переосмыслить предоставленный текст, используя синонимы, чтобы создать уникальную версию, в которой используется естественный стиль. Пожалуйста, сохраните исходное форматирование и смысл текста, придерживаясь красивого литературного языка и избегая стилистических и грамматических ошибок. Предоставленный текст будет разделен на части, однако помните, что он образует единую целостность. Пожалуйста, обеспечь высокую сложность и разнообразие контента, чтобы избежать повторов и успешно пройти проверку на уникальность. Вот текст: ${$('.article').find('p').text()} На выходе предоставь JSON-объект в следующем формате: {"title": Составь уникальные SEO заголовок этой статьи, после того как сделал копирайтинг и рерайтинг под вышеуказанное условие. Так же удали упоминание источника сайта и всяких ссылок. Обязательно оберни название футбольных команд и клубов в эти «» кавычки, "description": Составь небольшое уникальное SEO превью. Так же удали упоминание источника сайта и всяких ссылок. Обязательно оберни название футбольных команд и клубов в эти «» кавычки, "keywords": Составь ключевые слова под этот текст. Делай все через запятую и с маленькой буквой. Тут не надо обворачивать названия клубов в кавычки. Так же удали упоминание источника сайта и всяких ссылок, так же возьми ключевые слова упомянутые в title и description. Исключение слов: "футбол", "спорт", "content": Ну и самое главное, сделай полный рерайтинг и копирайтинг этой новости так, чтобы она была уникальная и SEO. Замени все слова, все предложения на аналогичный смысл, чтобы не был плагиатом. Так же составь правильную структуру текста, по грамматике, по абзацу и замени некоторые слова на синонимы или похожее по смыслу. Обязательно составь текст по абзацам и оберни абзац в тег "<p>". Так же удали упоминание источника сайта и всяких ссылок. Обязательно оберни название футбольных команд и клубов в эти «» кавычки, "category": напиши правильную категорию турнира или лиги. Можешь написать на латинице или кириллице. Можешь использовать сокращённое слово или аббревиатуру для турнира или лиги которая упоминается в этой новости. Исключение слов: "футбол", "спорт", "tags": Тут составь  массив тегов, которые подходят для этой новости. Можешь написать на латинице и кириллице. Можешь использовать сокращённые слова или аббревиатуры для турнира или лиги которая упоминается в этой новости. Исключение слов: "футбол", "спорт", "img": ${imgSrc}, "url": Через транслитом составь url структуру исходя из заголовка только на латинице, "titleEn": Аналогично на английском, "descriptionEn": Аналогично на английском, "keywordsEn": Аналогично на английском, "contentEn": Аналогично на английском, "categoryEn": Аналогично на английском, "tagsEn": Аналогично на английском, "urlEn": составь url структуру исходя из английского заголовка} Пожалуйста, убедись, что в JSON нет тройных обратных кавычек или других специальных символов. Все строки и ключи должны быть заключены в двойные кавычки. Пожалуйста, предоставь только JSON. Верни только JSON-объект, без объяснений.` }],
                                    model: 'gpt-4o',
                                });
            
                                const parsedData = JSON.parse(jsonData.choices[0].message.content.replaceAll('json', '').replaceAll('```', ''));
            
                                const savePath = path.join('/var/www/html/lf-nextjs/public/assets/news');
                                const imgName = parsedData.urlEn.replace(/[^a-zA-Z0-9-_]/g, '') + path.extname(imgSrc);
                                const localImageUrl = `${imgName}`;
            
                                if (!fs.existsSync(savePath)) {
                                    fs.mkdirSync(savePath, { recursive: true });
                                }
            
                                try {
                                    const responseImage = await axios.get(imgSrc, { responseType: 'arraybuffer' });
                                    fs.writeFileSync(path.join(savePath, imgName), responseImage.data);
            
                                    await db.query('INSERT INTO `news` (category, title, img, content, meta_description, meta_keywords, author, tags, titleEn, meta_descriptionEn, meta_keywordsEn, contentEn, categoryEn, tagsEn, url, urlEn) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [
                                        parsedData.category,
                                        parsedData.title,
                                        localImageUrl,
                                        parsedData.content,
                                        parsedData.description,
                                        parsedData.keywords,
                                        '',
                                        JSON.stringify(parsedData.tags),
                                        parsedData.titleEn,
                                        parsedData.descriptionEn,
                                        parsedData.keywordsEn,
                                        parsedData.contentEn,
                                        parsedData.categoryEn,
                                        JSON.stringify(parsedData.tagsEn),
                                        parsedData.url,
                                        parsedData.urlEn
                                    ]);
            
                                    setTimeout(async () => {
                                        const [result] = await db.query('SELECT MAX(id) AS maxId FROM news');
                                        if (result.length > 0) {
                                            const maxId = result[0].maxId;
                                            const [recordResult] = await db.query('SELECT * FROM news WHERE id = ?', [maxId]);
                                            if (recordResult.length > 0) {
                                                const lastRecord = recordResult[0];
                                                const newUrl = `${lastRecord.id}-${lastRecord.url}`;
                                                const newUrlEn = `${lastRecord.id}-${lastRecord.urlEn}`;
            
                                                await db.query('UPDATE news SET url = ?, urlEn = ? WHERE id = ?', [newUrl, newUrlEn, maxId]);
                                                console.log('URL и URL_EN успешно обновлены.');
                                            }
                                        }
                                    }, 4000);
            
                                    console.log('Новость успешно добавлена');
                                } catch (error) {
                                    console.error('Ошибка при скачивании изображения:', error);
                                }
                            }
                        }
            
                        main();
                    })
                    .catch(err => {
                        console.log(err);
                    });
            }

            setTimeout(async () => {
                await updateSitemap();
            }, 30000);
        })
        .catch(err => console.log(err));

    }, 60000);
}

autoGenerateNews();