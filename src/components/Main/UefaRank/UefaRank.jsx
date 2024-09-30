import Link from 'next/link';
import './UefaRank.css';
import Image from 'next/image';
import uefaLogo from '../../../../public/assets/ico/uefaLogo.webp';

async function fetchUefaRankSeasons() {
    try {
      const res = await fetch(`http://78.46.254.73:3000/api/uefa-rank-seasons`, {cache: 'no-cache'});
      const data = await res.json();
      
      return data;
    } 
    catch (err) {
      console.error(err);
    }
}

const UefaRank = async ({placement}) => {
    
async function fetchUefaRank() {
    try {
      const res = await fetch(`http://78.46.254.73:3000/api/uefa-rank?limit=${placement === 'main' && 10}`, {cache: 'no-cache'});
      const data = await res.json();
      
      return data;
    } 
    catch (err) {
      console.error(err);
    }
}

    const seasons = await fetchUefaRankSeasons();
    const ranking = await fetchUefaRank();

    return (
        <section className='uefaRank'>
            {placement === 'main' ? <div className="head">
                <Image placeholder={'empty'} className='logo' src={uefaLogo} width={22} height={16} alt={'УЕФА лого'} title={'УЕФА лого'} /> <h2 className="name"><Link href={'/uefa-ranking'}>Таблица УЕФА</Link></h2>
            </div> : null}
            <div className="standings">
                <table>
                    <thead>
                        <tr>
                            <th className="place">#</th>
                            <th className="team">Страна</th>
                            <th className='current-points'>{seasons && seasons[0]?.seasonCurrent}</th>
                            {placement === 'page' && <th className='previous-points'>{seasons && seasons[0]?.seasonLast2}</th>}
                            {placement === 'page' && <th className='previous-points'>{seasons && seasons[0]?.seasonLast3}</th>}
                            {placement === 'page' && <th className='previous-points'>{seasons && seasons[0]?.seasonLast4}</th>}
                            {placement === 'page' && <th className='previous-points'>{seasons && seasons[0]?.seasonLast5}</th>}
                            <th className='points'>Сумма</th>
                            <th className='clubs'>Клубы</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ranking && ranking?.map((e, i) => {
                            return <tr id={e.name} key={'rank' + i}>
                                <td className="place">{e.place}.</td>
                                <td className="team"><Image title={e.name} alt={"команда " + e.name} src={'https://terrikon.com' + e.flag} width={'21'} height={'1'} placeholder={'empty'} /> {e.name}</td>
                                <td className='current-points'>{e.totalCurrent}</td>
                                {placement === 'page' && <td className='previous-points'>{e.totalLast2}</td>}
                                {placement === 'page' && <td className='previous-points'>{e.totalLast3}</td>}
                                {placement === 'page' && <td className='previous-points'>{e.totalLast4}</td>}
                                {placement === 'page' && <td className='previous-points'>{e.totalLast5}</td>}
                                <td className='points'>{e.total}</td>
                                <td className='clubs'>{e.quantity}</td>
                            </tr>
                        })}
                    </tbody>
                </table>
            </div>
        </section>
    );
};

export default UefaRank;