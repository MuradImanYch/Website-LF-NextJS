import NewsPage from "@/components/News/NewsPage/NewsPage";
import Image from "next/image";
import Link from "next/link";
import config from '../../../../../../../public/conf.json';
import '@/app/tournament/[country]/[league]/news/style.css';
import '@/app/tournament/[country]/style.css';
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
        title: `${country[0]?.name.en} ${league[0]?.name.en} - Latest Events and Analysis`,
        description: `Read the latest news and events of the ${country[0]?.name.en} ${league[0]?.name.en}. Match reviews, interviews, and analysis.`,
        keywords: `${country[0]?.name.en} ${league[0]?.name.en} news, ${league[0]?.name.en} football news, match reviews ${country[0]?.name.en}`,
        openGraph: {
          type: 'website',
          title: `${country[0]?.name.en} ${league[0]?.name.en} - Latest Events and Analysis`,
          description: `Read the latest news and events of the ${country[0]?.name.en} ${league[0]?.name.en}. Match reviews, interviews, and analysis.`
        },
        twitter: {
          card: 'summary_large_image',
          title: `${country[0]?.name.en} ${league[0]?.name.en} - Latest Events and Analysis`,
          description: `Read the latest news and events of the ${country[0]?.name.en} ${league[0]?.name.en}. Match reviews, interviews, and analysis.`
        }
    };
};

const page = ({params}) => {
    const country = config.tournaments.filter(e => {
        return e.name.en.toLowerCase().replace(/\s+/g, '').replace(/-/g, '') === params.country.replace(/-/g, '');
    });

    const league = country[0].leagues.filter(e => {
        return e.name.en.toLowerCase().replaceAll(/\s+/g, '').replaceAll(/-/g, '').replaceAll('ü', 'u').replaceAll('ə', 'a').replaceAll('ö', 'o').replaceAll('ğ', 'gh').replaceAll('ı', 'i').replaceAll('ç', 'c').replaceAll('ş', 's').replaceAll('ç', 'c').replaceAll('ã', 'a').replaceAll('ó', 'o').replaceAll('ú', 'u').replaceAll('é', 'e').replaceAll('ý', 'y').replaceAll('ï', 'i').replaceAll('á', 'a').replaceAll('ø', 'o').replaceAll('í', 'i').replaceAll('/', '').replaceAll('\'', '').replaceAll('.', '') === params.league.replaceAll(/-/g, '');
    });

    const pagPathName = '/' + country[0].name.en.replaceAll(/\s+/g, '-').toLowerCase() + '/' + league[0].name.en.replaceAll('.', '').replaceAll('-', '').replaceAll(/\s+/g, '-').toLowerCase().replaceAll('ü', 'u').replaceAll('ə', 'a').replaceAll('ö', 'o').replaceAll('ğ', 'gh').replaceAll('ı', 'i').replaceAll('ç', 'c').replaceAll('ç', 'c').replaceAll('ã', 'a').replaceAll('ş', 's').replaceAll('ó', 'o').replaceAll('ú', 'u').replaceAll('é', 'e').replaceAll('ý', 'y').replaceAll('ï', 'i').replaceAll('á', 'a').replaceAll('ø', 'o').replaceAll('í', 'i').replaceAll('/', '-').replaceAll('\'', '') + '/';

    return (
        <div className='league-news tournament-country'>
            <div className="head">
                <h2 className="left">
                    <div className="name">
                        <Image className='country-flag' src={country[0].flag} width={22} height={16} alt={'flag ' + country[0].name.en} title={country[0].name.en} /> <Link href={`/en/tournament/${country[0].name.en.replaceAll(/\s+/g, '-').toLowerCase()}`} className='country-name'>{country[0].name.en}</Link><span className='slash'>/</span><Image className='league-logo' src={league[0].logo} width={22} height={16} alt={'logo ' + league[0].name.en} title={league[0].name.en} /><Link href={`/en/tournament/${country[0].name.en.replaceAll(/\s+/g, '-').toLowerCase()}/${league[0].name.en.replaceAll('.', '').replaceAll('-', '').replaceAll(/\s+/g, '-').toLowerCase().replaceAll('ü', 'u').replaceAll('ə', 'a').replaceAll('ö', 'o').replaceAll('ğ', 'gh').replaceAll('ı', 'i').replaceAll('ç', 'c').replaceAll('ç', 'c').replaceAll('ã', 'a').replaceAll('ş', 's').replaceAll('ó', 'o').replaceAll('ú', 'u').replaceAll('é', 'e').replaceAll('ý', 'y').replaceAll('ï', 'i').replaceAll('á', 'a').replaceAll('ø', 'o').replaceAll('í', 'i').replaceAll('/', '-').replaceAll('\'', '')}`} className='country-name league-name'>{league[0].name.en}</Link><span className='league-name'> <span className='slash'>/</span> News</span>
                    </div>
                </h2>
            </div>
            
            <NewsPage lang={'en'} pagPathName={pagPathName} param={{tags: league[0].category && league[0].category.join(',')}} placement={'tournament-news'} />
        </div>
    );
};

export default page;