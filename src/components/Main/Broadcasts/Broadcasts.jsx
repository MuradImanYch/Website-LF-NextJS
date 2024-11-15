import Link from 'next/link';
import './Broadcasts.css';
import Image from 'next/image';
import DateComponent from '@/components/News/Date/DateComponent';
// import cyrillicToTranslit from 'cyrillic-to-translit-js';
import translate from '@/libs/translate';
import undefTeam from '../../../../public/assets/ico/undefTeam.webp';
import config from '../../../../public/conf.json';

const Broadcasts = async ({placement, lang}) => {
    async function fetchBroadcasts() {
        try {
          const res = await fetch(`${config.domain}/api/broadcasts?limit=${placement === 'main' && 5}`, {cache: 'no-cache'});
          const data = await res.json();
          
          return data;
        } 
        catch (err) {
          console.error(err);
        }
    }
    
    const broadcasts = await fetchBroadcasts();

    const finished = broadcasts?.filter(match => match.status === 'finished');
    const scheduled = broadcasts?.filter(match => match.status === 'scheduled');
    const live = broadcasts?.filter(match => match.status === 'live');

    return (
        <section className='broadcasts'>
            {placement === 'main' && <div className="head">
                <h2 className='name'><Link href={`${lang === 'en' ? 'en' : ''}/broadcasts`}>{lang === 'en' ? 'Broadcast of matches' : 'Трансляция матчей'}</Link></h2>
            </div>}
            <ul className="wrap">
                {live && live.length > 0 && live.map(async (e, i) => {
                    const time = e.time; // ваше время
                    const today = new Date(); // текущая дата
                    
                    // Создаем объект Date, добавляя время к текущей дате
                    const dateTime = new Date(`${today.toISOString().split('T')[0]}T${time}:00Z`);
                    
                    return <li className='items' key={'broadcast' + i}>
                            <Link href={`${lang === 'en' ? '/en' : ''}/broadcasts/watch/${e.url}`}>
                                <div className="left">
                                    <Image title={lang === 'en' ? e.hName : config['correct-translate-ru'][await translate(e.hName, {from: 'en', to: 'ru'})] ? config['correct-translate-ru'][await translate(e.hName, {from: 'en', to: 'ru'})] : await translate(e.hName, {from: 'en', to: 'ru'})} alt={lang === 'en' ? e.hName : config['correct-translate-ru'][await translate(e.hName, {from: 'en', to: 'ru'})] ? config['correct-translate-ru'][await translate(e.hName, {from: 'en', to: 'ru'})] : await translate(e.hName, {from: 'en', to: 'ru'})} placeholder={'empty'} src={e.hLogo === '0' ? undefTeam : e.hLogo} width={'20'} height={'20'} />
                                    <span>{lang === 'en' ? e.hName : config['correct-translate-ru'][await translate(e.hName, {from: 'en', to: 'ru'})] ? config['correct-translate-ru'][await translate(e.hName, {from: 'en', to: 'ru'})] : await translate(e.hName, {from: 'en', to: 'ru'})}</span>
                                </div>
                                <div className="center">
                                    <span>{lang === 'en' ? e.lName : config['correct-translate-ru'][await translate(e.lName, {from: 'en', to: 'ru'})] ? config['correct-translate-ru'][await translate(e.lName, {from: 'en', to: 'ru'})] : await translate(e.lName, {from: 'en', to: 'ru'})}</span>
                                    {e.status === 'scheduled' ? <span className='status pending'>{lang === 'en' ? 'Scheduled' : 'Запланировано'}</span> : null || e.status === 'live' ? <span className='status live'>{lang === 'en' ? 'Live' : 'Прямой эфир'}</span> : null || e.status === 'finished' ? <span className='status finished'>{lang === 'en' ? 'Finished' : 'Завершён'}</span> : null}
                                    <span>{e.date} | <DateComponent placement={'broadcasts'} dateProps={dateTime.toISOString()} /></span>
                                </div>
                                <div className="right">
                                    <span>{lang === 'en' ? e.aName : config['correct-translate-ru'][await translate(e.aName, {from: 'en', to: 'ru'})] ? config['correct-translate-ru'][await translate(e.aName, {from: 'en', to: 'ru'})] : await translate(e.aName, {from: 'en', to: 'ru'})}</span>
                                    <Image title={lang === 'en' ? e.aName : config['correct-translate-ru'][await translate(e.aName, {from: 'en', to: 'ru'})] ? config['correct-translate-ru'][await translate(e.aName, {from: 'en', to: 'ru'})] : await translate(e.aName, {from: 'en', to: 'ru'})} alt={lang === 'en' ? e.aName : config['correct-translate-ru'][await translate(e.aName, {from: 'en', to: 'ru'})] ? config['correct-translate-ru'][await translate(e.aName, {from: 'en', to: 'ru'})] : await translate(e.aName, {from: 'en', to: 'ru'})} placeholder={'empty'} src={e.aLogo === '0' ? undefTeam : e.aLogo} width={'20'} height={'20'} />
                                </div>
                            </Link>
                    </li>
                })}

                {scheduled && scheduled.length > 0 && scheduled.map(async (e, i) => {
                    const time = e.time; // ваше время
                    const today = new Date(); // текущая дата
                    
                    // Создаем объект Date, добавляя время к текущей дате
                    const dateTime = new Date(`${today.toISOString().split('T')[0]}T${time}:00Z`);
                    
                    return <li className='items' key={'broadcast' + i}>
                            <Link href={`${lang === 'en' ? '/en' : ''}/broadcasts/watch/${e.url}`}>
                                <div className="left">
                                    <Image title={lang === 'en' ? e.hName : config['correct-translate-ru'][await translate(e.hName, {from: 'en', to: 'ru'})] ? config['correct-translate-ru'][await translate(e.hName, {from: 'en', to: 'ru'})] : await translate(e.hName, {from: 'en', to: 'ru'})} alt={lang === 'en' ? e.hName : config['correct-translate-ru'][await translate(e.hName, {from: 'en', to: 'ru'})] ? config['correct-translate-ru'][await translate(e.hName, {from: 'en', to: 'ru'})] : await translate(e.hName, {from: 'en', to: 'ru'})} placeholder={'empty'} src={e.hLogo === '0' ? undefTeam : e.hLogo} width={'20'} height={'20'} />
                                    <span>{lang === 'en' ? e.hName : config['correct-translate-ru'][await translate(e.hName, {from: 'en', to: 'ru'})] ? config['correct-translate-ru'][await translate(e.hName, {from: 'en', to: 'ru'})] : await translate(e.hName, {from: 'en', to: 'ru'})}</span>
                                </div>
                                <div className="center">
                                    <span>{lang === 'en' ? e.lName : config['correct-translate-ru'][await translate(e.lName, {from: 'en', to: 'ru'})] ? config['correct-translate-ru'][await translate(e.lName, {from: 'en', to: 'ru'})] : await translate(e.lName, {from: 'en', to: 'ru'})}</span>
                                    {e.status === 'scheduled' ? <span className='status pending'>{lang === 'en' ? 'Scheduled' : 'Запланировано'}</span> : null || e.status === 'live' ? <span className='status live'>{lang === 'en' ? 'Live' : 'Прямой эфир'}</span> : null || e.status === 'finished' ? <span className='status finished'>{lang === 'en' ? 'Finished' : 'Завершён'}</span> : null}
                                    <span>{e.date} | <DateComponent placement={'broadcasts'} dateProps={dateTime.toISOString()} /></span>
                                </div>
                                <div className="right">
                                    <span>{lang === 'en' ? e.aName : config['correct-translate-ru'][await translate(e.aName, {from: 'en', to: 'ru'})] ? config['correct-translate-ru'][await translate(e.aName, {from: 'en', to: 'ru'})] : await translate(e.aName, {from: 'en', to: 'ru'})}</span>
                                    <Image title={lang === 'en' ? e.aName : config['correct-translate-ru'][await translate(e.aName, {from: 'en', to: 'ru'})] ? config['correct-translate-ru'][await translate(e.aName, {from: 'en', to: 'ru'})] : await translate(e.aName, {from: 'en', to: 'ru'})} alt={lang === 'en' ? e.aName : config['correct-translate-ru'][await translate(e.aName, {from: 'en', to: 'ru'})] ? config['correct-translate-ru'][await translate(e.aName, {from: 'en', to: 'ru'})] : await translate(e.aName, {from: 'en', to: 'ru'})} placeholder={'empty'} src={e.aLogo === '0' ? undefTeam : e.aLogo} width={'20'} height={'20'} />
                                </div>
                            </Link>
                    </li>
                })}

                {finished && finished.length > 0 && finished.reverse().map(async (e, i) => {
                    const time = e.time; // ваше время
                    const today = new Date(); // текущая дата
                    
                    // Создаем объект Date, добавляя время к текущей дате
                    const dateTime = new Date(`${today.toISOString().split('T')[0]}T${time}:00Z`);
                    
                    return <li className='items' key={'broadcast' + i}>
                            <Link href={`${lang === 'en' ? '/en' : ''}/broadcasts/watch/${e.url}`}>
                                <div className="left">
                                    <Image title={lang === 'en' ? e.hName : config['correct-translate-ru'][await translate(e.hName, {from: 'en', to: 'ru'})] ? config['correct-translate-ru'][await translate(e.hName, {from: 'en', to: 'ru'})] : await translate(e.hName, {from: 'en', to: 'ru'})} alt={lang === 'en' ? e.hName : config['correct-translate-ru'][await translate(e.hName, {from: 'en', to: 'ru'})] ? config['correct-translate-ru'][await translate(e.hName, {from: 'en', to: 'ru'})] : await translate(e.hName, {from: 'en', to: 'ru'})} placeholder={'empty'} src={e.hLogo === '0' ? undefTeam : e.hLogo} width={'20'} height={'20'} />
                                    <span>{lang === 'en' ? e.hName : config['correct-translate-ru'][await translate(e.hName, {from: 'en', to: 'ru'})] ? config['correct-translate-ru'][await translate(e.hName, {from: 'en', to: 'ru'})] : await translate(e.hName, {from: 'en', to: 'ru'})}</span>
                                </div>
                                <div className="center">
                                    <span>{lang === 'en' ? e.lName : config['correct-translate-ru'][await translate(e.lName, {from: 'en', to: 'ru'})] ? config['correct-translate-ru'][await translate(e.lName, {from: 'en', to: 'ru'})] : await translate(e.lName, {from: 'en', to: 'ru'})}</span>
                                    {e.status === 'scheduled' ? <span className='status pending'>{lang === 'en' ? 'Scheduled' : 'Запланировано'}</span> : null || e.status === 'live' ? <span className='status live'>{lang === 'en' ? 'Live' : 'Прямой эфир'}</span> : null || e.status === 'finished' ? <span className='status finished'>{lang === 'en' ? 'Finished' : 'Завершён'}</span> : null}
                                    <span>{e.date} | <DateComponent placement={'broadcasts'} dateProps={dateTime.toISOString()} /></span>
                                </div>
                                <div className="right">
                                    <span>{lang === 'en' ? e.aName : config['correct-translate-ru'][await translate(e.aName, {from: 'en', to: 'ru'})] ? config['correct-translate-ru'][await translate(e.aName, {from: 'en', to: 'ru'})] : await translate(e.aName, {from: 'en', to: 'ru'})}</span>
                                    <Image title={lang === 'en' ? e.aName : config['correct-translate-ru'][await translate(e.aName, {from: 'en', to: 'ru'})] ? config['correct-translate-ru'][await translate(e.aName, {from: 'en', to: 'ru'})] : await translate(e.aName, {from: 'en', to: 'ru'})} alt={lang === 'en' ? e.aName : config['correct-translate-ru'][await translate(e.aName, {from: 'en', to: 'ru'})] ? config['correct-translate-ru'][await translate(e.aName, {from: 'en', to: 'ru'})] : await translate(e.aName, {from: 'en', to: 'ru'})} placeholder={'empty'} src={e.aLogo === '0' ? undefTeam : e.aLogo} width={'20'} height={'20'} />
                                </div>
                            </Link>
                    </li>
                })}
            </ul>
        </section>
    );
};

export default Broadcasts;