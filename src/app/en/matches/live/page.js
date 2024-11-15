import Link from 'next/link';
import '@/app/matches/style.css';
import Matches from '@/components/Matches/Matches';

export const metadata = {
    title: 'LIVE Football Matches – Ongoing Broadcasts and Results',
    description: 'Watch live football matches, get real-time results and updates. Stay at the heart of football action as it unfolds.',
    keywords: 'live football, ongoing matches, live results',
    openGraph: {
      type: 'website',
      title: 'LIVE Football Matches – Ongoing Broadcasts and Results',
      description: 'Watch live football matches, get real-time results and updates. Stay at the heart of football action as it unfolds.'
    },
    twitter: {
      card: 'summary_large_image',
      title: 'LIVE Football Matches – Ongoing Broadcasts and Results',
      description: 'Watch live football matches, get real-time results and updates. Stay at the heart of football action as it unfolds.'
    }
};

const page = () => {
    return (
        <div className='matches live'>
            <div className="head">
                <ul>
                    <li><Link href={'/en/matches'}>All</Link></li>
                    <li><Link href={'/en/matches/live'}>LIVE</Link></li>
                    <li><Link href={'/en/matches/results'}>Completed</Link></li>
                    <li><Link href={'/en/matches/fixtures'}>Scheduled</Link></li>
                </ul>
            </div>
            <Matches lang={'en'} placement={'live'} />
        </div>
    );
};

export default page;