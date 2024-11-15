import Link from 'next/link';
import '../style.css';
import Matches from '@/components/Matches/Matches';
import DateSwitcher from '@/components/Matches/DateSwitcher/DateSwitcher';

export const metadata = {
    title: 'Завершенные футбольные матчи – Итоговые результаты и обзоры',
    description: 'Получите результаты завершенных футбольных матчей и подробные обзоры. Узнайте, как завершились ключевые игры.',
    keywords: 'результаты матчей, завершенные матчи, футбольные обзоры',
    openGraph: {
      type: 'website',
      title: 'Завершенные футбольные матчи – Итоговые результаты и обзоры',
      description: 'Получите результаты завершенных футбольных матчей и подробные обзоры. Узнайте, как завершились ключевые игры.'
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Завершенные футбольные матчи – Итоговые результаты и обзоры',
      description: 'Получите результаты завершенных футбольных матчей и подробные обзоры. Узнайте, как завершились ключевые игры.'
    }
};

const page = () => {
    return (
        <div className='matches results'>
            <div className="head">
                <ul>
                    <li><Link href={'/matches'}>Все</Link></li>
                    <li><Link href={'/matches/live'}>LIVE</Link></li>
                    <li><Link href={'/matches/results'}>Завершённые</Link></li>
                    <li><Link href={'/matches/fixtures'}>Запланированные</Link></li>
                </ul>
                <DateSwitcher placement={'ended'} />
            </div>
            <Matches placement={'ended'} />
        </div>
    );
};

export default page;