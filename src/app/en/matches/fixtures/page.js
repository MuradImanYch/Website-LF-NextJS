import Link from 'next/link';
import '@/app/matches/style.css';
import Matches from '@/components/Matches/Matches';
import DateSwitcher from '@/components/Matches/DateSwitcher/DateSwitcher';

export const metadata = {
    title: 'Scheduled Football Matches – Upcoming Fixture List',
    description: 'View the schedule of upcoming football matches and plan ahead for upcoming events. All match dates and times.',
    keywords: 'scheduled matches, football fixtures, upcoming games',
    openGraph: {
      type: 'website',
      title: 'Scheduled Football Matches – Upcoming Fixture List',
      description: 'View the schedule of upcoming football matches and plan ahead for upcoming events. All match dates and times.'
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Scheduled Football Matches – Upcoming Fixture List',
      description: 'View the schedule of upcoming football matches and plan ahead for upcoming events. All match dates and times.'
    }
};

const page = () => {
    return (
        <div className='matches fixtures'>
            <div className="head">
                <ul>
                    <li><Link href={'/en/matches'}>All</Link></li>
                    <li><Link href={'/en/matches/live'}>LIVE</Link></li>
                    <li><Link href={'/en/matches/results'}>Completed</Link></li>
                    <li><Link href={'/en/matches/fixtures'}>Scheduled</Link></li>
                </ul>
                <DateSwitcher lang={'en'} placement={'scheduled'} />
            </div>
            <Matches lang={'en'} placement={'scheduled'} />
        </div>
    );
};

export default page;