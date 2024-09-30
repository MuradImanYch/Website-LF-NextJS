import Link from 'next/link';
import './Broadcasts.css';
import Image from 'next/image';
import DateComponent from '@/components/News/Date/DateComponent';
import cyrillicToTranslit from 'cyrillic-to-translit-js';

const Broadcasts = async ({placement}) => {
    async function fetchBroadcasts() {
        try {
          const res = await fetch(`http://78.46.254.73:3000/api/broadcasts?limit=${placement === 'main' && 5}`, {cache: 'no-cache'});
          const data = await res.json();
          
          return data;
        } 
        catch (err) {
          console.error(err);
        }
    }
    
    const broadcasts = await fetchBroadcasts();

    return (
        <section className='broadcasts'>
            {placement === 'main' && <div className="head">
                <h2 className='name'><Link href={'/broadcasts'}>Трансляции матчей</Link></h2>
            </div>}
            <ul className="wrap">
                {broadcasts && broadcasts.length > 0 ? broadcasts.map((e, i) => {
                    const time = e.time; // ваше время
                    const today = new Date(); // текущая дата
                    
                    // Создаем объект Date, добавляя время к текущей дате
                    const dateTime = new Date(`${today.toISOString().split('T')[0]}T${time}:00Z`);
                    
                    return <li className='items' key={'broadcast' + i}>
                            <Link href={`/broadcasts/watch/${e.id + '-' + cyrillicToTranslit().transform(e.hName.replaceAll('.', '').replaceAll(/\s+/g, '-').toLowerCase().replaceAll('ü', 'u').replaceAll('ə', 'a').replaceAll('ö', 'o').replaceAll('ğ', 'gh').replaceAll('ı', 'i').replaceAll('ç', 'c').replaceAll('ç', 'c').replaceAll('ã', 'a').replaceAll('ş', 's').replaceAll('ó', 'o').replaceAll('ú', 'u').replaceAll('é', 'e').replaceAll('ý', 'y').replaceAll('ï', 'i').replaceAll('á', 'a').replaceAll('ø', 'o').replaceAll('í', 'i').replaceAll('/', '-').replaceAll('\'', '') + '-' + e.aName.replaceAll('.', '').replaceAll(/\s+/g, '-').toLowerCase().replaceAll('ü', 'u').replaceAll('ə', 'a').replaceAll('ö', 'o').replaceAll('ğ', 'gh').replaceAll('ı', 'i').replaceAll('ç', 'c').replaceAll('ç', 'c').replaceAll('ã', 'a').replaceAll('ş', 's').replaceAll('ó', 'o').replaceAll('ú', 'u').replaceAll('é', 'e').replaceAll('ý', 'y').replaceAll('ï', 'i').replaceAll('á', 'a').replaceAll('ø', 'o').replaceAll('í', 'i').replaceAll('/', '-').replaceAll('\'', '') + '-' + e.lName.replaceAll('.', '').replaceAll(/\s+/g, '-').toLowerCase().replaceAll('ü', 'u').replaceAll('ə', 'a').replaceAll('ö', 'o').replaceAll('ğ', 'gh').replaceAll('ı', 'i').replaceAll('ç', 'c').replaceAll('ç', 'c').replaceAll('ã', 'a').replaceAll('ş', 's').replaceAll('ó', 'o').replaceAll('ú', 'u').replaceAll('é', 'e').replaceAll('ý', 'y').replaceAll('ï', 'i').replaceAll('á', 'a').replaceAll('ø', 'o').replaceAll('í', 'i').replaceAll('/', '-').replaceAll('\'', '')).replaceAll(/\s+/g, '-').toLowerCase().replace(/-+$/, '').replace('---', '-')}`}>
                                <div className="left">
                                    <Image title={e.hName} alt={e.hName + ' лого'} placeholder={'empty'} src={e.hLogo} width={'20'} height={'20'} />
                                    <span>{e.hName}</span>
                                </div>
                                <div className="center">
                                    <span>{e.lName}</span>
                                    <span className='live'>live</span>
                                    <span><DateComponent placement={'broadcasts'} dateProps={dateTime.toISOString()} /></span>
                                </div>
                                <div className="right">
                                    <span>{e.aName}</span>
                                    <Image title={e.aName} alt={e.aName + ' лого'} placeholder={'empty'} src={e.aLogo} width={'20'} height={'20'} />
                                </div>
                            </Link>
                    </li>
                }) : <div className='no-data'>Данные появятся позже</div>}
            </ul>
        </section>
    );
};

export default Broadcasts;