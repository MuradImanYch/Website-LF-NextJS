import Link from 'next/link';
import '@/app/matches/style.css';
import Matches from '@/components/Matches/Matches';
import DateSwitcher from '@/components/Matches/DateSwitcher/DateSwitcher';
import config from '../../../../../public/conf.json';

export const generateMetadata = ({ params }) => {
    const today = new Date();

    return {
        title: `All Football Matches for ${params.date} – Schedule and Results`,
        description: `Check out ${params.date} full list of football matches with schedules, results, and key highlights. Follow matches on ${params.date}`,
        keywords: `football matches ${params.date}, today’s schedule ${params.date}, match results ${params.date}`,
        openGraph: {
          type: 'website',
          title: `All Football Matches for ${params.date} – Schedule and Results`,
          description: `Check out ${params.date} full list of football matches with schedules, results, and key highlights. Follow matches on ${params.date}`
        },
        twitter: {
          card: 'summary_large_image',
          title: `All Football Matches for ${params.date} – Schedule and Results`,
          description: `Check out ${params.date} full list of football matches with schedules, results, and key highlights. Follow matches on ${params.date}`
        },
        alternates: {
          canonical: params.date === today.toISOString().split('T')[0] && `${config.domain}/en/matches`
        }
    };
};

const page = async ({params}) => {
    return (
        <div className='matches all'>
            <div className="head">
                <ul>
                    <li><Link href={'/en/matches'}>All</Link></li>
                    <li><Link href={'/en/matches/live'}>LIVE</Link></li>
                    <li><Link href={'/en/matches/results'}>Completed</Link></li>
                    <li><Link href={'/en/matches/fixtures'}>Scheduled</Link></li>
                </ul>
                <DateSwitcher lang={'en'} pathnameDate={params.date} placement={'all'} />
            </div>
            <Matches lang={'en'} pathnameDate={params.date} placement={'all'} />
        </div>
    );
};

export default page;