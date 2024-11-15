import Link from 'next/link';
import './TVSchedule.css';
import Image from 'next/image';
import translate from '@/libs/translate';
import config from '../../../../public/conf.json';

const TVSchedule = async ({placement, lang}) => {
    async function fetchTVSchedule() {
        try {
          const res = await fetch(`${config.domain}/api/tv-schedule?limit=${placement === 'main' && 30}`, {cache: 'no-cache'});
          const data = await res.json();
          
          return data;
        } 
        catch (err) {
          console.error(err);
        }
    }

    const tv = await fetchTVSchedule();

    return (
        <section className='tv-schedule'>
            {placement === 'main' && <div className="head">
                <h2 className="name"><Link href={`${lang === 'en' ? 'en' : ''}/tv-schedule`}>{lang === 'en' ? 'TV Schedule' : 'ТВ расписание'}</Link></h2>
            </div>}
            <ul className="wrap">
                {tv && placement === 'main' ? tv.slice(10, 18).map(async (e, i) => {
                    return <li key={'tv-schedule' + i} className="items">
                        {e.live ? <span title='Сейчас идёт' className='live-dot'></span> : null}
                        <Image placeholder={'empty'} width={'60'} height={'10'} src={e.channel} alt={lang === 'en' ? 'Channel ' + i : 'Канал ' + i} title={lang === 'en' ? 'Channel ' + i : 'Канал ' + i} />
                        {e.live ? <span style={{color: "red", fontWeight: 'bold'}}>{e.time}</span> : <span>{e.time}</span>}
                        <span>{lang === 'en' ? await translate(e.programme, {to: 'en'}) : await translate(e.programme, {to: 'ru'})}</span>
                    </li>
                }) : tv && tv.map(async (e, i) => {
                    return <li key={'tv-schedule' + i} className="items">
                        {e.live ? <span title='Сейчас идёт' className='live-dot'></span> : null}
                        <Image placeholder={'empty'} width={'60'} height={'10'} src={e.channel} alt={lang === 'en' ? 'Channel ' + i : 'Канал ' + i} title={lang === 'en' ? 'Channel ' + i : 'Канал ' + i} />
                        {e.live ? <span style={{color: "red", fontWeight: 'bold'}}>{e.time}</span> : <span>{e.time}</span>}
                        <span>{lang === 'en' ? await translate(e.programme, {to: 'en'}) : await translate(e.programme, {to: 'ru'})}</span>
                    </li>
                })}
            </ul>
        </section>
    );
};

export default TVSchedule;