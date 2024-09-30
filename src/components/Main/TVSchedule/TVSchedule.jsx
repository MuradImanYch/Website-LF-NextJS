import Link from 'next/link';
import './TVSchedule.css';
import Image from 'next/image';

const TVSchedule = async ({placement}) => {
    async function fetchTVSchedule() {
        try {
          const res = await fetch(`http://78.46.254.73:3000/api/tv-schedule?limit=${placement === 'main' && 30}`, {cache: 'no-cache'});
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
                <h2 className="name"><Link href={'/tv-schedule'}>ТВ расписание</Link></h2>
            </div>}
            <ul className="wrap">
                {tv && placement === 'main' ? tv.slice(10, 18).map((e, i) => {
                    return <li key={'tv-schedule' + i} className="items">
                        {e.live ? <span title='Сейчас идёт' className='live-dot'></span> : null}
                        <Image placeholder={'empty'} width={'60'} height={'10'} src={e.channel} alt={'Канал ' + i} title={'Канал ' + i} />
                        {e.live ? <span style={{color: "red", fontWeight: 'bold'}}>{e.time}</span> : <span>{e.time}</span>}
                        <span>{e.programme}</span>
                    </li>
                }) : tv.map((e, i) => {
                    return <li key={'tv-schedule' + i} className="items">
                        {e.live ? <span title='Сейчас идёт' className='live-dot'></span> : null}
                        <Image placeholder={'empty'} width={'60'} height={'10'} src={e.channel} alt={'Канал ' + i} title={'Канал ' + i} />
                        {e.live ? <span style={{color: "red", fontWeight: 'bold'}}>{e.time}</span> : <span>{e.time}</span>}
                        <span>{e.programme}</span>
                    </li>
                })}
            </ul>
        </section>
    );
};

export default TVSchedule;