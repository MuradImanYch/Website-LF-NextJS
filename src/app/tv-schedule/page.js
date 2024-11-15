import TVSchedule from "@/components/Main/TVSchedule/TVSchedule";
import './style.css';

export const metadata = {
    title: 'ТВ программа футбольных трансляций',
    description: 'Ознакомьтесь с расписанием футбольных трансляций по ТВ, чтобы не пропустить ни одной игры.',
    keywords: 'тв программа, расписание трансляций, футбольные матчи по ТВ',
    openGraph: {
      type: 'website',
      title: 'ТВ программа футбольных трансляций',
      description: 'Ознакомьтесь с расписанием футбольных трансляций по ТВ, чтобы не пропустить ни одной игры.'
    },
    twitter: {
      card: 'summary_large_image',
      title: 'ТВ программа футбольных трансляций',
      description: 'Ознакомьтесь с расписанием футбольных трансляций по ТВ, чтобы не пропустить ни одной игры.'
    }
};

const page = () => {
    return (
        <div className="tv-schedule-page">
            <TVSchedule placement={'page'} />
        </div>
    );
};

export default page;