import './TournamentBlock.css';
import config from '../../../../public/conf.json';
import Image from 'next/image';
import Slider from '@/components/Main/TournamentBlock/Slider/Slider';
import Link from 'next/link';
import Standings from './Standings/Standings';
import Fixtures from './Fixtures/Fixtures';

const TournamentBlock = ({leagueId, news}) => {
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

    return (
        <section className="tournamentBlock">
            <div className="head">
                <Image className="logo" src={league.logo} width={22} height={16} alt={'лого ' + league.name.ru} title={league.name.ru} />
                <h2 className="name"><Link href={`/tournament/${countryPathname}/${leaguePathname}`}>{league.name.ru}</Link></h2>
            </div>
            <div className="wrap">
                <div className="col">
                    <Slider leagueId={leagueId} news={news} />
                    <Link href={'#'}>Все новости</Link>
                </div>
                <div className="standings-fixtures">
                    <div className="col">
                        <Standings />
                        <Link href={'#'}>Подробнее</Link>
                    </div>
                    <div className="col">
                        <Fixtures />
                        <Link href={'#'}>Полное расписание</Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TournamentBlock;