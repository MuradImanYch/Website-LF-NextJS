import Link from 'next/link';
import './NewsFeed.css';
import Image from 'next/image';
import DateComponent from '@/components/News/Date/DateComponent';
// import translate from '@/libs/translate';
import config from '../../../../public/conf.json';

const NewsFeed = async ({news, lang}) => {
    const reversedData = await news;
    
    return (
        <section className='newsFeed'>
            <div className="head">
                <h2 className="name"><Link href={`${lang === 'en' ? 'en' : ''}/news`}>{lang === 'en' ? "News feed" : "Новостная лента"}</Link></h2>
            </div>
            {reversedData && reversedData.map(async e => {
                return <article key={e.id}>
                            <Image alt={(lang === 'en' ? e.titleEn : e.title)?.split(' ').slice(0, 5).toString().replaceAll(',', ' ')} title={(lang === 'en' ? e.titleEn : e.title)?.split(' ').slice(0, 5).toString().replaceAll(',', ' ')} width={'120'} height={'70'} src={e.img !== "undefined" && e.img !== 'fotos/bb/42/e243d59e6e78c095477f3bbeb2e3fe65662aa5e971d88797595920.jpg' ? e.img.includes('http') ? e.img : `${config.domain}/assets/news/${e.img}` : ''} placeholder={'empty'} />
                            <div className='date-tag-title'>
                                <div className='date-tag'>
                                    <span className="date"><DateComponent dateProps={e.date} /></span>
                                    <Link href={lang === 'en' ? `/en/search/${e.categoryEn}` : `/search/${e.category}`} className="tag">{`#${lang === 'en' ? e.categoryEn : e.category}`}</Link>
                                </div>
                                <h4><Link href={lang === 'en' ? `/en/news/read/${e.urlEn}` : `/news/read/${e.url}`}>{lang === 'en' ? e.titleEn : e.title}</Link></h4>
                            </div>
                        </article>
            })}
        </section>
    );
};

export default NewsFeed;