import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import cyrillicToTranslit from 'cyrillic-to-translit-js';
import DateComponent from '@/components/News/Date/DateComponent';

const SliderContent = async ({param}) => {    
    async function fetchNews() {
        try {
            const category = param.category ? encodeURIComponent(param.category) : '';
            const tags = param.tags ? encodeURIComponent(param.tags) : '';
            const url = `http://78.46.254.73:3000/api/news?limit=${param.limit}&category=${category && category || tags && tags}&tags=${tags && tags || category && category}`;
            const res = await fetch(url, { cache: 'no-cache' });
            return await res.json();
        } catch (err) {
            console.error(err);
            return [];
        }
    }

    const video = await fetchNews();

    return (
        <>
            {video && video.map(e => {
                return <article key={e.id} className="swiper-slide">
                <Link href={`/news/read/${e.id + '-' + cyrillicToTranslit().transform(e.title).replace(/[^a-zA-Z0-9\s]/g, '').replace(/\s+/g, '-').toLowerCase().replace(/-+$/, '')}`}><Image placeholder={'empty'} title={e.title.split(' ').slice(0, 5).toString().replaceAll(',', ' ')} alt={e.title.split(' ').slice(0, 5).toString().replaceAll(',', ' ')} width={800} height={800} src={e.img !== "undefined" && e.img !== 'fotos/bb/42/e243d59e6e78c095477f3bbeb2e3fe65662aa5e971d88797595920.jpg' ? e.img.includes('/public/static/uploads/') ? 'https://legfootball.com' + e.img : e.img : ''} /></Link>
                <h3><Link className='preview-title' href={`/news/read/${e.id + '-' + cyrillicToTranslit().transform(e.title).replace(/[^a-zA-Z0-9\s]/g, '').replace(/\s+/g, '-').toLowerCase().replace(/-+$/, '')}`}>{e.title}</Link></h3>
                <Link href={'/tags/search/' + e.category} className="tag">#{e.category}</Link>
                <span className="date"><DateComponent dateProps={e.date} /></span>
            </article>
            })}
        </>
    );
};

export default SliderContent;