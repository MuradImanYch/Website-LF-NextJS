import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import config from '@../../../public/conf.json';
import cyrillicToTranslit from 'cyrillic-to-translit-js';
import DateComponent from '@/components/News/Date/DateComponent';

const SliderContent = async ({tournamentNews, id}) => {
    const league = config.tournaments.flatMap(tournament => // get tournament 
        tournament.leagues.filter(league => league.id === id && league.type !== 'National')
    )[0];
    
    const reversedData = await tournamentNews;
    const selectedData = await reversedData && reversedData.filter(e => { // get tournament categories
        return league.category.includes(e.category);
    });
    
    return (
        <>
            {selectedData && selectedData.slice(0, 5).map(e => {
                return <article className="swiper-slide" key={e.id}>
                    <Link href={`/news/read/${e.id + '-' + cyrillicToTranslit().transform(e.title).replace(/[^a-zA-Z0-9\s]/g, '').replace(/\s+/g, '-').toLowerCase().replace(/-+$/, '')}`}><Image placeholder={'empty'} title={e.title.split(' ').slice(0, 5).toString().replaceAll(',', ' ')} alt={e.title.split(' ').slice(0, 5).toString().replaceAll(',', ' ')} width={800} height={800} src={e.img} /></Link>
                    <h3><Link className='preview-title' href={`/news/read/${e.id + '-' + cyrillicToTranslit().transform(e.title).replace(/[^a-zA-Z0-9\s]/g, '').replace(/\s+/g, '-').toLowerCase().replace(/-+$/, '')}`}>{e.title}</Link></h3>
                    <Link href={'/tags/search/' + e.category} className="tag">#{e.category}</Link>
                    <span className="date"><DateComponent dateProps={e.date} /></span>
                </article>
            })}
        </>
    );
};

export default SliderContent;