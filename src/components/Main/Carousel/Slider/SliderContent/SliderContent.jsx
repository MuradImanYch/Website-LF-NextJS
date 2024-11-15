import Image from 'next/image';
import Link from 'next/link';
// import cyrillicToTranslit from 'cyrillic-to-translit-js';
import DateComponent from '@/components/News/Date/DateComponent';
// import translate from '@/libs/translate';
import config from '../../../../../../public/conf.json';

const SliderContent = async ({param, lang}) => {    
    async function fetchNews() {
        try {
            const category = param.category ? encodeURIComponent(param.category) : '';
            const tags = param.tags ? encodeURIComponent(param.tags) : '';
            const url = `${config.domain}/api/news?limit=${param.limit}&category=${category && category || tags && tags}&tags=${tags && tags || category && category}`;
            const res = await fetch(url, { cache: 'no-cache' });
            return await res.json();
        } catch (err) {
            console.error(err);
            return [];
        }
    }

    const news = await fetchNews();

    return (
        <>
            {news && news.map(async e => {
                return <article key={e.id} className="swiper-slide">
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