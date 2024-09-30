import Link from 'next/link';
import './NewsFeed.css';
import Image from 'next/image';
import cyrillicToTranslit from 'cyrillic-to-translit-js';
import DateComponent from '@/components/News/Date/DateComponent';

const NewsFeed = async ({news}) => {
    const reversedData = await news;
    
    return (
        <section className='newsFeed'>
            <div className="head">
                <h2 className="name"><Link href={`/news`}>Новостная лента</Link></h2>
            </div>
            {reversedData && reversedData.map(e => {
                return <article key={e.id}>
                            <Image alt={e.title.split(' ').slice(0, 5).toString().replaceAll(',', ' ')} title={e.title.split(' ').slice(0, 5).toString().replaceAll(',', ' ')} width={'120'} height={'70'} src={e.img} placeholder={'empty'} />
                            <div className='date-tag-title'>
                                <div className='date-tag'>
                                    <span className="date"><DateComponent dateProps={e.date} /></span>
                                    <Link href={'/tags/search/' + e.category} className="tag">{`#${e.category}`}</Link>
                                </div>
                                <h4><Link href={`/news/read/${e.id + '-' + cyrillicToTranslit().transform(e.title).replace(/[^a-zA-Z0-9\s]/g, '').replace(/\s+/g, '-').toLowerCase().replace(/-+$/, '')}`}>{e.title}</Link></h4>
                            </div>
                        </article>
            })}
        </section>
    );
};

export default NewsFeed;