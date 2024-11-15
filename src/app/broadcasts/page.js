import Broadcasts from "@/components/Main/Broadcasts/Broadcasts";
import './style.css';

export const metadata = {
    title: 'Прямые трансляции футбольных матчей – Смотрите онлайн и повторы',
    description: 'Смотрите прямые трансляции футбольных матчей и повторы игр онлайн. Будьте в курсе каждого важного момента.',
    keywords: 'футбольные трансляции, смотреть матчи онлайн, повторы игр',
    openGraph: {
      type: 'website',
      title: 'Прямые трансляции футбольных матчей – Смотрите онлайн и повторы',
      description: 'Смотрите прямые трансляции футбольных матчей и повторы игр онлайн. Будьте в курсе каждого важного момента.'
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Прямые трансляции футбольных матчей – Смотрите онлайн и повторы',
      description: 'Смотрите прямые трансляции футбольных матчей и повторы игр онлайн. Будьте в курсе каждого важного момента.'
    }
};

const page = () => {
    return (
        <div className='broadcasts-page'>
            <Broadcasts placement={'page'} />
        </div>
    );
};

export default page;