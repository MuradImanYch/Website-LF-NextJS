import Link from 'next/link';
import '@/app/matches/style.css';
import Matches from '@/components/Matches/Matches';
import DateSwitcher from '@/components/Matches/DateSwitcher/DateSwitcher';

export const metadata = {
    title: 'All Football Matches for Today – Schedule and Results',
    description: 'Check out today’s full list of football matches with schedules, results, and key highlights. Follow matches live.',
    keywords: 'football matches, today’s schedule, match results',
    openGraph: {
      type: 'website',
      title: 'All Football Matches for Today – Schedule and Results',
      description: 'Check out today’s full list of football matches with schedules, results, and key highlights. Follow matches live.'
    },
    twitter: {
      card: 'summary_large_image',
      title: 'All Football Matches for Today – Schedule and Results',
      description: 'Check out today’s full list of football matches with schedules, results, and key highlights. Follow matches live.'
    }
};

const page = async () => {
    return (
        <div className='matches all'>
            <div className="head">
                <ul>
                    <li><Link href={'/en/matches'}>All</Link></li>
                    <li><Link href={'/en/matches/live'}>LIVE</Link></li>
                    <li><Link href={'/en/matches/results'}>Completed</Link></li>
                    <li><Link href={'/en/matches/fixtures'}>Scheduled</Link></li>
                </ul>
                <DateSwitcher lang={'en'} placement={'all'} />
            </div>
            <Matches lang={'en'} placement={'all'} />
        </div>
    );
};

export default page;