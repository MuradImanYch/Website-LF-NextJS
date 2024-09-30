'use client'

import config from '../../../../public/conf.json';
import { usePathname } from 'next/navigation';

const H1 = () => {
    const pathname = usePathname();
    let h1;

    if (pathname === '/') {
        h1 = 'Актуальные новости, прямые трансляции матчей, результаты, расписание, турнирная таблица';
    }
    /* else if (pathname.includes('/tournament/') && pathname.match(/^\/tournament\/[^\/]+$/)) {
        config.tournaments.filter(e => {
            const country = config.tournaments.filter(e => {
                return e.name.en.toLowerCase().replaceAll(/\s+/g, '').replaceAll(/-/g, '') === pathname.split('/tournament/')[1].replaceAll('/', '').replaceAll(/-/g, '');
            });

            h1 = country[0].name.ru + ': ' + 'Футбольные новости, LIVE матчи, турнирная таблица, расписание';
        });
    }
    else if (pathname.includes('/tournament/') && pathname.match(/^\/tournament\/[^\/]+\/[^\/]+$/)[0]) {
        config.tournaments.filter(e => {
            const country = config.tournaments.filter(e => {
                return e.name.en.toLowerCase().replace(/\s+/g, '').replace(/-/g, '') === pathname.split('/tournament/')[1].split('/')[0].replace('/', '').replace(/-/g, '');
            });

            const league = country[0].leagues.filter(e => {
                return e.name.en.toLowerCase().replaceAll(/\s+/g, '').replaceAll(/-/g, '').replaceAll('ü', 'u').replaceAll('ə', 'a').replaceAll('ö', 'o').replaceAll('ğ', 'gh').replaceAll('ı', 'i').replaceAll('ç', 'c').replaceAll('ş', 's').replaceAll('ç', 'c').replaceAll('ã', 'a').replaceAll('ó', 'o').replaceAll('ú', 'u').replaceAll('é', 'e').replaceAll('ý', 'y').replaceAll('ï', 'i').replaceAll('á', 'a').replaceAll('ø', 'o').replaceAll('í', 'i').replaceAll('/', '').replaceAll('\'', '').replaceAll('.', '') === pathname.split('/tournament/')[1].split('/')[1].replaceAll(/-/g, '');
            });

            // h1 = country[0].name.ru + ' - ' + league[0]?.name.ru + ': ' + `${pathname.includes('news' ? "Новости" : 'Турнирная таблица, расписание, LIVE матчи, новости')}`;

            if(pathname.includes('/tournament') && pathname.includes('/news')) {
                h1 = `${country[0].name.ru}: Все новости`;
            }
            else {
                h1 = country[0].name.ru + ' - ' + league[0]?.name.ru + ': ' + `${pathname.includes('news' ? "Новости" : 'Турнирная таблица, расписание, LIVE матчи, новости')}`;
            }
        });
    }
    else if (pathname.includes('/news')) {
        h1 = 'Актуальные футбольные новости на сегодня';
    }
    else if (pathname.includes('/matches')) {
        h1 = 'Матчи, календарь, результаты, турнирная таблица';
    }
    else if (pathname.includes('/broadcasts')) {
        h1 = 'Прямые трансляции матчей';
    }
    else if (pathname.includes('/transfer-news')){
        h1 = 'Последние новости трансферов, переходы и слухи';
    }
    else if (pathname.includes('/transfer-list')){
        h1 = 'Список трансферных переходов';
    }
    else if (pathname.includes('/offtop-news')){
        h1 = 'Оффтопы и прочие разные новости';
    }
    else if (pathname.includes('/blogs')){
        h1 = 'Блоги, мнения авторов сообщества';
    }
    else if (pathname.includes('/video')){
        h1 = 'Видеоматериалы, голы и репортажи';
    }
    else if (pathname.includes('/uefa-ranking')){
        h1 = 'Рейтинг ассоциаций УЕФА';
    }
    else if (pathname.includes('/fifa-ranking')){
        h1 = 'Рейтинг ФИФА';
    }
    else if (pathname.includes('/tv-schedule')){
        h1 = 'ТВ расписание';
    }
    else if (pathname.includes('/odds')){
        h1 = 'Котировки на матчи';
    }
    else if (pathname.includes('/tournaments')){
        h1 = 'Все турниры';
    }
    else if (pathname.includes('/login')){
        h1 = 'Авторизация на сайте';
    }
    else if (pathname.includes('/settings')){
        h1 = 'Настройки на сайте';
    }
    else {
        h1 = 'Страница не найдена';
    } */

    return (
        <div>
            {h1 && <h1>{h1}</h1>}
        </div>
    );
};

export default H1;