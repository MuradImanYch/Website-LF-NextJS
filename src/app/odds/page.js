import Odds from "@/components/Main/Odds/Odds";
import './style.css';

const page = () => {
    return (
        <div className="odds-page">
            <Odds placement={'page'} />
        </div>
    );
};

export default page;