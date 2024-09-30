import TransferList from "@/components/Main/TransferList/TransferList";
import './style.css';

const page = () => {
    return (
        <div className="transfer-list-page">
            <TransferList placement={'page'} />
        </div>
    );
};

export default page;