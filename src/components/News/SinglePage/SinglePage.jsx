import Link from 'next/link';
import './SinglePage.css';
import parse from 'html-react-parser';
import Image from 'next/image';
import clock from '../../../../public/assets/ico/clock.webp';
import tag from '../../../../public/assets/ico/tag.webp';
import DateComponent from '../Date/DateComponent';
import NewsPage from '../NewsPage/NewsPage';

const SinglePage = async ({id}) => {
    async function fetchNews() {
        try {
          const res = await fetch(`http://78.46.254.73:3000/api/news?id=${id}`, {cache: 'no-cache'});
          return await res.json();
        } catch (err) {
          console.error(err);
          return [];
        }
    }
    
    const news = await fetchNews();
    const tags = news[0].tags && JSON.parse(news[0].tags.replace('футбол')).join(',');
    const category = news[0].category;

    return (
        <div className="single-page">
            <h1>{news && news[0].title}</h1>
            <div className="date-tag">
                <div><Image alt="date" title="Время" src={clock} placeholder={'empty'} width={'17'} height={'17'} /><span className="date"><DateComponent dateProps={news[0].date} /></span></div>
                <div><Image alt="tag" title="Тег" src={tag} placeholder={'empty'} width={'17'} height={'17'} /><Link href={'/tags/search/' + news[0].category} className="tag"> {`#${news[0].category}`}</Link></div>
            </div>
            <Image placeholder={'empty'} id='mainImg' width={'400'} height={'300'} src={news[0].img !== "undefined" && news[0].img !== 'fotos/bb/42/e243d59e6e78c095477f3bbeb2e3fe65662aa5e971d88797595920.jpg' ? news[0].img.includes('/public/static/uploads/') ? 'https://legfootball.com' + news[0].img : news[0].img : ''} alt={news[0].meta_description.split(' ').slice(0, 5).toString().replaceAll(',', ' ')} title={news[0].meta_description.split(' ').slice(0, 5).toString().replaceAll(',', ' ')} />
            <div className='textWrap'>
                <p><strong>{news && news[0].meta_description}</strong></p>
                {news && parse(news[0].content)}
            </div>
            <i className='author'>{news && news[0].author}</i>
            <div className="all-tags">
                <span><Image alt="tag" title="Тег" src={tag} placeholder={'empty'} width={'17'} height={'17'} /> Все теги: </span> 
                <Link href={'/tags/search/' + news[0].category} className="tag"> {`#${news[0].category}`}</Link>
                {news[0].tags && JSON.parse(news[0].tags)
                .filter(tag => tag !== news[0].category) // Фильтруем теги, убирая совпадающий с категорией
                .map(tag => {
                    return (
                    <Link key={`#${tag}`} href={'/tags/search/' + tag} className="tag">
                        {`#${tag}`}
                    </Link>
                    );
                })}
            </div>
            <NewsPage placement={'news-single-page'} generatedTags={tags + ',' + category}_ />
        </div>
    );
};

export default SinglePage;