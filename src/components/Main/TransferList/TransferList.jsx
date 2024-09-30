import React from 'react';
import './TransferList.css';
import Link from 'next/link';
import Image from 'next/image';


const TransferList = async ({placement}) => {
    async function fetchTransfers() {
        try {
          const res = await fetch(`http://78.46.254.73:3000/api/transfers?limit=${placement === 'main' && 8}`, {cache: 'no-cache'});
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
                <h2 className='name'><Link href={'/transfer-list'}>Список трансферов</Link></h2>
            </div>}
            {placement === 'page' && <div className="head">
                <span className='imgName'>Игрок</span>
                <span className='from-to'>Откуда → Куда</span>
                <span className='date'>Дата</span>
                <span className='price'>Цена</span>
            </div>}
            <div className="wrap">
                {transferList && transferList.map((e, i) => {
                    return <div className='item' key={e.name + i}>
                        <div className="imgName">
                            <Image alt={'игрок ' + e.name} title={e.name} width={'40'} height={'40'} placeholder={'empty'} src={e.img} />
                            {placement === 'page' && <Image alt={'флаг ' + e.name} title={'флаг ' + e.name} width={'20'} height={'20'} placeholder={'empty'} src={e.flag} />}
                            <span className='name'>{e.name}</span>
                        </div>
                        <div className="from-to">
                            <Image alt={"ушёл из " + e.clubOutName} title={e.clubOutName} width={'20'} height={'20'} placeholder={'empty'} src={e.clubOut} />
                            →
                            <Image alt={"перешел в " + e.clubInName} title={e.clubInName} width={'20'} height={'20'} placeholder={'empty'} src={e.clubIn} /> 
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