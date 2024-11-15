import TransferList from "@/components/Main/TransferList/TransferList";
import '@/app/transfer-list/style.css';

export const metadata = {
    title: 'Transfer List - Latest Transfers and Rumors',
    description: 'Get the latest updates on transfers, player movements, and rumors in the football world. Stay informed on teams and player changes.',
    keywords: 'transfer list, latest transfers, football rumors, transfer updates',
    openGraph: {
      type: 'website',
      title: 'Transfer List - Latest Transfers and Rumors',
      description: 'Get the latest updates on transfers, player movements, and rumors in the football world. Stay informed on teams and player changes.'
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Transfer List - Latest Transfers and Rumors',
      description: 'Get the latest updates on transfers, player movements, and rumors in the football world. Stay informed on teams and player changes.'
    }
};

const page = () => {
    return (
        <div className="transfer-list-page">
            <TransferList lang={'en'} placement={'page'} />
        </div>
    );
};

export default page;