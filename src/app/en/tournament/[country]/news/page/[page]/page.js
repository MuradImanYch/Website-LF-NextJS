import NewsPage from "@/components/News/NewsPage/NewsPage";
import config from '../../../../../../../../public/conf.json';
import Image from "next/image";
import Link from "next/link";
import '@/app/tournament/[country]/news/page/[page]/style.css';
import '@/app/tournament/[country]/style.css';
import { notFound } from 'next/navigation';

export const generateMetadata = ({ params }) => {
    const country = config.tournaments.filter(e => {
        return e.name.en.toLowerCase().replaceAll(/\s+/g, '').replaceAll(/-/g, '') === params.country.replaceAll(/-/g, '');
    });

    if(country.length < 1) {
        notFound();
    }

    return {
        title: `${country[0]?.name.en} Tournament News - Latest Updates and Events - Page ${params.page}`,
        description: `Discover the latest news from the ${country[0]?.name.en} tournament: analysis, interviews, and football events. Page ${params.page}`,
        keywords: `football news ${country[0]?.name.en}, ${country[0]?.name.en} tournament events, match analysis ${country[0]?.name.en}, Page ${params.page}`,
        openGraph: {
          type: 'website',
          title: `${country[0]?.name.en} Tournament News - Latest Updates and Events - Page ${params.page}`,
          description: `Discover the latest news from the ${country[0]?.name.en} tournament: analysis, interviews, and football events. Page ${params.page}`
        },
        twitter: {
          card: 'summary_large_image',
          title: `${country[0]?.name.en} Tournament News - Latest Updates and Events - Page ${params.page}`,
          description: `Discover the latest news from the ${country[0]?.name.en} tournament: analysis, interviews, and football events. Page ${params.page}`
        },
        alternates: {
          canonical: params.page === '1' && `${config.domain}/en/tournament/${country[0].name.en.replace(/\s+/g, '-').toLowerCase()}/news`
        }
    };
};

const page = async ({params}) => {
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
                        <Image className='country-flag' src={country[0].flag} width={22} height={16} alt={'flag ' + country[0].name.en} title={country[0].name.en} /> <Link href={`/en/tournament/${country[0].name.en.replace(/\s+/g, '-').toLowerCase()}`} className='country-name'>{country[0].name.en}</Link><span className='league-name'> <span className='slash'>/</span> News</span>
                    </div>
                </h2>
            </div>
            
            <NewsPage lang={'en'} pagPathName={pagPathName} param={{tags: tags && tags.join(',')}} placement={'tournament-news'} params={params} />
        </div>
    )
}

export default page;