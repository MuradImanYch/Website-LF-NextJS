import Link from 'next/link';
import '../style.css';
import Matches from '@/components/Matches/Matches';

export const metadata = {
    title: 'LIVE Футбольные матчи – Текущие трансляции и результаты',
    description: 'Следите за футбольными матчами в режиме LIVE, смотрите текущие результаты и обновления в реальном времени. Оставайтесь в центре событий.',
    keywords: 'LIVE матчи, футбольные трансляции, результаты онлайн',
    openGraph: {
      type: 'website',
      title: 'LIVE Футбольные матчи – Текущие трансляции и результаты',
      description: 'Следите за футбольными матчами в режиме LIVE, смотрите текущие результаты и обновления в реальном времени. Оставайтесь в центре событий.'
    },
    twitter: {
      card: 'summary_large_image',
      title: 'LIVE Футбольные матчи – Текущие трансляции и результаты',
      description: 'Следите за футбольными матчами в режиме LIVE, смотрите текущие результаты и обновления в реальном времени. Оставайтесь в центре событий.'
    }
};

const page = () => {
    return (
        <div className='matches live'>
            <div className="head">
                <ul>
                    <li><Link href={'/matches'}>Все</Link></li>
                    <li><Link href={'/matches/live'}>LIVE</Link></li>
                    <li><Link href={'/matches/results'}>Завершённые</Link></li>
                    <li><Link href={'/matches/fixtures'}>Запланированные</Link></li>
                </ul>
            </div>
            <Matches placement={'live'} />
        </div>
    );
};

export default page;