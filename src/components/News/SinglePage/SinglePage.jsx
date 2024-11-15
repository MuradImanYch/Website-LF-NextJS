import Link from 'next/link';
import './SinglePage.css';
import parse from 'html-react-parser';
import Image from 'next/image';
import clock from '../../../../public/assets/ico/clock.webp';
import tag from '../../../../public/assets/ico/tag.webp';
import DateComponent from '../Date/DateComponent';
import NewsPage from '../NewsPage/NewsPage';
import { notFound } from 'next/navigation';
// import translate from '@/libs/translate';
import config from '../../../../public/conf.json';
import Client from './Client.jsx';

const SinglePage = async ({id, url, lang}) => {
    async function fetchNews() {
        try {
          const res = await fetch(`${config.domain}/api/news?id=${id}`, {cache: 'no-cache'});
          return await res.json();
        } catch (err) {
          console.error(err);
          return [];
        }
    }
    
    const news = await fetchNews();

   if(lang === 'en') {
    if(news.length < 1 || url !== news[0].urlEn) {
        notFound();
    }
   }
   else {
    if(news.length < 1 || url !== news[0].url) {
        notFound();
    }
   }

    const tags = lang === 'en' ? news[0].tagsEn ? JSON.parse(news[0].tagsEn.replace('football').replace('sport')).join(',') : [] : news[0].tags ? JSON.parse(news[0].tags.replace('футбол').replace('спорт')).join(',') : [];
    const category = lang === 'en' ? news[0].categoryEn : news[0].category;

    return (
        <div className="single-page">
            <h1>{lang === 'en' ? news[0].titleEn : news[0].title}</h1>
            <div className="date-tag">
                <div><Image alt={lang === 'en' ? 'Date' : 'Дата'} title={lang === 'en' ? 'Date' : 'Дата'} src={clock} placeholder={'empty'} width={'17'} height={'17'} /><span className="date"><DateComponent dateProps={news[0].date} /></span></div>
                <div><Image alt={lang === 'en' ? 'Tag' : 'Тег'} title={lang === 'en' ? 'Tag' : 'Тег'} src={tag} placeholder={'empty'} width={'17'} height={'17'} /><Link href={lang === 'en' ? `/en/search/${news[0].categoryEn}` : `/search/${news[0].category}`} className="tag"> {`#${lang === 'en' ? news[0].categoryEn : news[0].category}`}</Link></div>
            </div>
            <Link href={news[0].img !== "undefined" && news[0].img !== 'fotos/bb/42/e243d59e6e78c095477f3bbeb2e3fe65662aa5e971d88797595920.jpg' ? news[0].img.includes('http') ? news[0].img : `${config.domain}/assets/news/${news[0].img}` : ''} target='_blank'><Image placeholder={'empty'} id='mainImg' width={'400'} height={'300'} src={news[0].img !== "undefined" && news[0].img !== 'fotos/bb/42/e243d59e6e78c095477f3bbeb2e3fe65662aa5e971d88797595920.jpg' ? news[0].img.includes('http') ? news[0].img : `${config.domain}/assets/news/${news[0].img}` : ''} alt={(lang === 'en' ? news[0].meta_descriptionEn : news[0].meta_description)?.split(' ').slice(0, 5).toString().replaceAll(',', ' ')} title={(lang === 'en' ? news[0].meta_descriptionEn : news[0].meta_description)?.split(' ').slice(0, 5).toString().replaceAll(',', ' ')} /></Link>
            <div className='textWrap'>
                <p><strong>{lang === 'en' ? news[0].meta_descriptionEn : news[0].meta_description}</strong></p>
                {lang === 'en' ? (news[0].contentEn ? parse(news[0].contentEn) : '') : (news[0].content ? parse(news[0].content) : '')}
            </div>
            <i className='author'>{news && news[0].author}</i>

            <div className="all-tags">
                <span><Image alt={lang === 'en' ? 'Tag' : 'Тег'} title={lang === 'en' ? 'Tag' : 'Тег'} src={tag} placeholder={'empty'} width={'17'} height={'17'} /> {lang === 'en' ? "All tags" : 'Все теги'}: </span> 
                <Link href={lang === 'en' ? `/en/search/${news[0].categoryEn}` : `/search/${news[0].category}`} className="tag"> {`#${lang === 'en' ? news[0].categoryEn : news[0].category}`}</Link>
                {lang === 'en' ? news[0].tagsEn && JSON.parse(news[0].tagsEn).filter(tag => tag !== news[0].categoryEn && tag !== "football" && tag !== "sport").map(tag => {
                    return <Link key={`#${tag}`} href={`/en/search/${tag}`} className="tag">
                        {`#${tag}`}
                    </Link>
                }) : news[0].tags && JSON.parse(news[0].tags).filter(tag => tag !== news[0].category && tag !== "футбол" && tag !== "спорт").map(tag => {
                    return <Link key={`#${tag}`} href={`/search/${tag}`} className="tag">
                        {`#${tag}`}
                    </Link>
                })}
            </div>
            <NewsPage lang={lang} placement={'news-single-page'} generatedTags={tags + ',' + category} excludeId={news[0].id} />

            <Client url={{ru: news[0].url, en: news[0].urlEn}} />
        </div>
    );
};

export default SinglePage;