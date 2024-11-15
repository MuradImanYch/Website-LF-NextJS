import React from 'react';
import './TransferList.css';
import Link from 'next/link';
import Image from 'next/image';
import translate from '@/libs/translate';
import config from '../../../../public/conf.json';


const TransferList = async ({placement, lang}) => {
    async function fetchTransfers() {
        try {
          const res = await fetch(`${config.domain}/api/transfers?limit=${placement === 'main' && 8}`, {cache: 'no-cache'});
          const data = await res.json();
          
          return data;
        } 
        catch (err) {
          console.error(err);
        }
    }

    const transferList = await fetchTransfers();

    return (
        <section className='transfer-list'>
            {placement === 'main' && <div className="head">
                <h2 className='name'><Link href={`${lang === 'en' ? 'en' : ''}/transfer-list`}>{lang === 'en' ? 'Transfer list' : 'Список трансферов'}</Link></h2>
            </div>}
            {placement === 'page' && <div className="head">
                <span className='imgName'>{lang === 'en' ? 'Player' : 'Игрок'}</span>
                <span className='from-to'>{lang === 'en' ? 'From → To' : 'Откуда → Куда'}</span>
                <span className='date'>{lang === 'en' ? 'Date' : 'Дата'}</span>
                <span className='price'>{lang === 'en' ? 'Price' : 'Цена'}</span>
            </div>}
            <div className="wrap">
                {transferList && transferList.map(async (e, i) => {
                    return <div className='item' key={e.name + i}>
                        <div className="imgName">
                            <Image alt={'игрок ' + lang === 'en' ? await translate(e.name, {to: 'en'}) : e.name} title={lang === 'en' ? await translate(e.name, {to: 'en'}) : e.name} width={'40'} height={'40'} placeholder={'empty'} src={e.img} />
                            {placement === 'page' && <Image alt={lang === 'en' ? `${await translate(e.name, {to: 'en'})} flag` : 'флаг ' + e.name} title={lang === 'en' ? `${await translate(e.name, {to: 'en'})} flag` : 'флаг ' + e.name} width={'20'} height={'20'} placeholder={'empty'} src={e.flag} />}
                            <span className='name'>{lang === 'en' ? await translate(e.name, {to: 'en'}) : e.name}</span>
                        </div>
                        <div className="from-to">
                            <Image alt={lang === 'en' ? `left from ${'«' + await translate(e.clubOutName, {to: 'en'}) + '»'}` : 'ушёл из «' + e.clubOutName + '»'} title={lang === 'en' ? `left from ${'«' + await translate(e.clubOutName, {to: 'en'}) + '»'}` : 'ушёл из «' + e.clubOutName + '»'} width={'20'} height={'20'} placeholder={'empty'} src={e.clubOut} />
                            →
                            <Image alt={lang === 'en' ? 'transfered to ' + `«${await translate(e.clubInName, {to: 'en'})}»` : 'перешёл в ' + '«' + e.clubInName + '»'} title={lang === 'en' ? 'transfered to ' + `«${await translate(e.clubInName, {to: 'en'})}»` : 'перешёл в ' + '«' + e.clubInName + '»'} width={'20'} height={'20'} placeholder={'empty'} src={e.clubIn} /> 
                        </div>
                        <span className='date'>{e.date}</span>
                        <span className='price'>{e.price}</span>
                    </div>
                })}
            </div>
        </section>
    );
};

export default TransferList;