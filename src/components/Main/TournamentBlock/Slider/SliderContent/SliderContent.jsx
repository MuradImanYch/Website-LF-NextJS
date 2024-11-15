import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import config from '@../../../public/conf.json';
import DateComponent from '@/components/News/Date/DateComponent';
// import translate from '@/libs/translate';

const SliderContent = async ({tournamentNews, id, lang}) => {
    const league = config.tournaments.flatMap(tournament => // get tournament 
        tournament.leagues.filter(league => league.id === id && league.type !== 'National')
    )[0];
    
    const reversedData = await tournamentNews;
    const selectedData = await reversedData && reversedData.filter(e => { // get tournament categories
        return league.category?.includes(e.category);
    });
    
    return (
        <>
            {selectedData && selectedData.slice(0, 5).map(async e => {
                return <article className="swiper-slide" key={e.id}>
                    <Link href={lang === 'en' ? `/en/news/read/${e.urlEn}` : `/news/read/${e.url}`}><Image placeholder={'empty'} title={(lang === 'en' ? e.titleEn : e.title)?.split(' ').slice(0, 5).toString().replaceAll(',', ' ')} alt={(lang === 'en' ? e.titleEn : e.title)?.split(' ').slice(0, 5).toString().replaceAll(',', ' ')} width={800} height={800} src={e.img !== "undefined" && e.img !== 'fotos/bb/42/e243d59e6e78c095477f3bbeb2e3fe65662aa5e971d88797595920.jpg' ? e.img.includes('http') ? e.img : `${config.domain}/assets/news/${e.img}` : ''} /></Link>
                    <h3><Link className='preview-title' href={lang === 'en' ? `/en/news/read/${e.urlEn}` : `/news/read/${e.url}`}>{lang === 'en' ? e.titleEn : e.title}</Link></h3>
                    <Link href={lang === 'en' ? `/en/search/${e.categoryEn}` : `/search/${e.category}`} className="tag">#{lang === 'en' ? e.categoryEn : e.category}</Link>
                    <span className="date"><DateComponent dateProps={e.date} /></span>
                </article>
            })}
        </>
    );
};

export default SliderContent;