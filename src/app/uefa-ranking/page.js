import UefaRank from "@/components/Main/UefaRank/UefaRank";
import "./style.css";

export const metadata = {
    title: 'Рейтинг УЕФА - позиции команд и обновления',
    description: 'Узнайте актуальный рейтинг команд УЕФА, их позиции и последние обновления.',
    keywords: 'рейтинг УЕФА, таблица УЕФА, позиции команд',
    openGraph: {
      type: 'website',
      title: 'Рейтинг УЕФА - позиции команд и обновления',
      description: 'Узнайте актуальный рейтинг команд УЕФА, их позиции и последние обновления.'
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Рейтинг УЕФА - позиции команд и обновления',
      description: 'Узнайте актуальный рейтинг команд УЕФА, их позиции и последние обновления.'
    }
};

const page = () => {
    return (
        <div className="uefa-rank-page">
            <UefaRank placement={'page'} />
        </div>
    );
};

export default page;