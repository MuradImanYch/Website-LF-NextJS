import TVSchedule from "@/components/Main/TVSchedule/TVSchedule";
import './style.css';

const page = () => {
    return (
        <div className="tv-schedule-page">
            <TVSchedule placement={'page'} />
        </div>
    );
};

export default page;