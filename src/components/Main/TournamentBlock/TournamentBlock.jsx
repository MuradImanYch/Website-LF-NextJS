import './TournamentBlock.css';
import config from '../../../../public/conf.json';
import Image from 'next/image';
import Slider from '@/components/Main/TournamentBlock/Slider/Slider';
import Link from 'next/link';
import Standings from './Standings/Standings';
import Fixtures from './Fixtures/Fixtures';

const TournamentBlock = async ({leagueId, news, lang, fixtures, placement}) => {
    const league = config.tournaments.map(tournament => tournament.leagues.find(league => league.id === leagueId && league.type !== 'National')).find(league => league !== undefined);
    
    let countryName;

    for (const country of config.tournaments) {
        const league = country.leagues.find(league => league.id === leagueId);
        if (league) {
            countryName = country;
        }
    }

    const countryPathname = countryName.name.en.replace(/\s+/g, '-').toLowerCase();
    const leaguePathname = league.name.en.replaceAll('.', '').replaceAll('-', '').replaceAll(/\s+/g, '-').toLowerCase().replaceAll('ü', 'u').replaceAll('ə', 'a').replaceAll('ö', 'o').replaceAll('ğ', 'gh').replaceAll('ı', 'i').replaceAll('ç', 'c').replaceAll('ç', 'c').replaceAll('ã', 'a').replaceAll('ş', 's').replaceAll('ó', 'o').replaceAll('ú', 'u').replaceAll('é', 'e').replaceAll('ý', 'y').replaceAll('ï', 'i').replaceAll('á', 'a').replaceAll('ø', 'o').replaceAll('í', 'i').replaceAll('/', '-').replaceAll('\'', '').replaceAll('--', '');

    const getCurrentSeasonFromLeagueId = async () => {
        const url = `https://api-football-v1.p.rapidapi.com/v3/leagues?id=${leagueId}&current=true`;
        // const url = ``;
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
        <section className="tournamentBlock">
            <div className="head">
                <Image className="logo" src={league.logo} width={22} height={16} alt={lang === 'en' ? league.name.en : league.name.ru} title={lang === 'en' ? league.name.en : league.name.ru} />
                <h2 className="name"><Link href={`${lang === 'en' ? 'en' : ''}/tournament/${countryPathname}/${leaguePathname}`}>{lang === 'en' ? league.name.en : league.name.ru}</Link></h2>
            </div>
            <div className="wrap">
                <div className="col">
                    <Slider leagueId={leagueId} news={news} lang={lang} />
                    <Link href={`${lang === 'en' ? 'en' : ''}/tournament/${countryPathname}/${leaguePathname}/news`}>{lang === 'en' ? "All news" : "Все новости"}</Link>
                </div>
                <div className="standings-fixtures">
                    <div className="col">
                        <Standings lang={lang} currentSeason={currentSeason && currentSeason.response[0].seasons[0].year} leagueId={leagueId} />
                        <Link href={`${lang === 'en' ? 'en' : ''}/tournament/${countryPathname}/${leaguePathname}/standings`}>{lang === 'en' ? "More details" : "Подробнее"}</Link>
                    </div>
                    <div className="col">
                        <Fixtures lang={lang} currentSeason={currentSeason && currentSeason.response[0].seasons[0].year} leagueId={leagueId} placement={placement} />
                        <Link href={`${lang === 'en' ? 'en' : ''}/tournament/${countryPathname}/${leaguePathname}/fixtures`}>{lang === 'en' ? 'Full schedule' : 'Полное расписание'}</Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TournamentBlock;