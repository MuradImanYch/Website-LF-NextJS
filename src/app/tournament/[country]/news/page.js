import Image from 'next/image';
import Link from 'next/link';
import config from '../../../../../public/conf.json';
import NewsPage from '@/components/News/NewsPage/NewsPage';
import './style.css';
import '../style.css';
import { notFound } from 'next/navigation';

export const generateMetadata = ({ params }) => {
    const country = config.tournaments.filter(e => {
        return e.name.en.toLowerCase().replaceAll(/\s+/g, '').replaceAll(/-/g, '') === params.country.replaceAll(/-/g, '');
    });

    if(country.length < 1) {
        notFound();
    }

    return {
        title: `Новости турнира ${country[0]?.name.ru} - свежие новости и события`,
        description: `Узнайте последние новости турнира ${country[0]?.name.ru}: анализ, интервью и события из мира футбола.`,
        keywords: `новости футбола ${country[0]?.name.ru}, события турнира ${country[0]?.name.ru}, аналитика матчей ${country[0]?.name.ru}`,
        openGraph: {
          type: 'website',
          title: `Новости турнира ${country[0]?.name.ru} - свежие новости и события`,
          description: `Узнайте последние новости турнира ${country[0]?.name.ru}: анализ, интервью и события из мира футбола.`
        },
        twitter: {
          card: 'summary_large_image',
          title: `Новости турнира ${country[0]?.name.ru} - свежие новости и события`,
          description: `Узнайте последние новости турнира ${country[0]?.name.ru}: анализ, интервью и события из мира футбола.`
        }
    };
};

const page = ({params}) => {
    const country = config.tournaments.filter(e => {
        return e.name.en.toLowerCase().replace(/\s+/g, '').replace(/-/g, '') === params.country.replace(/-/g, '');
    });

    let tags = [];

    country[0].leagues.map(e => {
        if(e.category) {
            tags.push(e.category);
        }
    });

    const pagPathName = '/' + country[0].name.en.replace(/\s+/g, '-').toLowerCase() + '/';

    return (
        <div className='country-news tournament-country'>
            <div className="head">
                <h2 className="left">
                    <div className="name">
                        <Image className='country-flag' src={country[0].flag} width={22} height={16} alt={'флаг ' + country[0].name.ru} title={country[0].name.ru} /> <Link href={`/tournament/${country[0].name.en.replace(/\s+/g, '-').toLowerCase()}`} className='country-name'>{country[0].name.ru}</Link><span className='league-name'> <span className='slash'>/</span> Новости</span>
                    </div>
                </h2>
            </div>
            
            <NewsPage pagPathName={pagPathName} param={{tags: tags && tags.join(',')}} placement={'tournament-news'} />
        </div>
    );
};

export default page;