import '@/app/tournament/[country]/[league]/top-scorers/style.css';
import '@/app/tournament/[country]/style.css';
import Image from "next/image";
import Link from "next/link";
import config from '../../../../../../../public/conf.json';
import TopScores from '@/components/Main/TournamentBlock/TopScores/TopScores';
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
        title: `${country[0]?.name.en} ${league[0]?.name.en} Top Scorers - Player Rankings`,
        description: `List of top scorers in the ${country[0]?.name.en} ${league[0]?.name.en}. See who leads in goals scored.`,
        keywords: `${league[0]?.name.en} top scorers, player rankings ${country[0]?.name.en}, goal leaders`,
        openGraph: {
          type: 'website',
          title: `${country[0]?.name.en} ${league[0]?.name.en} Top Scorers - Player Rankings`,
          description: `Current schedule of upcoming ${country[0]?.name.en} ${league[0]?.name.en} matches. Find out when the key games will take place.`
        },
        twitter: {
          card: 'summary_large_image',
          title: `${country[0]?.name.en} ${league[0]?.name.en} Top Scorers - Player Rankings`,
          description: `Current schedule of upcoming ${country[0]?.name.en} ${league[0]?.name.en} matches. Find out when the key games will take place.`
        }
    };
};

const page = async ({params}) => {
    const country = config.tournaments.filter(e => {
        return e.name.en.toLowerCase().replace(/\s+/g, '').replace(/-/g, '') === params.country.replace(/-/g, '');
    });

    const league = country[0].leagues.filter(e => {
        return e.name.en.toLowerCase().replaceAll(/\s+/g, '').replaceAll(/-/g, '').replaceAll('ü', 'u').replaceAll('ə', 'a').replaceAll('ö', 'o').replaceAll('ğ', 'gh').replaceAll('ı', 'i').replaceAll('ç', 'c').replaceAll('ş', 's').replaceAll('ç', 'c').replaceAll('ã', 'a').replaceAll('ó', 'o').replaceAll('ú', 'u').replaceAll('é', 'e').replaceAll('ý', 'y').replaceAll('ï', 'i').replaceAll('á', 'a').replaceAll('ø', 'o').replaceAll('í', 'i').replaceAll('/', '').replaceAll('\'', '').replaceAll('.', '') === params.league.replaceAll(/-/g, '');
    });

    const getCurrentSeasonFromLeagueId = async () => {
        const url = `https://api-football-v1.p.rapidapi.com/v3/leagues?id=${league[0].id}&current=true`;
        const options = {
            method: 'GET',
            headers: {
                'x-rapidapi-key': '64ba7a5252msh7ee95ca829ca2e4p126736jsn8b074c27e2a5',
                'x-rapidapi-host': 'api-football-v1.p.rapidapi.com'
            },
            cache: 'no-cache'
        };

        try {
            const response = await fetch(url, options);
            const result = await response.json();
            return result;
        } catch (error) {
            console.error(error);
        }
    }

    const currentSeason = await getCurrentSeasonFromLeagueId();

    return (
        <div className='league-top-scores tournament-country tournamentBlock'>
            <div className="head">
                <h2 className="left">
                    <div className="name">
                        <Image className='country-flag' src={country[0].flag} width={22} height={16} alt={'флаг ' + country[0].name.en} title={country[0].name.en} /> <Link href={`/en/tournament/${country[0].name.en.replaceAll(/\s+/g, '-').toLowerCase()}`} className='country-name'>{country[0].name.en}</Link><span className='slash'>/</span><Image className='league-logo' src={league[0].logo} width={22} height={16} alt={'лого ' + league[0].name.en} title={league[0].name.en} /><Link href={`/en/tournament/${country[0].name.en.replaceAll(/\s+/g, '-').toLowerCase()}/${league[0].name.en.replaceAll('.', '').replaceAll('-', '').replaceAll(/\s+/g, '-').toLowerCase().replaceAll('ü', 'u').replaceAll('ə', 'a').replaceAll('ö', 'o').replaceAll('ğ', 'gh').replaceAll('ı', 'i').replaceAll('ç', 'c').replaceAll('ç', 'c').replaceAll('ã', 'a').replaceAll('ş', 's').replaceAll('ó', 'o').replaceAll('ú', 'u').replaceAll('é', 'e').replaceAll('ý', 'y').replaceAll('ï', 'i').replaceAll('á', 'a').replaceAll('ø', 'o').replaceAll('í', 'i').replaceAll('/', '-').replaceAll('\'', '')}`} className='country-name league-name'>{league[0].name.en}</Link><span className='league-name'> <span className='slash'>/</span> Top Scores</span>
                    </div>
                </h2>
            </div>
            <TopScores lang={'en'} placement={'top-scores-single'} leagueId={league[0].id} currentSeason={currentSeason && currentSeason.response[0].seasons[0].year} />
        </div>
    );
};

export default page;