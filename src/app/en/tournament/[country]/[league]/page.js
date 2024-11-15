import '@/app/tournament/[country]/style.css';
import Carousel from '@/components/Main/Carousel/Carousel';
import config from '../../../../../../public/conf.json';
import Image from 'next/image';
import Link from 'next/link';
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
        title: `${country[0]?.name.en} - ${league[0]?.name.en}: News, Match Schedule, Results`,
        description: `All about the ${country[0]?.name.en} ${league[0]?.name.en}: latest news, match schedule, results, statistics, and standings`,
        keywords: `${country[0]?.name.en} ${league[0]?.name.en}, ${league[0]?.name.en} news, match schedule ${league[0]?.name.en}, results ${country[0]?.name.en}`,
        openGraph: {
          type: 'website',
          title: `${country[0]?.name.en} - ${league[0]?.name.en}: News, Match Schedule, Results`,
          description: `All about the ${country[0]?.name.en} ${league[0]?.name.en}: latest news, match schedule, results, statistics, and standings`
        },
        twitter: {
          card: 'summary_large_image',
          title: `${country[0]?.name.en} - ${league[0]?.name.en}: News, Match Schedule, Results`,
          description: `All about the ${country[0]?.name.en} ${league[0]?.name.en}: latest news, match schedule, results, statistics, and standings`
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

    return (
        <div className='tournament-league'>
            <div className="head">
                <h2 className="left">
                    <Image className='country-flag' src={country[0].flag} width={22} height={16} alt={'flag ' + country[0].name.en} title={country[0].name.en} /> <Link href={`/en/tournament/${country[0].name.en.replaceAll(/\s+/g, '-').toLowerCase()}`} className='country-name'>{country[0].name.en}</Link>
                    <span className='league-name'> <span className='slash'>/</span> <Image className='league-logo' src={league[0].logo} width={22} height={16} alt={'logo ' + league[0].name.en} title={league[0].name.en} /> {league[0].name.en}</span>
                </h2>
                <div className="right">
                    <ul>
                        <li><Link href={`/en/tournament/${country[0].name.en.replaceAll(/\s+/g, '-').toLowerCase()}/${league[0].name.en.replaceAll('.', '').replaceAll('-', '').replaceAll(/\s+/g, '-').toLowerCase().replaceAll('ü', 'u').replaceAll('ə', 'a').replaceAll('ö', 'o').replaceAll('ğ', 'gh').replaceAll('ı', 'i').replaceAll('ç', 'c').replaceAll('ç', 'c').replaceAll('ã', 'a').replaceAll('ş', 's').replaceAll('ó', 'o').replaceAll('ú', 'u').replaceAll('é', 'e').replaceAll('ý', 'y').replaceAll('ï', 'i').replaceAll('á', 'a').replaceAll('ø', 'o').replaceAll('í', 'i').replaceAll('/', '-').replaceAll('\'', '')}/news`}>News</Link></li>
                        <li><Link href={`/en/tournament/${country[0].name.en.replaceAll(/\s+/g, '-').toLowerCase()}/${league[0].name.en.replaceAll('.', '').replaceAll('-', '').replaceAll(/\s+/g, '-').toLowerCase().replaceAll('ü', 'u').replaceAll('ə', 'a').replaceAll('ö', 'o').replaceAll('ğ', 'gh').replaceAll('ı', 'i').replaceAll('ç', 'c').replaceAll('ç', 'c').replaceAll('ã', 'a').replaceAll('ş', 's').replaceAll('ó', 'o').replaceAll('ú', 'u').replaceAll('é', 'e').replaceAll('ý', 'y').replaceAll('ï', 'i').replaceAll('á', 'a').replaceAll('ø', 'o').replaceAll('í', 'i').replaceAll('/', '-').replaceAll('\'', '')}/standings`}>Standings</Link></li>
                        <li><Link href={`/en/tournament/${country[0].name.en.replaceAll(/\s+/g, '-').toLowerCase()}/${league[0].name.en.replaceAll('.', '').replaceAll('-', '').replaceAll(/\s+/g, '-').toLowerCase().replaceAll('ü', 'u').replaceAll('ə', 'a').replaceAll('ö', 'o').replaceAll('ğ', 'gh').replaceAll('ı', 'i').replaceAll('ç', 'c').replaceAll('ç', 'c').replaceAll('ã', 'a').replaceAll('ş', 's').replaceAll('ó', 'o').replaceAll('ú', 'u').replaceAll('é', 'e').replaceAll('ý', 'y').replaceAll('ï', 'i').replaceAll('á', 'a').replaceAll('ø', 'o').replaceAll('í', 'i').replaceAll('/', '-').replaceAll('\'', '')}/results`}>Results</Link></li>
                        <li><Link href={`/en/tournament/${country[0].name.en.replaceAll(/\s+/g, '-').toLowerCase()}/${league[0].name.en.replaceAll('.', '').replaceAll('-', '').replaceAll(/\s+/g, '-').toLowerCase().replaceAll('ü', 'u').replaceAll('ə', 'a').replaceAll('ö', 'o').replaceAll('ğ', 'gh').replaceAll('ı', 'i').replaceAll('ç', 'c').replaceAll('ç', 'c').replaceAll('ã', 'a').replaceAll('ş', 's').replaceAll('ó', 'o').replaceAll('ú', 'u').replaceAll('é', 'e').replaceAll('ý', 'y').replaceAll('ï', 'i').replaceAll('á', 'a').replaceAll('ø', 'o').replaceAll('í', 'i').replaceAll('/', '-').replaceAll('\'', '')}/fixtures`}>Fixtures</Link></li>
                        <li><Link href={`/en/tournament/${country[0].name.en.replaceAll(/\s+/g, '-').toLowerCase()}/${league[0].name.en.replaceAll('.', '').replaceAll('-', '').replaceAll(/\s+/g, '-').toLowerCase().replaceAll('ü', 'u').replaceAll('ə', 'a').replaceAll('ö', 'o').replaceAll('ğ', 'gh').replaceAll('ı', 'i').replaceAll('ç', 'c').replaceAll('ç', 'c').replaceAll('ã', 'a').replaceAll('ş', 's').replaceAll('ó', 'o').replaceAll('ú', 'u').replaceAll('é', 'e').replaceAll('ý', 'y').replaceAll('ï', 'i').replaceAll('á', 'a').replaceAll('ø', 'o').replaceAll('í', 'i').replaceAll('/', '-').replaceAll('\'', '')}/top-scorers`}>Top scores</Link></li>
                    </ul>
                </div>
            </div>
            <Carousel lang={'en'} param={{name: "News", url: `${league[0].name.en.replaceAll('.', '').replaceAll('-', '').replaceAll(/\s+/g, '-').toLowerCase().replaceAll('ü', 'u').replaceAll('ə', 'a').replaceAll('ö', 'o').replaceAll('ğ', 'gh').replaceAll('ı', 'i').replaceAll('ç', 'c').replaceAll('ç', 'c').replaceAll('ã', 'a').replaceAll('ş', 's').replaceAll('ó', 'o').replaceAll('ú', 'u').replaceAll('é', 'e').replaceAll('ý', 'y').replaceAll('ï', 'i').replaceAll('á', 'a').replaceAll('ø', 'o').replaceAll('í', 'i').replaceAll('/', '-').replaceAll('\'', '')}/news`, limit: 5, tags: league[0].category && league[0].category.join(',')}} />
        </div>
    );
};

export default page;