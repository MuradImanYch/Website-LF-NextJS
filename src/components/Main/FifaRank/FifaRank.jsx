import Link from 'next/link';
import './FifaRank.css';
import '../UefaRank/UefaRank.css';
import Image from 'next/image';
import fifaLogo from '../../../../public/assets/ico/fifaLogo.webp';
import translate from '@/libs/translate';
import config from '../../../../public/conf.json';

const FifaRank = async ({placement, lang}) => {
    async function fetchFifaRank() {
        try {
          const res = await fetch(`${config.domain}/api/fifa-rank?limit=${placement === 'main' && 10}`, {cache: 'no-cache'});
          const data = await res.json();
          
          return data;
        } 
        catch (err) {
          console.error(err);
        }
    }

    const ranking = await fetchFifaRank();

    return (
        <section className='fifaRank'>
            {placement === 'main' && <div className="head">
                <Image placeholder={'empty'} className='logo' src={fifaLogo} width={30} height={16} alt={lang === 'en' ? 'FIFA logo' : 'ФИФА лого'} title={lang === 'en' ? 'FIFA logo' : 'ФИФА лого'} /><h2 className="name"><Link href={`${lang === 'en' ? 'en' : ''}/fifa-ranking`}>{lang === 'en' ? 'FIFA Ranking' : 'Таблица ФИФА'}</Link></h2>
            </div>}
            <div className="standings">
                <table>
                    <thead>
                        <tr>
                            <th className="place">#</th>
                            <th className="team">{lang === 'en' ? 'Country' : 'Страна'}</th>
                            <th className='current-points'>{lang === 'en' ? 'Points' : 'Очки'}</th>
                            {placement === 'page' && <th className="pointsDiff">+/-</th>}
                            <th className='difference'>{lang === 'en' ? 'Changes' : 'Изменения'}</th>
                            <th className='clubs association'>{lang === 'en' ? 'Associations' : 'Ассоциации'}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ranking && ranking?.map(async (e, i) => {
                            return <tr id={e.name} key={'rank' + i}>
                                <td className="place">{e.place}.</td>
                                <td className="team"><Image title={lang === 'en' ? await translate(e.name, {to: 'en'}) : e.name} alt={lang === 'en' ? await translate(e.name, {to: 'en'}) : e.name} src={e.flag} width={'21'} height={'1'} placeholder={'empty'} /> {lang === 'en' ? await translate(e.name, {to: 'en'}) : e.name}</td>
                                <td className='current-points'>{e.points}</td>
                                {placement === 'page' && <th className="pointsDiff">{e.pointsDiff}</th>}
                                {e.difference.includes('↑') ? <td className='points difference' style={{color: "green"}}>{e.difference}</td> : <td className='points difference'>{e.difference}</td> && e.difference.includes('↓') ? <td className='points difference' style={{color: "red"}}>{e.difference}</td> : <td className='points difference'>{e.difference}</td>}
                                <td className='clubs association'>{lang === 'en' ? await translate(e.association, {to: 'en'}) : e.association}</td>
                            </tr>
                        })}
                    </tbody>
                </table>
            </div>
        </section>
    );
};

export default FifaRank;