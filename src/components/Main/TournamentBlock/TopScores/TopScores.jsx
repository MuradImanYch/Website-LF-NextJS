import Image from 'next/image';
import './TopScores.css';
import translate from '@/libs/translate';
import config from '../../../../../public/conf.json';

const TopScores = async ({lang, currentSeason, leagueId, placement}) => {
    const getTopScores = async () => {
        const url = `https://api-football-v1.p.rapidapi.com/v3/players/topscorers?league=${leagueId}&season=${currentSeason}`;
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

    const topScores = await getTopScores();

    return (
        <div className="top-scores">
            <table>
                <thead>
                    <tr>
                        <th className="place" title={lang === 'en' ? 'Rank' : 'Позиция'}>#</th>
                        <th className="player" title={lang === 'en' ? 'Player' : 'Игрок'}>{lang === 'en' ? 'Player' : 'Игрок'}</th>
                        <th className="team" title={lang === 'en' ? 'Team' : 'Команда'}>{lang === 'en' ? 'Team' : 'Команда'}</th>
                        <th className='position' title={lang === 'en' ? 'Position' : 'Позиция'}>{lang === 'en' ? 'Position' : 'Позиция'}</th>
                        <th className='games' title={lang === 'en' ? 'Games (Lineups) (Minutes)' : 'Игры (Старт) (Минуты)'}>{lang === 'en' ? 'G (Lineups) (Min)' : 'И (Старт) (Мин)'}</th>
                        <th className='goals' title={lang === 'en' ? 'Goals' : 'Голы'}>{lang === 'en' ? 'G' : 'Г'}</th>
                        <th className='penalty' title={lang === 'en' ? 'Penalty (Missed)' : 'Пенальти (Не забитые)'}>{lang === 'en' ? "P (X)" : "П (X)"}</th>
                        <th className='assists' title={lang === 'en' ? 'Assists' : 'Ассисты'}>А</th>
                        <th className='cards' title={lang === 'en' ? 'Yellow cards / Red cards (2x Yellow cards)' : 'Жёлтые карточки / Красные карточки (2х Жёлтые карточки)'}>{lang === 'en' ? 'YK / RK (х2 YK)' : 'ЖК / КК (х2 ЖК)'}</th>
                    </tr>
                </thead>
                <tbody>
                    {topScores.response.map(async (e, i) => {
                        return <tr key={i}>
                            <td className="place">{i + 1 + '.'}</td>
                            <td className="player"><Image placeholder={'empty'} width={'35'} height={'35'} alt={lang === 'en' ? e.player.name : config['correct-translate-ru'][await translate(e.player.name, {from: 'en', to: 'ru'})] ? config['correct-translate-ru'][await translate(e.player.name, {from: 'en', to: 'ru'})] : await translate(e.player.name, {from: 'en', to: 'ru'})} title={lang === 'en' ? e.player.name : config['correct-translate-ru'][await translate(e.player.name, {from: 'en', to: 'ru'})] ? config['correct-translate-ru'][await translate(e.player.name, {from: 'en', to: 'ru'})] : await translate(e.player.name, {from: 'en', to: 'ru'})} src={e.player.photo} /> {lang === 'en' ? e.player.name : config['correct-translate-ru'][await translate(e.player.name, {from: 'en', to: 'ru'})] ? config['correct-translate-ru'][await translate(e.player.name, {from: 'en', to: 'ru'})] : await translate(e.player.name, {from: 'en', to: 'ru'})}</td>
                            <td className="team"><div><Image placeholder={'empty'} width={'20'} height={'20'} alt={e.statistics[0].team.name} title={e.statistics[0].team.name} src={e.statistics[0].team.logo} /> {e.statistics[0].team.name}</div></td>
                            <td className='position'>{lang === 'en' ? e.statistics[0].games.position : config['correct-translate-ru'][await translate(e.statistics[0].games.position, {from: 'en', to: 'ru'})] ? config['correct-translate-ru'][await translate(e.statistics[0].games.position, {from: 'en', to: 'ru'})] : await translate(e.statistics[0].games.position, {from: 'en', to: 'ru'})}</td>
                            <td className='games'>{e.statistics[0].games.appearences + ' ' + `(${e.statistics[0].games.lineups}) (${e.statistics[0].games.minutes})`}</td>
                            <td className='goals'>{e.statistics[0].goals.total}</td>
                            <td className='penalty'>{e.statistics[0].penalty.scored} {` (${e.statistics[0].penalty.missed})`}</td>
                            <td className='assists'>{e.statistics[0].goals.assists}</td>
                            <td className='cards'>{`${e.statistics[0].cards.yellow} / ${e.statistics[0].cards.red} (${e.statistics[0].cards.yellowred})`}</td>
                        </tr>
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default TopScores;