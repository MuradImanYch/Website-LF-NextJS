import Odds from "@/components/Main/Odds/Odds";
import './style.css';

export const metadata = {
    title: 'Коэффициенты на футбольные матчи',
    description: 'Сравнивайте коэффициенты на футбольные матчи от различных букмекеров и находите лучшие предложения.',
    keywords: 'коэффициенты на футбол, ставки на матчи, сравнение коэффициентов',
    openGraph: {
      type: 'website',
      title: 'Коэффициенты на футбольные матчи',
      description: 'Сравнивайте коэффициенты на футбольные матчи от различных букмекеров и находите лучшие предложения.'
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Коэффициенты на футбольные матчи',
      description: 'Сравнивайте коэффициенты на футбольные матчи от различных букмекеров и находите лучшие предложения.'
    }
};

const page = () => {
    return (
        <div className="odds-page">
            <Odds placement={'page'} />
        </div>
    );
};

export default page;