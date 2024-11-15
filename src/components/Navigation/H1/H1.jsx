'use client';

import config from '../../../../public/conf.json';
import { usePathname } from 'next/navigation';

const H1 = () => {
    const pathname = usePathname();
    let h1;

    // Проверка для страницы /tournament/[england]
    if (/^\/(en\/)?tournament\/[^\/]+$/.test(pathname)) {
        const countryPath = pathname.split('/')[2 + (pathname.startsWith('/en') ? 1 : 0)];

        const country = config.tournaments.find(e => 
            e.name.en.toLowerCase().replaceAll(/\s+/g, '').replaceAll(/-/g, '') === countryPath.replaceAll('-', '')
        );

        h1 = country 
            ? (pathname.startsWith('/en') 
                ? `${country.name.en}: News, LIVE matches, standings, schedule` 
                : `${country.name.ru}: Новости футбола, LIVE матчи, турнирная таблица, расписание`)
            : (pathname.startsWith('/en') ? 'Page not found' : 'Страница не найдена');
    }
    // Проверка для страницы /tournament/[england]/news
    else if (/^\/(en\/)?tournament\/[^\/]+\/news$/.test(pathname)) {
        const countryPath = pathname.split('/')[2 + (pathname.startsWith('/en') ? 1 : 0)];

        const country = config.tournaments.find(e => 
            e.name.en.toLowerCase().replaceAll(/\s+/g, '').replaceAll(/-/g, '') === countryPath.replaceAll('-', '')
        );

        h1 = country 
            ? (pathname.startsWith('/en') 
                ? `${country.name.en}: News of local football tournaments and the national team` 
                : `${country.name.ru}: Новости местных футбольных турниров и национальной сборной`)
            : (pathname.startsWith('/en') ? 'Page not found' : 'Страница не найдена');
    }
    // Проверка для страницы /tournament/[england]/[premier-league]
    else if (/^\/(en\/)?tournament\/[^\/]+\/[^\/]+$/.test(pathname)) {
        const [_, __, countryPath, leaguePath] = pathname.split('/').slice(pathname.startsWith('/en') ? 1 : 0);

        const country = config.tournaments.find(e => 
            e.name.en.toLowerCase().replaceAll(/\s+/g, '').replaceAll(/-/g, '') === countryPath.replaceAll('-', '')
        );

        if (country) {
            const league = country.leagues.find(e => 
                e.name.en.toLowerCase().replaceAll(/\s+/g, '').replaceAll(/-/g, '') === leaguePath.replaceAll('-', '')
            );

            h1 = league 
                ? (pathname.startsWith('/en') 
                    ? `${country.name.en} - ${league.name.en}: Standings, schedule, LIVE matches, news` 
                    : `${country.name.ru} - ${league.name.ru}: Турнирная таблица, расписание, LIVE матчи, новости`)
                : (pathname.startsWith('/en') ? 'Page not found' : 'Страница не найдена');
        } else {
            h1 = pathname.startsWith('/en') ? 'Page not found' : 'Страница не найдена';
        }
    }
    // Проверка для страницы /tournament/[england]/[premier-league]/news
    else if (/^\/(en\/)?tournament\/[^\/]+\/[^\/]+\/news$/.test(pathname)) {
        const [_, __, countryPath, leaguePath] = pathname.split('/').slice(pathname.startsWith('/en') ? 1 : 0);

        const country = config.tournaments.find(e => 
            e.name.en.toLowerCase().replaceAll(/\s+/g, '').replaceAll(/-/g, '') === countryPath.replaceAll('-', '')
        );

        if (country) {
            const league = country.leagues.find(e => 
                e.name.en.toLowerCase().replaceAll(/\s+/g, '').replaceAll(/-/g, '') === leaguePath.replaceAll('-', '')
            );

            h1 = league 
                ? (pathname.startsWith('/en') 
                    ? `${country.name.en} - ${league.name.en}: News` 
                    : `${country.name.ru} - ${league.name.ru}: Новости`)
                : (pathname.startsWith('/en') ? 'Page not found' : 'Страница не найдена');
        } else {
            h1 = pathname.startsWith('/en') ? 'Page not found' : 'Страница не найдена';
        }
    }
    // Проверка для страниц /tournament/[england]/[premier-league]/standings и другие подстраницы
    else if (/^\/(en\/)?tournament\/[^\/]+\/[^\/]+\/(standings|results|fixtures|top-scorers)$/.test(pathname)) {
        const [_, __, countryPath, leaguePath, section] = pathname.split('/').slice(pathname.startsWith('/en') ? 1 : 0);

        const country = config.tournaments.find(e => 
            e.name.en.toLowerCase().replaceAll(/\s+/g, '').replaceAll(/-/g, '') === countryPath.replaceAll('-', '')
        );

        if (country) {
            const league = country.leagues.find(e => 
                e.name.en.toLowerCase().replaceAll(/\s+/g, '').replaceAll(/-/g, '') === leaguePath.replaceAll('-', '')
            );

            if (league) {
                switch (section) {
                    case 'standings':
                        h1 = pathname.startsWith('/en') 
                            ? `${country.name.en} - ${league.name.en}: Standings` 
                            : `${country.name.ru} - ${league.name.ru}: Турнирная таблица`;
                        break;
                    case 'results':
                        h1 = pathname.startsWith('/en') 
                            ? `${country.name.en} - ${league.name.en}: Results` 
                            : `${country.name.ru} - ${league.name.ru}: Результаты матчей`;
                        break;
                    case 'fixtures':
                        h1 = pathname.startsWith('/en') 
                            ? `${country.name.en} - ${league.name.en}: Schedule` 
                            : `${country.name.ru} - ${league.name.ru}: Расписание матчей`;
                        break;
                    case 'top-scorers':
                        h1 = pathname.startsWith('/en') 
                            ? `${country.name.en} - ${league.name.en}: Top scorers and player stats` 
                            : `${country.name.ru} - ${league.name.ru}: Бомбардиры и статистика игроков`;
                        break;
                    default:
                        h1 = pathname.startsWith('/en') ? 'Page not found' : 'Страница не найдена';
                }
            } else {
                h1 = pathname.startsWith('/en') ? 'Page not found' : 'Страница не найдена';
            }
        } else {
            h1 = pathname.startsWith('/en') ? 'Page not found' : 'Страница не найдена';
        }
    }
    else {
        h1 = pathname.startsWith('/en') ? 'Page not found' : 'Страница не найдена';
    }

    if (pathname === '/') {
        h1 = 'Актуальные новости, прямые трансляции матчей, результаты, расписание, турнирная таблица';
    } else if (pathname === '/en') {
        h1 = 'Latest news, live broadcasts of matches, results, schedule, tournament table';
    } else if (pathname.startsWith('/news')) {
        h1 = 'Актуальные футбольные новости на сегодня';
    } else if (pathname.startsWith('/en/news')) {
        h1 = 'Latest football news for today';
    } else if (pathname === '/matches') {
        h1 = 'Список всех матчей на сегодня';
    } else if (pathname === '/en/matches') {
        h1 = 'List of all matches for today';
    } else if (pathname === '/matches/live') {
        h1 = 'Список матчей в LIVE режиме';
    } else if (pathname === '/en/matches/live') {
        h1 = 'List of LIVE matches';
    } else if (pathname === '/matches/results') {
        h1 = 'Список завершённых матчей';
    } else if (pathname === '/en/matches/results') {
        h1 = 'List of completed matches';
    } else if (pathname === '/matches/fixtures') {
        h1 = 'Список запланированных матчей';
    } else if (pathname === '/en/matches/fixtures') {
        h1 = 'List of scheduled matches';
    } else if (pathname === '/broadcasts') {
        h1 = 'Прямые трансляции и повторы матчей';
    } else if (pathname === '/en/broadcasts') {
        h1 = 'Live broadcasts and replays of matches';
    } else if (pathname === '/transfer-news') {
        h1 = 'Последние новости и слухи трансферов';
    } else if (pathname === '/en/transfer-news') {
        h1 = 'Latest transfer news and rumours';
    } else if (pathname === '/transfer-list') {
        h1 = 'Список трансферных переходов';
    } else if (pathname === '/en/transfer-list') {
        h1 = 'List of transfers';
    } else if (pathname === '/offtop-news') {
        h1 = 'Оффтопы и прочие разные новости';
    } else if (pathname === '/en/offtop-news') {
        h1 = 'Offtopics and other miscellaneous news';
    } else if (pathname === '/blogs') {
        h1 = 'Блоги, мнения авторов сообщества';
    } else if (pathname === '/en/blogs') {
        h1 = 'Blogs, opinions of community authors';
    } else if (pathname === '/video') {
        h1 = 'Видеоматериалы, голы и репортажи';
    } else if (pathname === '/en/video') {
        h1 = 'Videos, goals and reports';
    } else if (pathname === '/uefa-ranking') {
        h1 = 'Таблица коэффициентов УЕФА';
    } else if (pathname === '/en/uefa-ranking') {
        h1 = 'UEFA Coefficients Table';
    } else if (pathname === '/fifa-ranking') {
        h1 = 'Рейтинг ассоциаций ФИФА';
    } else if (pathname === '/en/fifa-ranking') {
        h1 = 'FIFA Association Rankings';
    } else if (pathname === '/tv-schedule') {
        h1 = 'Расписание спортивных ТВ каналов';
    } else if (pathname === '/en/tv-schedule') {
        h1 = 'Sports TV channel schedule';
    } else if (pathname === '/odds') {
        h1 = 'Котировки на матчи';
    } else if (pathname === '/en/odds') {
        h1 = 'Match odds';
    } else if (pathname === '/photo') {
        h1 = 'Фотогалерея Legendary Football';
    } else if (pathname === '/en/photo') {
        h1 = 'Legendary Football Photo Gallery';
    } else if (pathname === '/vk-feed') {
        h1 = 'Лента Вконтакте Legendary Football';
    } else if (pathname === '/en/vk-feed') {
        h1 = 'Legendary Football Vkontakte feed';
    } else if (pathname === '/tags') {
        h1 = 'Все теги для поиска';
    } else if (pathname === '/en/tags') {
        h1 = 'All tags for search';
    } else if (pathname === '/tournaments') {
        h1 = 'Все турниры';
    } else if (pathname === '/en/tournaments') {
        h1 = 'All tournaments';
    } else if (pathname === '/login') {
        h1 = 'Авторизация на сайте';
    } else if (pathname === '/en/login') {
        h1 = 'Authorization on the site';
    } else if (pathname === '/settings') {
        h1 = 'Настройки на сайте';
    } else if (pathname === '/en/settings') {
        h1 = 'Site settings';
    }

    if(pathname.includes('/news/page/')) {
        h1 = `Актуальные футбольные новости на сегодня - Страница ${pathname.split('/')[pathname.split('/').length - 1]}`;
    }
    else if(pathname.includes('/transfer-news/page/')) {
        h1 = `Последние новости и слухи трансферов - Страница ${pathname.split('/')[pathname.split('/').length - 1]}`;
    } 
    else if(pathname.includes('/offtop-news/page/')) {
        h1 = `Оффтопы и прочие разные новости - Страница ${pathname.split('/')[pathname.split('/').length - 1]}`;
    } 
    else if(pathname.includes('/blogs/page/')) {
        h1 = `Блоги, мнения авторов сообщества - Страница ${pathname.split('/')[pathname.split('/').length - 1]}`;
    } 
    else if(pathname.includes('/video/page/')) {
        h1 = `Видеоматериалы, голы и репортажи - Страница ${pathname.split('/')[pathname.split('/').length - 1]}`;
    } 

    if(pathname.includes('/en/news/page/')) {
        h1 = `Latest football news for today - Page ${pathname.split('/')[pathname.split('/').length - 1]}`;
    } 
    else if(pathname.includes('/en/transfer-news/page/')) {
        h1 = `Latest transfer news and rumours - Page ${pathname.split('/')[pathname.split('/').length - 1]}`;
    } 
    else if(pathname.includes('/en/offtop-news/page/')) {
        h1 = `Offtopics and other miscellaneous news - Page ${pathname.split('/')[pathname.split('/').length - 1]}`;
    } 
    else if(pathname.includes('/en/blogs/page/')) {
        h1 = `Blogs, opinions of community authors - Page ${pathname.split('/')[pathname.split('/').length - 1]}`;
    } 
    else if(pathname.includes('/en/video/page/')) {
        h1 = `Videos, goals and reports - Page ${pathname.split('/')[pathname.split('/').length - 1]}`;
    }
    
    if (/^\/tournament\/[^\/]+\/news\/page(\/\d+)?$/.test(pathname)) {
        const [_, __, countryPath, leaguePath, section] = pathname.split('/').slice(pathname.startsWith('/en') ? 1 : 0);

        const country = config.tournaments.find(e => 
            e.name.en.toLowerCase().replaceAll(/\s+/g, '').replaceAll(/-/g, '') === countryPath.replaceAll('-', '')
        );
        
        if(country?.name.ru || country?.name.en) {
            h1 = `${country?.name.ru}: Новости местных футбольных турниров и национальной сборной - Страница ${pathname.split('/')[pathname.split('/').length - 1]}`;
        }
        else {
            h1 = 'Страница не найдена';
        }
    }
    if (/^\/tournament\/[^\/]+\/[^\/]+\/news\/page(\/\d+)?$/.test(pathname)) {
        const [_, __, countryPath, leaguePath, section] = pathname.split('/').slice(pathname.startsWith('/en') ? 1 : 0);

        const country = config.tournaments.find(e => 
            e.name.en.toLowerCase().replaceAll(/\s+/g, '').replaceAll(/-/g, '') === countryPath.replaceAll('-', '')
        );
        const league = country?.leagues.find(e => 
            e.name.en.toLowerCase().replaceAll(/\s+/g, '').replaceAll(/-/g, '') === leaguePath.replaceAll('-', '')
        );
        
        if(country?.name.ru && league?.name.ru || country?.name.en && league?.name.en) {
            h1 = `${country?.name.ru} - ${league?.name.ru}: Новости - Страница ${pathname.split('/')[pathname.split('/').length - 1]}`;
        }
        else {
            h1 = 'Страница не найдена';
        }
    }
    if (/^\/en\/tournament\/[^\/]+\/news\/page(\/\d+)?$/.test(pathname)) {
        const [_, __, countryPath, leaguePath, section] = pathname.split('/').slice(pathname.startsWith('/en') ? 1 : 0);

        const country = config.tournaments.find(e => 
            e.name.en.toLowerCase().replaceAll(/\s+/g, '').replaceAll(/-/g, '') === countryPath.replaceAll('-', '')
        );
        
        if(country?.name.ru || country?.name.en) {
            h1 = `${country?.name.en} News of local football tournaments and the national team - Page ${pathname.split('/')[pathname.split('/').length - 1]}`;
        }
        else {
            h1 = 'Page not found';
        }
    }
    if (/^\/en\/tournament\/[^\/]+\/[^\/]+\/news\/page(\/\d+)?$/.test(pathname)) {
        const [_, __, countryPath, leaguePath, section] = pathname.split('/').slice(pathname.startsWith('/en') ? 1 : 0);

        const country = config.tournaments.find(e => 
            e.name.en.toLowerCase().replaceAll(/\s+/g, '').replaceAll(/-/g, '') === countryPath.replaceAll('-', '')
        );
        const league = country?.leagues.find(e => 
            e.name.en.toLowerCase().replaceAll(/\s+/g, '').replaceAll(/-/g, '') === leaguePath.replaceAll('-', '')
        );
        
        if(country?.name.ru && league?.name.ru || country?.name.en && league?.name.en) {
            h1 = `${country?.name.en} - ${league?.name.en}: News - Page ${pathname.split('/')[pathname.split('/').length - 1]}`;
        }
        else {
            h1 = 'Page not found';
        }
    }

    if (/^\/en\/search\/[^\/]+$/.test(pathname)) {
        const searchValue = pathname.split('/')[pathname.split('/').length - 1]; // Получение значения после /en/search/
        h1 = `Search results for "${decodeURIComponent(searchValue)}"`;
    }
    if (/^\/search\/[^\/]+$/.test(pathname)) {
        const searchValue = pathname.split('/')[pathname.split('/').length - 1]; // Получение значения после /search/
        h1 = `Результаты поиска по запросу "${decodeURIComponent(searchValue)}"`;
    }

    if (/^\/en\/search\/[^\/]+\/page\/\d+$/.test(pathname)) {
        const searchValue = pathname.split('/search')[1].split('/')[1];
        const pageNumber = pathname.split('/').pop(); // Получение номера страницы
        h1 = `Search results for "${decodeURIComponent(searchValue)}" - Page ${pageNumber}`;
    }
    if (/^\/search\/[^\/]+\/page\/\d+$/.test(pathname)) {
        const searchValue = pathname.split('/search')[1].split('/')[1];
        const pageNumber = pathname.split('/').pop(); // Получение номера страницы
        h1 = `Результаты поиска по запросу "${decodeURIComponent(searchValue)}" - Страница ${pageNumber}`;
    }
    if (/^\/en\/matches\/\d{4}-\d{2}-\d{2}$/.test(pathname)) {
        const date = pathname.split('/').pop(); // Получение значения даты
        h1 = `List of all matches on ${date}`;
    }
    if (/^\/matches\/\d{4}-\d{2}-\d{2}$/.test(pathname)) {
        const date = pathname.split('/').pop(); // Получение значения даты
        h1 = `Список всех матчей на ${date}`;
    }
    if (/^\/en\/matches\/results\/\d{4}-\d{2}-\d{2}$/.test(pathname)) {
        const date = pathname.split('/').pop(); // Получение значения даты
        h1 = `List of completed matches on ${date}`;
    }
    if (/^\/matches\/results\/\d{4}-\d{2}-\d{2}$/.test(pathname)) {
        const date = pathname.split('/').pop(); // Получение значения даты
        h1 = `Список завершённых матчей на ${date}`;
    }
    if (/^\/en\/matches\/fixtures\/\d{4}-\d{2}-\d{2}$/.test(pathname)) {
        const date = pathname.split('/').pop(); // Получение значения даты
        h1 = `List of scheduled matches on ${date}`;
    }
    if (/^\/matches\/fixtures\/\d{4}-\d{2}-\d{2}$/.test(pathname)) {
        const date = pathname.split('/').pop(); // Получение значения даты
        h1 = `Список запланированных матчей на ${date}`;
    }

    return (
        <div>
            {!pathname.includes('/read') && !pathname.includes('/watch') && h1 && <h1>{h1}</h1>}
        </div>
    );
};

export default H1;