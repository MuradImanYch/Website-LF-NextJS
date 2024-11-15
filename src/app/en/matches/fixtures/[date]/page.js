import Link from 'next/link';
import '@/app/matches/style.css';
import Matches from '@/components/Matches/Matches';
import DateSwitcher from '@/components/Matches/DateSwitcher/DateSwitcher';
import config from '../../../../../../public/conf.json';

export const generateMetadata = ({ params }) => {
    const today = new Date();

    return {
        title: `Scheduled Football Matches for ${params.date} – Upcoming Fixture List`,
        description: `View the schedule for ${params.date}, watch football matches and plan ahead for upcoming events. All match for ${params.date}.`,
        keywords: `scheduled matches ${params.date}, football fixtures ${params.date}, upcoming games ${params.date}`,
        openGraph: {
          type: 'website',
          title: `Scheduled Football Matches for ${params.date} – Upcoming Fixture List`,
          description: `View the schedule for ${params.date}, watch football matches and plan ahead for upcoming events. All match for ${params.date}.`
        },
        twitter: {
          card: 'summary_large_image',
          title: `Scheduled Football Matches for ${params.date} – Upcoming Fixture List`,
          description: `View the schedule for ${params.date}, watch football matches and plan ahead for upcoming events. All match for ${params.date}.`
        },
        alternates: {
          canonical: params.date === today.toISOString().split('T')[0] && `${config.domain}/en/matches/fixtures`
        }
    };
};

const page = async ({params}) => {
    return (
        <div className='matches fixtures'>
            <div className="head">
                <ul>
                    <li><Link href={'/en/matches'}>All</Link></li>
                    <li><Link href={'/en/matches/live'}>LIVE</Link></li>
                    <li><Link href={'/en/matches/results'}>Completed</Link></li>
                    <li><Link href={'/en/matches/fixtures'}>Scheduled</Link></li>
                </ul>
                <DateSwitcher lang={'en'} pathnameDate={params.date} placement={'scheduled'} />
            </div>
            <Matches lang={'en'} pathnameDate={params.date} placement={'scheduled'} />
        </div>
    );
};

export default page;