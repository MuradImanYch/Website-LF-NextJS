import Link from 'next/link';
import './Odds.css';
import Image from 'next/image';

const Odds = async ({placement}) => {
    async function fetchOdds() {
        try {
          const res = await fetch(`http://78.46.254.73:3000/api/odds?limit=${placement === 'main' && 6}`, {cache: 'no-cache'});
          const data = await res.json();
          
          return data;
        } 
        catch (err) {
          console.error(err);
        }
    }

    const odds = await fetchOdds();

    return (
        <section className='odds'>
            {placement === 'main' && <div className="head">
                <h2 className="name"><Link href={`/odds`}>Котировки на матчи</Link></h2>
            </div>}
            <div className="wrap">
                {odds && odds.map((e, i) => {
                    return <div key={'odds' + i} className="item">
                        <div className="items">
                            <div className="left">
                                <Image title={e.hName} alt={'команда ' + e.hName} src={e.hLogo} placeholder={'empty'} width={'25'} height={'25'} />
                                <span>{e.hName}</span>
                            </div>
                            <div className="center">
                                <span>{e.lName}</span>
                                <span className='date'>{e.date}</span>
                            </div>
                            <div className="right">
                                <span>{e.aName}</span>
                                <Image title={e.aName} alt={'команда ' + e.aName} src={e.aLogo} placeholder={'empty'} width={'25'} height={'25'} />
                            </div>
                        </div>
                        <div className="odds-wrap">
                            <div className="item">
                                <span className='param'>П1</span>
                                <span className='rate'>{e.w1}</span>
                            </div>
                            <div className="item">
                                <span className='param'>X</span>
                                <span className='rate'>{e.draw}</span>
                            </div>
                            <div className="item">
                                <span className='param'>П2</span>
                                <span className='rate'>{e.w2}</span>
                            </div>
                            <div className="item">
                                <span className='param'>ТМ 2.5</span>
                                <span className='rate'>{e.totalU}</span>
                            </div>
                            <div className="item">
                                <span className='param'>ТБ 2.5</span>
                                <span className='rate'>{e.totalO}</span>
                            </div>
                        </div>
                    </div>
                })}
            </div>
        </section>
    );
};

export default Odds;