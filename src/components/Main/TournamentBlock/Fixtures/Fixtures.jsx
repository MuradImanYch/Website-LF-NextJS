import Link from 'next/link';
import './Fixtures.css';
import Image from 'next/image';
import DateComponent from '@/components/News/Date/DateComponent';
import translate from '@/libs/translate';
import config from '../../../../../public/conf.json';

const Fixtures = async ({lang, currentSeason, leagueId, placement}) => {
    const date = new Date();

    const getFixtures = async () => {
        const url = placement === 'national-fixtures' ? `https://api-football-v1.p.rapidapi.com/v3/fixtures?team=${leagueId}&season=${date.getFullYear()}` : `https://api-football-v1.p.rapidapi.com/v3/fixtures?league=${leagueId}&season=${currentSeason}`;
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

    const fixtures = await getFixtures();

    const filteredNSMatches = fixtures?.response?.filter(match => match.fixture.status.short === 'NS');
    const filteredLiveMatches = fixtures?.response?.filter(match => match.fixture.status.short === '1H' || match.fixture.status.short === '2H' || match.fixture.status.short === 'HT');
    const filteredFullTimeMatches = fixtures?.response?.filter(match => match.fixture.status.short === 'FT');
    
    return (
        <article className="fixtures">
            <ul>
                {filteredLiveMatches.map(async e => {
                    return <li key={e.fixture.id}>
                        <Link href={'#'}>
                            <div className="left">
                                <span> {lang === 'en' ? e.league.round : config['correct-translate-ru'][await translate(e.league.round, {from: 'en', to: 'ru'})] ? config['correct-translate-ru'][await translate(e.league.round, {from: 'en', to: 'ru'})] : await translate(e.league.round, {from: 'en', to: 'ru'})}</span>
                            </div>
                            <div className="center">
                                <span>{lang === 'en' ? e.teams.home.name : config['correct-translate-ru'][await translate(e.teams.home.name, {from: 'en', to: 'ru'})] ? config['correct-translate-ru'][await translate(e.teams.home.name, {from: 'en', to: 'ru'})] : await translate(e.teams.home.name, {from: 'en', to: 'ru'})} <Image src={e.teams.home.logo} placeholder={'empty'} alt={lang === 'en' ? e.teams.home.name : config['correct-translate-ru'][await translate(e.teams.home.name, {from: 'en', to: 'ru'})] ? config['correct-translate-ru'][await translate(e.teams.home.name, {from: 'en', to: 'ru'})] : await translate(e.teams.home.name, {from: 'en', to: 'ru'})} title={lang === 'en' ? e.teams.home.name : config['correct-translate-ru'][await translate(e.teams.home.name, {from: 'en', to: 'ru'})] ? config['correct-translate-ru'][await translate(e.teams.home.name, {from: 'en', to: 'ru'})] : await translate(e.teams.home.name, {from: 'en', to: 'ru'})} width={'20'} height={'20'} /></span>
                                <span>{e.goals.home} : {e.goals.away}</span>
                                <span><Image src={e.teams.away.logo} placeholder={'empty'} alt={lang === 'en' ? e.teams.away.name : config['correct-translate-ru'][await translate(e.teams.away.name, {from: 'en', to: 'ru'})] ? config['correct-translate-ru'][await translate(e.teams.away.name, {from: 'en', to: 'ru'})] : await translate(e.teams.away.name, {from: 'en', to: 'ru'})} title={lang === 'en' ? e.teams.away.name : config['correct-translate-ru'][await translate(e.teams.away.name, {from: 'en', to: 'ru'})] ? config['correct-translate-ru'][await translate(e.teams.away.name, {from: 'en', to: 'ru'})] : await translate(e.teams.away.name, {from: 'en', to: 'ru'})} width={'20'} height={'20'} /> {lang === 'en' ? e.teams.away.name : config['correct-translate-ru'][await translate(e.teams.away.name, {from: 'en', to: 'ru'})] ? config['correct-translate-ru'][await translate(e.teams.away.name, {from: 'en', to: 'ru'})] : await translate(e.teams.away.name, {from: 'en', to: 'ru'})}</span>
                            </div>
                            <div className="right">
                                <span style={{color: 'red'}}>{e.fixture.status.long + ' - ' + e.fixture.status.elapsed + '\''}</span>
                            </div>
                        </Link>
                    </li>
                })}
                {placement !== 'main' && placement !== 'results-single' ? filteredNSMatches?.map(async e => {
                    return <li key={e.fixture.id}>
                        <Link href={'#'}>
                            <div className="left">
                                <span> {lang === 'en' ? e.league.round : config['correct-translate-ru'][await translate(e.league.round, {from: 'en', to: 'ru'})] ? config['correct-translate-ru'][await translate(e.league.round, {from: 'en', to: 'ru'})] : await translate(e.league.round, {from: 'en', to: 'ru'})}</span>
                            </div>
                            <div className="center">
                                <span>{lang === 'en' ? e.teams.home.name : config['correct-translate-ru'][await translate(e.teams.home.name, {from: 'en', to: 'ru'})] ? config['correct-translate-ru'][await translate(e.teams.home.name, {from: 'en', to: 'ru'})] : await translate(e.teams.home.name, {from: 'en', to: 'ru'})} <Image src={e.teams.home.logo} placeholder={'empty'} alt={lang === 'en' ? e.teams.home.name : config['correct-translate-ru'][await translate(e.teams.home.name, {from: 'en', to: 'ru'})] ? config['correct-translate-ru'][await translate(e.teams.home.name, {from: 'en', to: 'ru'})] : await translate(e.teams.home.name, {from: 'en', to: 'ru'})} title={lang === 'en' ? e.teams.home.name : config['correct-translate-ru'][await translate(e.teams.home.name, {from: 'en', to: 'ru'})] ? config['correct-translate-ru'][await translate(e.teams.home.name, {from: 'en', to: 'ru'})] : await translate(e.teams.home.name, {from: 'en', to: 'ru'})} width={'20'} height={'20'} /></span>
                                <span> <span>-</span> </span>
                                <span><Image src={e.teams.away.logo} placeholder={'empty'} alt={lang === 'en' ? e.teams.away.name : config['correct-translate-ru'][await translate(e.teams.away.name, {from: 'en', to: 'ru'})] ? config['correct-translate-ru'][await translate(e.teams.away.name, {from: 'en', to: 'ru'})] : await translate(e.teams.away.name, {from: 'en', to: 'ru'})} title={lang === 'en' ? e.teams.away.name : config['correct-translate-ru'][await translate(e.teams.away.name, {from: 'en', to: 'ru'})] ? config['correct-translate-ru'][await translate(e.teams.away.name, {from: 'en', to: 'ru'})] : await translate(e.teams.away.name, {from: 'en', to: 'ru'})} width={'20'} height={'20'} /> {lang === 'en' ? e.teams.away.name : config['correct-translate-ru'][await translate(e.teams.away.name, {from: 'en', to: 'ru'})] ? config['correct-translate-ru'][await translate(e.teams.away.name, {from: 'en', to: 'ru'})] : await translate(e.teams.away.name, {from: 'en', to: 'ru'})}</span>
                            </div>
                            <div className="right">
                                <span><DateComponent placement={'fixtures'} dateProps={e.fixture.date} /></span>
                            </div>
                        </Link>
                    </li>
                }) : placement !== 'results-single' && filteredNSMatches.slice(0, 5).map(async e => {
                    return <li key={e.fixture.id}>
                        <Link href={'#'}>
                            <div className="left">
                                <span> {lang === 'en' ? e.league.round : config['correct-translate-ru'][await translate(e.league.round, {from: 'en', to: 'ru'})] ? config['correct-translate-ru'][await translate(e.league.round, {from: 'en', to: 'ru'})] : await translate(e.league.round, {from: 'en', to: 'ru'})}</span>
                            </div>
                            <div className="center">
                                <span>{lang === 'en' ? e.teams.home.name : config['correct-translate-ru'][await translate(e.teams.home.name, {from: 'en', to: 'ru'})] ? config['correct-translate-ru'][await translate(e.teams.home.name, {from: 'en', to: 'ru'})] : await translate(e.teams.home.name, {from: 'en', to: 'ru'})} <Image src={e.teams.home.logo} placeholder={'empty'} alt={lang === 'en' ? e.teams.home.name : config['correct-translate-ru'][await translate(e.teams.home.name, {from: 'en', to: 'ru'})] ? config['correct-translate-ru'][await translate(e.teams.home.name, {from: 'en', to: 'ru'})] : await translate(e.teams.home.name, {from: 'en', to: 'ru'})} title={lang === 'en' ? e.teams.home.name : config['correct-translate-ru'][await translate(e.teams.home.name, {from: 'en', to: 'ru'})] ? config['correct-translate-ru'][await translate(e.teams.home.name, {from: 'en', to: 'ru'})] : await translate(e.teams.home.name, {from: 'en', to: 'ru'})} width={'20'} height={'20'} /></span>
                                <span> <span>-</span> </span>
                                <span><Image src={e.teams.away.logo} placeholder={'empty'} alt={lang === 'en' ? e.teams.away.name : config['correct-translate-ru'][await translate(e.teams.away.name, {from: 'en', to: 'ru'})] ? config['correct-translate-ru'][await translate(e.teams.away.name, {from: 'en', to: 'ru'})] : await translate(e.teams.away.name, {from: 'en', to: 'ru'})} title={lang === 'en' ? e.teams.away.name : config['correct-translate-ru'][await translate(e.teams.away.name, {from: 'en', to: 'ru'})] ? config['correct-translate-ru'][await translate(e.teams.away.name, {from: 'en', to: 'ru'})] : await translate(e.teams.away.name, {from: 'en', to: 'ru'})} width={'20'} height={'20'} /> {lang === 'en' ? e.teams.away.name : config['correct-translate-ru'][await translate(e.teams.away.name, {from: 'en', to: 'ru'})] ? config['correct-translate-ru'][await translate(e.teams.away.name, {from: 'en', to: 'ru'})] : await translate(e.teams.away.name, {from: 'en', to: 'ru'})}</span>
                            </div>
                            <div className="right">
                                <span><DateComponent placement={'fixtures'} dateProps={e.fixture.date} /></span>
                            </div>
                        </Link>
                    </li>
                })}
                {placement === 'national-fixtures' && filteredFullTimeMatches.slice(0, 5).reverse().map(async e => {
                    return <li key={e.fixture.id}>
                        <Link href={'#'}>
                            <div className="left">
                                <span> {lang === 'en' ? e.league.round : config['correct-translate-ru'][await translate(e.league.round, {from: 'en', to: 'ru'})] ? config['correct-translate-ru'][await translate(e.league.round, {from: 'en', to: 'ru'})] : await translate(e.league.round, {from: 'en', to: 'ru'})}</span>
                            </div>
                            <div className="center">
                                <span>{lang === 'en' ? e.teams.home.name : config['correct-translate-ru'][await translate(e.teams.home.name, {from: 'en', to: 'ru'})] ? config['correct-translate-ru'][await translate(e.teams.home.name, {from: 'en', to: 'ru'})] : await translate(e.teams.home.name, {from: 'en', to: 'ru'})} <Image src={e.teams.home.logo} placeholder={'empty'} alt={lang === 'en' ? e.teams.home.name : config['correct-translate-ru'][await translate(e.teams.home.name, {from: 'en', to: 'ru'})] ? config['correct-translate-ru'][await translate(e.teams.home.name, {from: 'en', to: 'ru'})] : await translate(e.teams.home.name, {from: 'en', to: 'ru'})} title={lang === 'en' ? e.teams.home.name : config['correct-translate-ru'][await translate(e.teams.home.name, {from: 'en', to: 'ru'})] ? config['correct-translate-ru'][await translate(e.teams.home.name, {from: 'en', to: 'ru'})] : await translate(e.teams.home.name, {from: 'en', to: 'ru'})} width={'20'} height={'20'} /></span>
                                <span>{e.goals.home} : {e.goals.away}</span>
                                <span><Image src={e.teams.away.logo} placeholder={'empty'} alt={lang === 'en' ? e.teams.away.name : config['correct-translate-ru'][await translate(e.teams.away.name, {from: 'en', to: 'ru'})] ? config['correct-translate-ru'][await translate(e.teams.away.name, {from: 'en', to: 'ru'})] : await translate(e.teams.away.name, {from: 'en', to: 'ru'})} title={lang === 'en' ? e.teams.away.name : config['correct-translate-ru'][await translate(e.teams.away.name, {from: 'en', to: 'ru'})] ? config['correct-translate-ru'][await translate(e.teams.away.name, {from: 'en', to: 'ru'})] : await translate(e.teams.away.name, {from: 'en', to: 'ru'})} width={'20'} height={'20'} /> {lang === 'en' ? e.teams.away.name : config['correct-translate-ru'][await translate(e.teams.away.name, {from: 'en', to: 'ru'})] ? config['correct-translate-ru'][await translate(e.teams.away.name, {from: 'en', to: 'ru'})] : await translate(e.teams.away.name, {from: 'en', to: 'ru'})}</span>
                            </div>
                            <div className="right">
                                <span>{e.fixture.status.long}</span>
                            </div>
                        </Link>
                    </li>
                })}
                {placement === 'results-single' && filteredFullTimeMatches.reverse().map(async e => {
                    return <li key={e.fixture.id}>
                        <Link href={'#'}>
                            <div className="left">
                                <span> {lang === 'en' ? e.league.round : config['correct-translate-ru'][await translate(e.league.round, {from: 'en', to: 'ru'})] ? config['correct-translate-ru'][await translate(e.league.round, {from: 'en', to: 'ru'})] : await translate(e.league.round, {from: 'en', to: 'ru'})}</span>
                            </div>
                            <div className="center">
                                <span>{lang === 'en' ? e.teams.home.name : config['correct-translate-ru'][await translate(e.teams.home.name, {from: 'en', to: 'ru'})] ? config['correct-translate-ru'][await translate(e.teams.home.name, {from: 'en', to: 'ru'})] : await translate(e.teams.home.name, {from: 'en', to: 'ru'})} <Image src={e.teams.home.logo} placeholder={'empty'} alt={lang === 'en' ? e.teams.home.name : config['correct-translate-ru'][await translate(e.teams.home.name, {from: 'en', to: 'ru'})] ? config['correct-translate-ru'][await translate(e.teams.home.name, {from: 'en', to: 'ru'})] : await translate(e.teams.home.name, {from: 'en', to: 'ru'})} title={lang === 'en' ? e.teams.home.name : config['correct-translate-ru'][await translate(e.teams.home.name, {from: 'en', to: 'ru'})] ? config['correct-translate-ru'][await translate(e.teams.home.name, {from: 'en', to: 'ru'})] : await translate(e.teams.home.name, {from: 'en', to: 'ru'})} width={'20'} height={'20'} /></span>
                                <span>{e.goals.home} : {e.goals.away}</span>
                                <span><Image src={e.teams.away.logo} placeholder={'empty'} alt={lang === 'en' ? e.teams.away.name : config['correct-translate-ru'][await translate(e.teams.away.name, {from: 'en', to: 'ru'})] ? config['correct-translate-ru'][await translate(e.teams.away.name, {from: 'en', to: 'ru'})] : await translate(e.teams.away.name, {from: 'en', to: 'ru'})} title={lang === 'en' ? e.teams.away.name : config['correct-translate-ru'][await translate(e.teams.away.name, {from: 'en', to: 'ru'})] ? config['correct-translate-ru'][await translate(e.teams.away.name, {from: 'en', to: 'ru'})] : await translate(e.teams.away.name, {from: 'en', to: 'ru'})} width={'20'} height={'20'} /> {lang === 'en' ? e.teams.away.name : config['correct-translate-ru'][await translate(e.teams.away.name, {from: 'en', to: 'ru'})] ? config['correct-translate-ru'][await translate(e.teams.away.name, {from: 'en', to: 'ru'})] : await translate(e.teams.away.name, {from: 'en', to: 'ru'})}</span>
                            </div>
                            <div className="right">
                                <span>{e.fixture.status.long}</span>
                            </div>
                        </Link>
                    </li>
                })}
                {placement === 'main' && filteredNSMatches.length === 0 && filteredLiveMatches.length === 0 && filteredFullTimeMatches.slice(0, 5).reverse().map(async e => {
                    return <li key={e.fixture.id}>
                        <Link href={'#'}>
                            <div className="left">
                                <span> {lang === 'en' ? e.league.round : config['correct-translate-ru'][await translate(e.league.round, {from: 'en', to: 'ru'})] ? config['correct-translate-ru'][await translate(e.league.round, {from: 'en', to: 'ru'})] : await translate(e.league.round, {from: 'en', to: 'ru'})}</span>
                            </div>
                            <div className="center">
                                <span>{lang === 'en' ? e.teams.home.name : config['correct-translate-ru'][await translate(e.teams.home.name, {from: 'en', to: 'ru'})] ? config['correct-translate-ru'][await translate(e.teams.home.name, {from: 'en', to: 'ru'})] : await translate(e.teams.home.name, {from: 'en', to: 'ru'})} <Image src={e.teams.home.logo} placeholder={'empty'} alt={lang === 'en' ? e.teams.home.name : config['correct-translate-ru'][await translate(e.teams.home.name, {from: 'en', to: 'ru'})] ? config['correct-translate-ru'][await translate(e.teams.home.name, {from: 'en', to: 'ru'})] : await translate(e.teams.home.name, {from: 'en', to: 'ru'})} title={lang === 'en' ? e.teams.home.name : config['correct-translate-ru'][await translate(e.teams.home.name, {from: 'en', to: 'ru'})] ? config['correct-translate-ru'][await translate(e.teams.home.name, {from: 'en', to: 'ru'})] : await translate(e.teams.home.name, {from: 'en', to: 'ru'})} width={'20'} height={'20'} /></span>
                                <span>{e.goals.home} : {e.goals.away}</span>
                                <span><Image src={e.teams.away.logo} placeholder={'empty'} alt={lang === 'en' ? e.teams.away.name : config['correct-translate-ru'][await translate(e.teams.away.name, {from: 'en', to: 'ru'})] ? config['correct-translate-ru'][await translate(e.teams.away.name, {from: 'en', to: 'ru'})] : await translate(e.teams.away.name, {from: 'en', to: 'ru'})} title={lang === 'en' ? e.teams.away.name : config['correct-translate-ru'][await translate(e.teams.away.name, {from: 'en', to: 'ru'})] ? config['correct-translate-ru'][await translate(e.teams.away.name, {from: 'en', to: 'ru'})] : await translate(e.teams.away.name, {from: 'en', to: 'ru'})} width={'20'} height={'20'} /> {lang === 'en' ? e.teams.away.name : config['correct-translate-ru'][await translate(e.teams.away.name, {from: 'en', to: 'ru'})] ? config['correct-translate-ru'][await translate(e.teams.away.name, {from: 'en', to: 'ru'})] : await translate(e.teams.away.name, {from: 'en', to: 'ru'})}</span>
                            </div>
                            <div className="right">
                                <span>{e.fixture.status.long}</span>
                            </div>
                        </Link>
                    </li>
                })}
            </ul>
        </article>
    );
};

export default Fixtures;