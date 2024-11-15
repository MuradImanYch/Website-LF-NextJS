import Link from 'next/link';
import '../../style.css';
import Matches from '@/components/Matches/Matches';
import DateSwitcher from '@/components/Matches/DateSwitcher/DateSwitcher';
import config from '../../../../../public/conf.json';

export const generateMetadata = ({ params }) => {
    const today = new Date();

    return {
        title: `Запланированные футбольные матчи на ${params.date} – Грядущее расписание`,
        description: `Посмотрите расписание запланированных футбольных матчей на ${params.date} и подготовьтесь к грядущим событиям.`,
        keywords: `запланированные матчи ${params.date}, расписание футбола ${params.date}, предстоящие игры ${params.date}`,
        openGraph: {
          type: 'website',
          title: `Запланированные футбольные матчи на ${params.date} – Грядущее расписание`,
          description: `Посмотрите расписание запланированных футбольных матчей на ${params.date} и подготовьтесь к грядущим событиям.`
        },
        twitter: {
          card: 'summary_large_image',
          title: `Запланированные футбольные матчи на ${params.date} – Грядущее расписание`,
          description: `Посмотрите расписание запланированных футбольных матчей на ${params.date} и подготовьтесь к грядущим событиям.`
        },
        alternates: {
          canonical: params.date === today.toISOString().split('T')[0] && `${config.domain}/matches/fixtures`
        }
    };
};

const page = async ({params}) => {
    return (
        <div className='matches fixtures'>
            <div className="head">
                <ul>
                    <li><Link href={'/matches'}>Все</Link></li>
                    <li><Link href={'/matches/live'}>LIVE</Link></li>
                    <li><Link href={'/matches/results'}>Завершённые</Link></li>
                    <li><Link href={'/matches/fixtures'}>Запланированные</Link></li>
                </ul>
                <DateSwitcher pathnameDate={params.date} placement={'scheduled'} />
            </div>
            <Matches pathnameDate={params.date} placement={'scheduled'} />
        </div>
    );
};

export default page;