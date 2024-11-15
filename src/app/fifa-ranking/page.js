import FifaRank from "@/components/Main/FifaRank/FifaRank";
import "./style.css";

export const metadata = {
    title: 'Рейтинг ФИФА - актуальная таблица сборных',
    description: 'Смотрите актуальный рейтинг национальных сборных по версии ФИФА и последние обновления.',
    keywords: 'рейтинг ФИФА, сборные ФИФА, таблица ФИФА',
    openGraph: {
      type: 'website',
      title: 'Рейтинг ФИФА - актуальная таблица сборных',
      description: 'Смотрите актуальный рейтинг национальных сборных по версии ФИФА и последние обновления.'
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Рейтинг ФИФА - актуальная таблица сборных',
      description: 'Смотрите актуальный рейтинг национальных сборных по версии ФИФА и последние обновления.'
    }
};

const page = () => {
    return (
        <div className="fifa-rank-page">
            <FifaRank placement={'page'} />
        </div>
    );
};

export default page;