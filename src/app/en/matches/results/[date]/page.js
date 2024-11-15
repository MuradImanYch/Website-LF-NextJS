import Link from 'next/link';
import '@/app/matches/style.css';
import Matches from '@/components/Matches/Matches';
import DateSwitcher from '@/components/Matches/DateSwitcher/DateSwitcher';
import config from '../../../../../../public/conf.json';

export const generateMetadata = ({ params }) => {
    const today = new Date();

    return {
        title: `Completed Football Matches for ${params.date} – Final Scores and Reviews`,
        description: `Find results of completed football matches for ${params.date} with detailed reviews. Discover how key games ended`,
        keywords: `match results ${params.date}, completed matches ${params.date}, football reviews ${params.date}`,
        openGraph: {
          type: 'website',
          title: `Completed Football Matches for ${params.date} – Final Scores and Reviews`,
          description: `Find results of completed football matches for ${params.date} with detailed reviews. Discover how key games ended`
        },
        twitter: {
          card: 'summary_large_image',
          title: `Completed Football Matches for ${params.date} – Final Scores and Reviews`,
          description: `Find results of completed football matches for ${params.date} with detailed reviews. Discover how key games ended`
        },
        alternates: {
          canonical: params.date === today.toISOString().split('T')[0] && `${config.domain}/en/matches/results`
        }
    };
};

const page = async ({params}) => {
    return (
        <div className='matches results'>
            <div className="head">
                <ul>
                    <li><Link href={'/en/matches'}>All</Link></li>
                    <li><Link href={'/en/matches/live'}>LIVE</Link></li>
                    <li><Link href={'/en/matches/results'}>Completed</Link></li>
                    <li><Link href={'/en/matches/fixtures'}>Scheduled</Link></li>
                </ul>
                <DateSwitcher lang={'en'} pathnameDate={params.date} placement={'ended'} />
            </div>
            <Matches lang={'en'} pathnameDate={params.date} placement={'ended'} />
        </div>
    );
};

export default page;