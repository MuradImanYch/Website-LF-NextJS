import './Collage.css';
import Image from 'next/image';
import Link from 'next/link';
import DateComponent from '@/components/News/Date/DateComponent';
// import translate from '@/libs/translate';
import config from '../../../../../public/conf.json';

const Collage = async ({news, lang}) => {
    const reversedData = await news;

    return (
        <section className="collage">
            {reversedData && reversedData.slice(0, 5).map(async (item, index) => (
    <article key={index} id={`item-${index}`} className="collage-item">
        <Link
            href={lang === 'en' ? `/en/news/read/${item.urlEn}` : `/news/read/${item.url}`}
        >
            <Image
    placeholder={'empty'}
    title={
        (lang === 'en' ? item.titleEn : item.title)
            ?.split(' ')
            .slice(0, 5)
            .join(' ')
    }
    alt={
        (lang === 'en' ? item.titleEn : item.title)
            ?.split(' ')
            .slice(0, 5)
            .join(' ')
    }
    width={800}
    height={800}
    src={item.img !== "undefined" && item.img !== 'fotos/bb/42/e243d59e6e78c095477f3bbeb2e3fe65662aa5e971d88797595920.jpg' ? item.img.includes('http') ? item.img : `${config.domain}/assets/news/${item.img}` : ''}
/>
        </Link>
        <h2>
            <Link
                className='preview-title'
                href={lang === 'en' ? `/en/news/read/${item.urlEn}` : `/news/read/${item.url}`}
            >
                {lang === 'en' ? item.titleEn : item.title}
            </Link>
        </h2>
        <Link href={lang === 'en' ? `/en/search/${item.categoryEn}` : `/search/${item.category}`} className="tag">
            #{lang === 'en' ? item.categoryEn : item.category}
        </Link>
        <span className="date">
            <DateComponent dateProps={item.date} />
        </span>
    </article>
))}
        </section>
    );
};

export default Collage;