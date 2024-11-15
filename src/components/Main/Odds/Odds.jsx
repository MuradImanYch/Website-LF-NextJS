import Link from 'next/link';
import './Odds.css';
import Image from 'next/image';
import translate from '@/libs/translate';
import config from '../../../../public/conf.json';

const Odds = async ({placement, lang}) => {
    async function fetchOdds() {
        try {
          const res = await fetch(`${config.domain}/api/odds?limit=${placement === 'main' && 6}`, {cache: 'no-cache'});
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
                <h2 className="name"><Link href={`${lang === 'en' ? 'en' : ''}/odds`}>{lang === 'en' ? 'Match odds' : 'Котировки на матчи'}</Link></h2>
            </div>}
            <div className="wrap">
                {odds && odds.map(async (e, i) => {
                    return <div key={'odds' + i} className="item">
                        <div className="items">
                            <div className="left">
                                <Image title={lang === 'en' ? await translate(e.hName, {to: 'en'}) : e.hName} alt={lang === 'en' ? await translate(e.hName, {to: 'en'}) : e.hName} src={e.hLogo} placeholder={'empty'} width={'25'} height={'25'} />
                                <span>{lang === 'en' ? await translate(e.hName, {to: 'en'}) : e.hName}</span>
                            </div>
                            <div className="center">
                                <span>{lang === 'en' ? await translate(e.lName, {to: 'en'}) : e.lName}</span>
                                <span className='date'>{lang === 'en' ? await translate(e.date, {to: 'en'}) : e.date}</span>
                            </div>
                            <div className="right">
                                <Image title={lang === 'en' ? await translate(e.aName, {to: 'en'}) : e.aName} alt={lang === 'en' ? await translate(e.aName, {to: 'en'}) : e.aName} src={e.aLogo} placeholder={'empty'} width={'25'} height={'25'} />
                                <span>{lang === 'en' ? await translate(e.aName, {to: 'en'}) : e.aName}</span>
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