import './TournamentBlock.css';
import config from '../../../../public/conf.json';
import Image from 'next/image';

const TournamentBlock = () => {
    const league = config.tournaments.map(tournament => tournament.leagues.find(league => league.id === 61))
  .find(league => league !== undefined);

    return (
        <div className="tournamentBlock">
            <div className="head">
                <Image className="logo" src={league.logo} width={22} height={16} alt={'лого ' + league.name.ru} title={league.name.ru} />
                <span className="name">{league.name.ru}</span>
            </div>
        </div>
    );
};

export default TournamentBlock;