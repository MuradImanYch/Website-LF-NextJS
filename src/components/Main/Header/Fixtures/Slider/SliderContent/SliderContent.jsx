import Image from 'next/image';
import Link from 'next/link';
import DateComponent from '@/components/News/Date/DateComponent';
import translate from '@/libs/translate';
import config from '../../../../../../../public/conf.json';

const SliderContent = async ({fixtures, lang}) => {
    return (
        <>
            {fixtures && fixtures.map(async e => {
                return <div className="swiper-slide" key={e.fixture.id} style={{background: `${e.fixture.status.elapsed !== null && e.fixture.status.short !== 'FT' && "rgba(252, 3, 3, 0.7)"}`}}>
                            <div className="col">
                                <p></p>
                                <div>
                                    <Image placeholder={'empty'} width={'22'} height={'22'} src={e.teams.home.logo} alt={lang === 'en' ? e.teams.home.name : config['correct-translate-ru'][await translate(e.teams.home.name, {from: 'en', to: 'ru'})] ? config['correct-translate-ru'][await translate(e.teams.home.name, {from: 'en', to: 'ru'})] : await translate(e.teams.home.name, {from: 'en', to: 'ru'})} title={lang === 'en' ? e.teams.home.name : config['correct-translate-ru'][await translate(e.teams.home.name, {from: 'en', to: 'ru'})] ? config['correct-translate-ru'][await translate(e.teams.home.name, {from: 'en', to: 'ru'})] : await translate(e.teams.home.name, {from: 'en', to: 'ru'})} />
                                    <span className='team-name'>{lang === 'en' ? e.teams.home.name : config['correct-translate-ru'][await translate(e.teams.home.name, {from: 'en', to: 'ru'})] ? config['correct-translate-ru'][await translate(e.teams.home.name, {from: 'en', to: 'ru'})] : await translate(e.teams.home.name, {from: 'en', to: 'ru'})}</span>
                                </div>
                                <span className='odd'>{e.fixture.status.short === 'NS' && <span>{e.odds ? e.odds[0].bets[0].values[0].odd : '-'}</span>}</span>
                            </div>
                            <div className="col">
                                <div>
                                    <Image className='league-logo' placeholder={'empty'} width={'20'} height={'20'} src={e.league.logo} alt={lang === 'en' ? e.league.name : config['correct-translate-ru'][await translate(e.league.name, {from: 'en', to: 'ru'})] ? config['correct-translate-ru'][await translate(e.league.name, {from: 'en', to: 'ru'})] : await translate(e.league.name, {from: 'en', to: 'ru'})} title={lang === 'en' ? e.league.name : config['correct-translate-ru'][await translate(e.league.name, {from: 'en', to: 'ru'})] ? config['correct-translate-ru'][await translate(e.league.name, {from: 'en', to: 'ru'})] : await translate(e.league.name, {from: 'en', to: 'ru'})} />
                                    <span className='league-name'>{lang === 'en' ? e.league.name : config['correct-translate-ru'][await translate(e.league.name, {from: 'en', to: 'ru'})] ? config['correct-translate-ru'][await translate(e.league.name, {from: 'en', to: 'ru'})] : await translate(e.league.name, {from: 'en', to: 'ru'})}</span>
                                </div>
                                {e.fixture.status.elapsed !== null ? <div className='score'><span>{e.goals.home}</span> <span>-</span> <span>{e.goals.away}</span></div> : <span className='date'><DateComponent placement={'fixtures'} dateProps={e.fixture.date} /></span>}
                                {e.fixture.status.short !== 'NS' && <span className='status'>{e.fixture.status.long}</span>}
                                {e.fixture.status.short === 'NS' && <span className='odd'><span>{e.odds ? e.odds[0].bets[0].values[1].odd : '-'}</span></span>}
                            </div>
                            <div className="col">
                                <p></p>
                                <div>
                                    <Image placeholder={'empty'} width={'22'} height={'22'} src={e.teams.away.logo} alt={lang === 'en' ? e.teams.away.name : config['correct-translate-ru'][await translate(e.teams.away.name, {from: 'en', to: 'ru'})] ? config['correct-translate-ru'][await translate(e.teams.away.name, {from: 'en', to: 'ru'})] : await translate(e.teams.away.name, {from: 'en', to: 'ru'})} title={lang === 'en' ? e.teams.away.name : config['correct-translate-ru'][await translate(e.teams.away.name, {from: 'en', to: 'ru'})] ? config['correct-translate-ru'][await translate(e.teams.away.name, {from: 'en', to: 'ru'})] : await translate(e.teams.away.name, {from: 'en', to: 'ru'})} />
                                    <span className='team-name'>{lang === 'en' ? e.teams.away.name : config['correct-translate-ru'][await translate(e.teams.away.name, {from: 'en', to: 'ru'})] ? config['correct-translate-ru'][await translate(e.teams.away.name, {from: 'en', to: 'ru'})] : await translate(e.teams.away.name, {from: 'en', to: 'ru'})}</span>
                                </div>
                                <span className='odd'>{e.fixture.status.short === 'NS' && <span>{e.odds ? e.odds[0].bets[0].values[2].odd : '-'}</span>}</span>
                            </div>
                        </div>
            })}
        </>
    );
};

export default SliderContent;