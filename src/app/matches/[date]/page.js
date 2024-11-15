import Link from 'next/link';
import '../style.css';
import Matches from '@/components/Matches/Matches';
import DateSwitcher from '@/components/Matches/DateSwitcher/DateSwitcher';
import config from '../../../../public/conf.json';

export const generateMetadata = ({ params }) => {
    const today = new Date();

    return {
        title: `Все футбольные матчи на ${params.date} – Расписание и результаты`,
        description: `Полный список футбольных матчей на ${params.date} с расписанием, результатами и ключевыми моментами. Следите за матчами в период ${params.date}`,
        keywords: `матчи на ${params.date}, футбольное расписание ${params.date}, результаты матчей ${params.date}`,
        openGraph: {
          type: 'website',
          title: `Все футбольные матчи на ${params.date} – Расписание и результаты`,
          description: `Полный список футбольных матчей на ${params.date} с расписанием, результатами и ключевыми моментами. Следите за матчами в период ${params.date}`
        },
        twitter: {
          card: 'summary_large_image',
          title: `Все футбольные матчи на ${params.date} – Расписание и результаты`,
          description: `Полный список футбольных матчей на ${params.date} с расписанием, результатами и ключевыми моментами. Следите за матчами в период ${params.date}`
        },
        alternates: {
          canonical: params.date === today.toISOString().split('T')[0] && `${config.domain}/matches`
        }
    };
};

const page = async ({params}) => {
    return (
        <div className='matches all'>
            <div className="head">
                <ul>
                    <li><Link href={'/matches'}>Все</Link></li>
                    <li><Link href={'/matches/live'}>LIVE</Link></li>
                    <li><Link href={'/matches/results'}>Завершённые</Link></li>
                    <li><Link href={'/matches/fixtures'}>Запланированные</Link></li>
                </ul>
                <DateSwitcher pathnameDate={params.date} placement={'all'} />
            </div>
            <Matches pathnameDate={params.date} placement={'all'} />
        </div>
    );
};

export default page;