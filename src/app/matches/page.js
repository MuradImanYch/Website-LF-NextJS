import Link from 'next/link';
import './style.css';
import Matches from '@/components/Matches/Matches';
import DateSwitcher from '@/components/Matches/DateSwitcher/DateSwitcher';

export const metadata = {
    title: 'Все футбольные матчи на сегодня – Расписание и результаты',
    description: 'Полный список футбольных матчей на сегодня с расписанием, результатами и ключевыми моментами. Следите за матчами в реальном времени.',
    keywords: 'матчи на сегодня, футбольное расписание, результаты матчей',
    openGraph: {
      type: 'website',
      title: 'Все футбольные матчи на сегодня – Расписание и результаты',
      description: 'Полный список футбольных матчей на сегодня с расписанием, результатами и ключевыми моментами. Следите за матчами в реальном времени.'
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Все футбольные матчи на сегодня – Расписание и результаты',
      description: 'Полный список футбольных матчей на сегодня с расписанием, результатами и ключевыми моментами. Следите за матчами в реальном времени.'
    }
};

const page = async () => {
    return (
        <div className='matches all'>
            <div className="head">
                <ul>
                    <li><Link href={'/matches'}>Все</Link></li>
                    <li><Link href={'/matches/live'}>LIVE</Link></li>
                    <li><Link href={'/matches/results'}>Завершённые</Link></li>
                    <li><Link href={'/matches/fixtures'}>Запланированные</Link></li>
                </ul>
                <DateSwitcher placement={'all'} />
            </div>
            <Matches placement={'all'} />
        </div>
    );
};

export default page;