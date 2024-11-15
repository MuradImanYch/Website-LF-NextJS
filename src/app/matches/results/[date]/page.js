import Link from 'next/link';
import '../../style.css';
import Matches from '@/components/Matches/Matches';
import DateSwitcher from '@/components/Matches/DateSwitcher/DateSwitcher';
import config from '../../../../../public/conf.json';

export const generateMetadata = ({ params }) => {
    const today = new Date();

    return {
        title: `Завершенные футбольные матчи на ${params.date} – Итоговые результаты и обзоры`,
        description: `Получите результаты завершенных футбольных матчей и подробные обзоры на ${params.date}. Узнайте, как завершились ключевые игры в ${params.date}.`,
        keywords: `результаты матчей ${params.date}, завершенные матчи ${params.date}, футбольные обзоры ${params.date}`,
        openGraph: {
          type: 'website',
          title: `Завершенные футбольные матчи на ${params.date} – Итоговые результаты и обзоры`,
          description: `Получите результаты завершенных футбольных матчей и подробные обзоры на ${params.date}. Узнайте, как завершились ключевые игры в ${params.date}.`
        },
        twitter: {
          card: 'summary_large_image',
          title: `Завершенные футбольные матчи на ${params.date} – Итоговые результаты и обзоры`,
          description: `Получите результаты завершенных футбольных матчей и подробные обзоры на ${params.date}. Узнайте, как завершились ключевые игры в ${params.date}.`
        },
        alternates: {
          canonical: params.date === today.toISOString().split('T')[0] && `${config.domain}/matches/results`
        }
    };
};

const page = async ({params}) => {
    return (
        <div className='matches results'>
            <div className="head">
                <ul>
                    <li><Link href={'/matches'}>Все</Link></li>
                    <li><Link href={'/matches/live'}>LIVE</Link></li>
                    <li><Link href={'/matches/results'}>Завершённые</Link></li>
                    <li><Link href={'/matches/fixtures'}>Запланированные</Link></li>
                </ul>
                <DateSwitcher pathnameDate={params.date} placement={'ended'} />
            </div>
            <Matches pathnameDate={params.date} placement={'ended'} />
        </div>
    );
};

export default page;