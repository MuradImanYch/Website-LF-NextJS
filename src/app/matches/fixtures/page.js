import Link from 'next/link';
import '../style.css';
import Matches from '@/components/Matches/Matches';
import DateSwitcher from '@/components/Matches/DateSwitcher/DateSwitcher';

export const metadata = {
    title: 'Запланированные футбольные матчи – Грядущее расписание',
    description: 'Посмотрите расписание запланированных футбольных матчей и подготовьтесь к грядущим событиям. Все даты и время матчей.',
    keywords: 'запланированные матчи, расписание футбола, предстоящие игры',
    openGraph: {
      type: 'website',
      title: 'Запланированные футбольные матчи – Грядущее расписание',
      description: 'Посмотрите расписание запланированных футбольных матчей и подготовьтесь к грядущим событиям. Все даты и время матчей.'
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Запланированные футбольные матчи – Грядущее расписание',
      description: 'Посмотрите расписание запланированных футбольных матчей и подготовьтесь к грядущим событиям. Все даты и время матчей.'
    }
};


const page = () => {
    return (
        <div className='matches fixtures'>
            <div className="head">
                <ul>
                    <li><Link href={'/matches'}>Все</Link></li>
                    <li><Link href={'/matches/live'}>LIVE</Link></li>
                    <li><Link href={'/matches/results'}>Завершённые</Link></li>
                    <li><Link href={'/matches/fixtures'}>Запланированные</Link></li>
                </ul>
                <DateSwitcher placement={'scheduled'} />
            </div>
            <Matches placement={'scheduled'} />
        </div>
    );
};

export default page;