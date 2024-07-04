import './TournamentBlock.css';
import config from '../../../../public/conf.json';
import Image from 'next/image';
import Slider from '@/components/Main/TournamentBlock/Slider/Slider';
import Link from 'next/link';
import Standings from './Standings/Standings';
import Fixtures from './Fixtures/Fixtures';

const TournamentBlock = ({leagueId}) => {
    const league = config.tournaments.map(tournament => tournament.leagues.find(league => league.id === leagueId))
  .find(league => league !== undefined);

    return (
        <div className="tournamentBlock">
            <div className="head">
                <Image className="logo" src={league.logo} width={22} height={16} alt={'лого ' + league.name.ru} title={league.name.ru} />
                <span className="name">{league.name.ru}</span>
            </div>
            <div className="wrap">
                <div className="col">
                    <Slider />
                    <Link href={'#'}>Все новости</Link>
                </div>
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
    );
};

export default TournamentBlock;