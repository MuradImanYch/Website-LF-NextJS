import Broadcasts from "@/components/Main/Broadcasts/Broadcasts";
import './style.css';

const page = () => {
    return (
        <div className='broadcasts-page'>
            <Broadcasts placement={'page'} />
        </div>
    );
};

export default page;