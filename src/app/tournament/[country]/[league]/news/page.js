import NewsPage from "@/components/News/NewsPage/NewsPage";
import Image from "next/image";
import Link from "next/link";
import config from '../../../../../../public/conf.json';
import './style.css';
import '../../style.css';
import { notFound } from 'next/navigation';

export const generateMetadata = ({ params }) => {
    const country = config.tournaments.filter(e => {
        return e.name.en.toLowerCase().replaceAll(/\s+/g, '').replaceAll(/-/g, '') === params.country.replaceAll(/-/g, '');
    });
    const league = country[0]?.leagues.filter(e => {
        return e.name.en.toLowerCase().replaceAll(/\s+/g, '').replaceAll(/-/g, '').replaceAll('ü', 'u').replaceAll('ə', 'a').replaceAll('ö', 'o').replaceAll('ğ', 'gh').replaceAll('ı', 'i').replaceAll('ç', 'c').replaceAll('ş', 's').replaceAll('ç', 'c').replaceAll('ã', 'a').replaceAll('ó', 'o').replaceAll('ú', 'u').replaceAll('é', 'e').replaceAll('ý', 'y').replaceAll('ï', 'i').replaceAll('á', 'a').replaceAll('ø', 'o').replaceAll('í', 'i').replaceAll('/', '').replaceAll('\'', '').replaceAll('.', '') === params.league.replaceAll(/-/g, '');
    });

    if(country.length < 1 || league.length < 1) {
        notFound();
    }

    return {
        title: `Новости ${country[0]?.name.ru} ${league[0]?.name.ru} - последние события и обзоры`,
        description: `Читайте свежие новости и события ${league[0]?.name.ru} ${country[0]?.name.ru}. Обзоры матчей, интервью и аналитика.`,
        keywords: `новости ${league[0]?.name.ru} ${country[0]?.name.ru}, события ${league[0]?.name.ru}, футбольные обзоры ${country[0]?.name.ru}`,
        openGraph: {
          type: 'website',
          title: `Новости ${country[0]?.name.ru} ${league[0]?.name.ru} - последние события и обзоры`,
          description: `Читайте свежие новости и события ${league[0]?.name.ru} ${country[0]?.name.ru}. Обзоры матчей, интервью и аналитика.`
        },
        twitter: {
          card: 'summary_large_image',
          title: `Новости ${country[0]?.name.ru} ${league[0]?.name.ru} - последние события и обзоры`,
          description: `Читайте свежие новости и события ${league[0]?.name.ru} ${country[0]?.name.ru}. Обзоры матчей, интервью и аналитика.`
        }
    };
};

const page = ({params}) => {
    const country = config.tournaments.filter(e => {
        return e.name.en.toLowerCase().replace(/\s+/g, '').replace(/-/g, '') === params.country.replace(/-/g, '');
    });

    const league = country[0]?.leagues.filter(e => {
        return e.name.en.toLowerCase().replaceAll(/\s+/g, '').replaceAll(/-/g, '').replaceAll('ü', 'u').replaceAll('ə', 'a').replaceAll('ö', 'o').replaceAll('ğ', 'gh').replaceAll('ı', 'i').replaceAll('ç', 'c').replaceAll('ş', 's').replaceAll('ç', 'c').replaceAll('ã', 'a').replaceAll('ó', 'o').replaceAll('ú', 'u').replaceAll('é', 'e').replaceAll('ý', 'y').replaceAll('ï', 'i').replaceAll('á', 'a').replaceAll('ø', 'o').replaceAll('í', 'i').replaceAll('/', '').replaceAll('\'', '').replaceAll('.', '') === params.league.replaceAll(/-/g, '');
    });

    const pagPathName = '/' + country[0]?.name.en.replaceAll(/\s+/g, '-').toLowerCase() + '/' + league[0]?.name.en.replaceAll('.', '').replaceAll('-', '').replaceAll(/\s+/g, '-').toLowerCase().replaceAll('ü', 'u').replaceAll('ə', 'a').replaceAll('ö', 'o').replaceAll('ğ', 'gh').replaceAll('ı', 'i').replaceAll('ç', 'c').replaceAll('ç', 'c').replaceAll('ã', 'a').replaceAll('ş', 's').replaceAll('ó', 'o').replaceAll('ú', 'u').replaceAll('é', 'e').replaceAll('ý', 'y').replaceAll('ï', 'i').replaceAll('á', 'a').replaceAll('ø', 'o').replaceAll('í', 'i').replaceAll('/', '-').replaceAll('\'', '') + '/';

    return (
        <div className='league-news tournament-country'>
            <div className="head">
                <h2 className="left">
                    <div className="name">
                        <Image className='country-flag' src={country[0]?.flag} width={22} height={16} alt={'флаг ' + country[0]?.name.ru} title={country[0]?.name.ru} /> <Link href={`/tournament/${country[0]?.name.en.replaceAll(/\s+/g, '-').toLowerCase()}`} className='country-name'>{country[0]?.name.ru}</Link><span className='slash'>/</span><Image className='league-logo' src={league[0]?.logo} width={22} height={16} alt={'лого ' + league[0]?.name.ru} title={league[0]?.name.ru} /><Link href={`/tournament/${country[0]?.name.en.replaceAll(/\s+/g, '-').toLowerCase()}/${league[0]?.name.en.replaceAll('.', '').replaceAll('-', '').replaceAll(/\s+/g, '-').toLowerCase().replaceAll('ü', 'u').replaceAll('ə', 'a').replaceAll('ö', 'o').replaceAll('ğ', 'gh').replaceAll('ı', 'i').replaceAll('ç', 'c').replaceAll('ç', 'c').replaceAll('ã', 'a').replaceAll('ş', 's').replaceAll('ó', 'o').replaceAll('ú', 'u').replaceAll('é', 'e').replaceAll('ý', 'y').replaceAll('ï', 'i').replaceAll('á', 'a').replaceAll('ø', 'o').replaceAll('í', 'i').replaceAll('/', '-').replaceAll('\'', '')}`} className='country-name league-name'>{league[0]?.name.ru}</Link><span className='league-name'> <span className='slash'>/</span> Новости</span>
                    </div>
                </h2>
            </div>
            
            <NewsPage pagPathName={pagPathName} param={{tags: league[0]?.category && league[0]?.category.join(',')}} placement={'tournament-news'} />
        </div>
    );
};

export default page;