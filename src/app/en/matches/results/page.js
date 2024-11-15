import Link from 'next/link';
import '@/app/matches/style.css';
import Matches from '@/components/Matches/Matches';
import DateSwitcher from '@/components/Matches/DateSwitcher/DateSwitcher';

export const metadata = {
    title: 'Completed Football Matches – Final Scores and Reviews',
    description: 'Find results of completed football matches with detailed reviews. Discover how key games ended.',
    keywords: 'match results, completed matches, football reviews',
    openGraph: {
      type: 'website',
      title: 'Completed Football Matches – Final Scores and Reviews',
      description: 'Find results of completed football matches with detailed reviews. Discover how key games ended.'
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Completed Football Matches – Final Scores and Reviews',
      description: 'Find results of completed football matches with detailed reviews. Discover how key games ended.'
    }
};

const page = () => {
    return (
        <div className='matches results'>
            <div className="head">
                <ul>
                    <li><Link href={'/en/matches'}>All</Link></li>
                    <li><Link href={'/en/matches/live'}>LIVE</Link></li>
                    <li><Link href={'/en/matches/results'}>Completed</Link></li>
                    <li><Link href={'/en/matches/fixtures'}>Scheduled</Link></li>
                </ul>
                <DateSwitcher lang={'en'} placement={'ended'} />
            </div>
            <Matches lang={'en'} placement={'ended'} />
        </div>
    );
};

export default page;