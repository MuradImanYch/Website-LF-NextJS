import Image from 'next/image';
import './Standings.css';
import config from '../../../../../public/conf.json';
import translate from '@/libs/translate';

const Standings = async ({currentSeason, leagueId, placement, lang}) => {
    
    const getStandingsByIdAndCurrentSeason = async () => {
        const url = `https://api-football-v1.p.rapidapi.com/v3/standings?league=${leagueId}&season=${currentSeason}`;
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

    const standings = await getStandingsByIdAndCurrentSeason();

    return (
        <article className='standings'>
            <table>
                {placement === 'standings-single' && standings.response[0]?.league.standings.length > 1 && <caption>{lang === 'en' ? standings.response[0]?.league.standings[0][0].group : config['correct-translate-ru'][await translate(standings.response[0]?.league.standings[0][0].group, {from: 'en', to: 'ru'})] ? config['correct-translate-ru'][await translate(standings.response[0]?.league.standings[0][0].group, {from: 'en', to: 'ru'})] : await translate(standings.response[0]?.league.standings[0][0].group, {from: 'en', to: 'ru'})}</caption>}
                <thead>
                    <tr>
                        <th className="place" title={lang === 'en' ? 'Rank' : 'Позиция'}>#</th>
                        <th className="team" title={lang === 'en' ? 'Team' : 'Команда'}>{lang === 'en' ? 'Team' : 'Команда'}</th>
                        {placement === 'standings-single' && <th className="games" title={lang === 'en' ? 'Games' : 'Игры'}>{lang === 'en' ? 'G' : 'И'}</th>}
                        {placement === 'standings-single' && <th className="win" title={lang === 'en' ? 'Winnings' : 'Выигрыши'}>{lang === 'en' ? 'W' : 'В'}</th>}
                        {placement === 'standings-single' && <th className="draw" title={lang === 'en' ? 'Draws' : 'Ничьи'}>{lang === 'en' ? 'D' : 'Н'}</th>}
                        {placement === 'standings-single' && <th className="lose" title={lang === 'en' ? 'Losses' : 'Проигрыши'}>{lang === 'en' ? 'L' : 'П'}</th>}
                        {placement === 'standings-single' && <th className="goals-for" title={lang === 'en' ? 'Goals for' : 'Забитые голы'}>{lang === 'en' ? 'GF' : 'ЗГ'}</th>}
                        {placement === 'standings-single' && <th className="goals-against" title={lang === 'en' ? 'Goals against' : 'Пропущенные голы'}>{lang === 'en' ? 'GA' : 'ПГ'}</th>}
                        <th className='points' title={lang === 'en' ? 'Points' : 'Очки'}>{lang === 'en' ? 'P' : 'О'}</th>
                        <th className='form' title={lang === 'en' ? 'Form' : 'Форма'}>{lang === 'en' ? 'F' : 'Ф'}</th>
                    </tr>
                </thead>
                <tbody>
                {standings && 
                    (placement !== 'standings-single' ? standings.response[0]?.league.standings[0].slice(0, 5) : standings.response[0]?.league.standings[0]
                    )?.map(async (e, i) => (
                        <tr key={i}>
                            <td className="place" title={e?.description}>
                                <span className={e?.description !== null && 'description'} style={{
                                    background: e?.description?.includes('Champions League') ? 'blue' : 
                                                e?.description?.includes('Championship') ? 'blue' :
                                                e?.description?.includes('Europa League') ? 'orange' :
                                                e?.description?.includes('Conference League') ? 'green' :
                                                e?.description === 'Playoffs' ? 'red' :
                                                e?.description?.includes('Relegation') ? 'gray' :
                                                e?.description?.includes('finals') ? 'red' :
                                                e?.description?.includes('Play-off') ? 'darkred' :
                                                e?.description?.includes('Qualifying') ? 'darkred' :
                                                e?.description?.includes('Next') ? 'red' :
                                                e?.description?.includes('AFC') ? 'cornflowerblue' :
                                                e?.description?.includes('Final') ? 'blue' :
                                                e?.description?.includes('Libertadores') ? 'burlywood ' :
                                                e?.description?.includes('Sudamericana') ? 'brown ' :
                                                e?.description?.includes('Play Offs') ? 'red' :
                                                e?.description?.includes('placed team') ? 'lightgreen' :
                                                e?.description?.includes('Playoffs') ? 'darkred' :
                                                e?.description?.includes('Promotion') ? 'red' : null,
                                    color: '#fff'
                                }}>{e.rank}</span>
                            </td>
                            <td className="team">
                                <Image alt={lang === 'en' ? e.team.name : config['correct-translate-ru'][await translate(e.team.name, {from: 'en', to: 'ru'})] ? config['correct-translate-ru'][await translate(e.team.name, {from: 'en', to: 'ru'})] : await translate(e.team.name, {from: 'en', to: 'ru'})} title={lang === 'en' ? e.team.name : config['correct-translate-ru'][await translate(e.team.name, {from: 'en', to: 'ru'})] ? config['correct-translate-ru'][await translate(e.team.name, {from: 'en', to: 'ru'})] : await translate(e.team.name, {from: 'en', to: 'ru'})} width={'20'} height={'20'} src={e.team.logo} placeholder={'empty'} />
                                <span>{lang === 'en' ? e.team.name : config['correct-translate-ru'][await translate(e.team.name, {from: 'en', to: 'ru'})] ? config['correct-translate-ru'][await translate(e.team.name, {from: 'en', to: 'ru'})] : await translate(e.team.name, {from: 'en', to: 'ru'})}</span>
                            </td>
                            {placement === 'standings-single' && <td className="games"><span>{e.all.played}</span></td>}
                            {placement === 'standings-single' && <td className="win"><span>{e.all.win}</span></td>}
                            {placement === 'standings-single' && <td className="draw"><span>{e.all.draw}</span></td>}
                            {placement === 'standings-single' && <td className="lose"><span>{e.all.lose}</span></td>}
                            {placement === 'standings-single' && <td className="goals-for"><span>{e.all.goals.for}</span></td>}
                            {placement === 'standings-single' && <td className="goals-against"><span>{e.all.goals.against}</span></td>}
                            <td className='points'><span>{e.points}</span></td>
                            <td className='form'>
                                <span>{e.form?.split('').map((formLetter, index) => (
                                    <span key={index} style={{
                                        background: formLetter === 'W' ? 'green' : 
                                                    formLetter === 'D' ? 'gray' : 
                                                    formLetter === 'L' ? 'red' : null,
                                        color: '#fff'
                                    }}>{formLetter}</span>
                                ))}</span>
                            </td>
                        </tr>
                    ))
                }
                </tbody>
            </table>
            {placement === 'standings-single' && standings.response[0]?.league.standings?.slice(1)?.map(async (e, i) => {
                return <table style={{marginTop: '10px'}} key={i}>
                        {placement === 'standings-single' && <caption>{lang === 'en' ? e[0].group : config['correct-translate-ru'][await translate(e[0].group, {from: 'en', to: 'ru'})] ? config['correct-translate-ru'][await translate(e[0].group, {from: 'en', to: 'ru'})] : await translate(e[0].group, {from: 'en', to: 'ru'})}</caption>}
                        <thead>
                            <tr>
                                <th className="place" title={lang === 'en' ? 'Rank' : 'Позиция'}>#</th>
                                <th className="team" title={lang === 'en' ? 'Team' : 'Команда'}>{lang === 'en' ? 'Team' : 'Команда'}</th>
                                {placement === 'standings-single' && <th className="games" title={lang === 'en' ? 'Games' : 'Игры'}>{lang === 'en' ? 'G' : 'И'}</th>}
                                {placement === 'standings-single' && <th className="win" title={lang === 'en' ? 'Winnings' : 'Выигрыши'}>{lang === 'en' ? 'W' : 'В'}</th>}
                                {placement === 'standings-single' && <th className="draw" title={lang === 'en' ? 'Draws' : 'Ничьи'}>{lang === 'en' ? 'D' : 'Н'}</th>}
                                {placement === 'standings-single' && <th className="lose" title={lang === 'en' ? 'Losses' : 'Проигрыши'}>{lang === 'en' ? 'L' : 'П'}</th>}
                                {placement === 'standings-single' && <th className="goals-for" title={lang === 'en' ? 'Goals for' : 'Забитые голы'}>{lang === 'en' ? 'GF' : 'ЗГ'}</th>}
                                {placement === 'standings-single' && <th className="goals-against" title={lang === 'en' ? 'Goals against' : 'Пропущенные голы'}>{lang === 'en' ? 'GA' : 'ПГ'}</th>}
                                <th className='points' title={lang === 'en' ? 'Points' : 'Очки'}>{lang === 'en' ? 'P' : 'О'}</th>
                                <th className='form' title={lang === 'en' ? 'Form' : 'Форма'}>{lang === 'en' ? 'F' : 'Ф'}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {e.map(async (e, i) => (
                                <tr key={i}>
                                    <td className="place" title={e?.description}>
                                        <span className={e?.description !== null && 'description'} style={{
                                            background: e?.description?.includes('Champions League') ? 'blue' : 
                                                        e?.description?.includes('Championship') ? 'blue' :
                                                        e?.description?.includes('Europa League') ? 'orange' :
                                                        e?.description?.includes('Conference League') ? 'green' :
                                                        e?.description === 'Playoffs' ? 'red' :
                                                        e?.description?.includes('Relegation') ? 'gray' :
                                                        e?.description?.includes('finals') ? 'red' :
                                                        e?.description?.includes('Play-off') ? 'darkred' :
                                                        e?.description?.includes('Qualifying') ? 'darkred' :
                                                        e?.description?.includes('Next') ? 'red' :
                                                        e?.description?.includes('AFC') ? 'cornflowerblue' :
                                                        e?.description?.includes('Final') ? 'blue' :
                                                        e?.description?.includes('Libertadores') ? 'burlywood ' :
                                                        e?.description?.includes('Sudamericana') ? 'brown ' :
                                                        e?.description?.includes('Play Offs') ? 'red' :
                                                        e?.description?.includes('placed team') ? 'lightgreen' :
                                                        e?.description?.includes('Playoffs') ? 'darkred' :
                                                        e?.description?.includes('Promotion') ? 'red' : null,
                                            color: '#fff'
                                        }}>{e.rank}</span>
                                    </td>
                                    <td className="team">
                                        <Image alt={lang === 'en' ? e.team.name : config['correct-translate-ru'][await translate(e.team.name, {from: 'en', to: 'ru'})] ? config['correct-translate-ru'][await translate(e.team.name, {from: 'en', to: 'ru'})] : await translate(e.team.name, {from: 'en', to: 'ru'})} title={lang === 'en' ? e.team.name : config['correct-translate-ru'][await translate(e.team.name, {from: 'en', to: 'ru'})] ? config['correct-translate-ru'][await translate(e.team.name, {from: 'en', to: 'ru'})] : await translate(e.team.name, {from: 'en', to: 'ru'})} width={'20'} height={'20'} src={e.team.logo} placeholder={'empty'} />
                                        <span>{lang === 'en' ? e.team.name : config['correct-translate-ru'][await translate(e.team.name, {from: 'en', to: 'ru'})] ? config['correct-translate-ru'][await translate(e.team.name, {from: 'en', to: 'ru'})] : await translate(e.team.name, {from: 'en', to: 'ru'})}</span>
                                    </td>
                                    {placement === 'standings-single' && <td className="games"><span>{e.all.played}</span></td>}
                                    {placement === 'standings-single' && <td className="win"><span>{e.all.win}</span></td>}
                                    {placement === 'standings-single' && <td className="draw"><span>{e.all.draw}</span></td>}
                                    {placement === 'standings-single' && <td className="lose"><span>{e.all.lose}</span></td>}
                                    {placement === 'standings-single' && <td className="goals-for"><span>{e.all.goals.for}</span></td>}
                                    {placement === 'standings-single' && <td className="goals-against"><span>{e.all.goals.against}</span></td>}
                                    <td className='points'><span>{e.points}</span></td>
                                    <td className='form'>
                                        <span>{e.form?.split('').map((formLetter, index) => (
                                            <span key={index} style={{
                                                background: formLetter === 'W' ? 'green' : 
                                                            formLetter === 'D' ? 'gray' : 
                                                            formLetter === 'L' ? 'red' : null,
                                                color: '#fff'
                                            }}>{formLetter}</span>
                                        ))}</span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                </table>
            })}
        </article>
    );
};

export default Standings;