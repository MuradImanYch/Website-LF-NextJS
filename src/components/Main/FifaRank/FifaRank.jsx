import Link from 'next/link';
import './FifaRank.css';
import '../UefaRank/UefaRank.css';
import Image from 'next/image';
import fifaLogo from '../../../../public/assets/ico/fifaLogo.webp';

const FifaRank = async ({placement}) => {
    async function fetchFifaRank() {
        try {
          const res = await fetch(`http://78.46.254.73:3000/api/fifa-rank?limit=${placement === 'main' && 10}`, {cache: 'no-cache'});
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
                <Image placeholder={'empty'} className='logo' src={fifaLogo} width={30} height={16} alt={'ФИФА лого'} title={'ФИФА лого'} /><h2 className="name"><Link href={'/fifa-ranking'}>Таблица ФИФА</Link></h2>
            </div>}
            <div className="standings">
                <table>
                    <thead>
                        <tr>
                            <th className="place">#</th>
                            <th className="team">Страна</th>
                            <th className='current-points'>Очки</th>
                            {placement === 'page' && <th className="pointsDiff">+/-</th>}
                            <th className='difference'>Изменения</th>
                            <th className='clubs association'>Ассоциации</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ranking && ranking?.map((e, i) => {
                            return <tr id={e.name} key={'rank' + i}>
                                <td className="place">{e.place}.</td>
                                <td className="team"><Image title={e.name} alt={'команда ' + e.name} src={e.flag} width={'21'} height={'1'} placeholder={'empty'} /> {e.name}</td>
                                <td className='current-points'>{e.points}</td>
                                {placement === 'page' && <th className="pointsDiff">{e.pointsDiff}</th>}
                                {e.difference.includes('↑') ? <td className='points difference' style={{color: "green"}}>{e.difference}</td> : <td className='points difference'>{e.difference}</td> && e.difference.includes('↓') ? <td className='points difference' style={{color: "red"}}>{e.difference}</td> : <td className='points difference'>{e.difference}</td>}
                                <td className='clubs association'>{e.association}</td>
                            </tr>
                        })}
                    </tbody>
                </table>
            </div>
        </section>
    );
};

export default FifaRank;