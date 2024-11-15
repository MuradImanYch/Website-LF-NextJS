import TransferList from "@/components/Main/TransferList/TransferList";
import './style.css';

export const metadata = {
    title: 'Список трансферов - последние переходы и слухи',
    description: 'Узнайте о последних трансферах, переходах и слухах в мире футбола. Обновления по игрокам и командам.',
    keywords: 'список трансферов, последние переходы, футбольные слухи, обновления трансферов',
    openGraph: {
      type: 'website',
      title: 'Список трансферов - последние переходы и слухи',
      description: 'Узнайте о последних трансферах, переходах и слухах в мире футбола. Обновления по игрокам и командам.'
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Список трансферов - последние переходы и слухи',
      description: 'Узнайте о последних трансферах, переходах и слухах в мире футбола. Обновления по игрокам и командам.'
    }
};

const page = () => {
    return (
        <div className="transfer-list-page">
            <TransferList placement={'page'} />
        </div>
    );
};

export default page;