import Link from 'next/link';
import './UefaRank.css';
import Image from 'next/image';
import uefaLogo from '../../../../public/assets/ico/uefaLogo.webp';
import translate from '@/libs/translate';
import config from '../../../../public/conf.json';

async function fetchUefaRankSeasons() {
    try {
      const res = await fetch(`${config.domain}/api/uefa-rank-seasons`, {cache: 'no-cache'});
      const data = await res.json();
      
      return data;
    } 
    catch (err) {
      console.error(err);
    }
}

const UefaRank = async ({placement, lang}) => {
    
async function fetchUefaRank() {
    try {
      const res = await fetch(`${config.domain}/api/uefa-rank?limit=${placement === 'main' && 10}`, {cache: 'no-cache'});
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
                <Image placeholder={'empty'} className='logo' src={uefaLogo} width={22} height={16} alt={lang === 'en' ? 'UEFA logo' : 'УЕФА лого'} title={lang === 'en' ? 'UEFA logo' : 'УЕФА лого'} /> <h2 className="name"><Link href={`${lang === 'en' ? 'en' : ''}/uefa-ranking`}>{lang === 'en' ? 'UEFA Ranking' : 'Таблица УЕФА'}</Link></h2>
            </div> : null}
            <div className="standings">
                <table>
                    <thead>
                        <tr>
                            <th className="place">#</th>
                            <th className="team">{lang === 'en' ? 'Country' : 'Страна'}</th>
                            <th className='current-points'>{seasons && seasons[0]?.seasonCurrent}</th>
                            {placement === 'page' && <th className='previous-points'>{seasons && seasons[0]?.seasonLast2}</th>}
                            {placement === 'page' && <th className='previous-points'>{seasons && seasons[0]?.seasonLast3}</th>}
                            {placement === 'page' && <th className='previous-points'>{seasons && seasons[0]?.seasonLast4}</th>}
                            {placement === 'page' && <th className='previous-points'>{seasons && seasons[0]?.seasonLast5}</th>}
                            <th className='points'>{lang === 'en' ? 'Total' : 'Сумма'}</th>
                            <th className='clubs'>{lang === 'en' ? 'Clubs' : 'Клубы'}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ranking && ranking?.map(async (e, i) => {
                            return <tr id={e.name} key={'rank' + i}>
                                <td className="place">{e.place}.</td>
                                <td className="team"><Image title={lang === 'en' ? await translate(e.name, {to: 'en'}) : e.name} alt={lang === 'en' ? await translate(e.name, {to: 'en'}) : e.name} src={'https://terrikon.com' + e.flag} width={'21'} height={'1'} placeholder={'empty'} /> {lang === 'en' ? await translate(e.name, {to: 'en'}) : e.name}</td>
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