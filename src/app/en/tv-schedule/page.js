import TVSchedule from "@/components/Main/TVSchedule/TVSchedule";
import '@/app/tv-schedule/style.css';

export const metadata = {
    title: "TV Schedule for Football Broadcasts",
    description: "Find the TV schedule for football broadcasts to make sure you don't miss any games.",
    keywords: "TV schedule, match broadcasts, football on TV",
    openGraph: {
      type: 'website',
      title: "TV Schedule for Football Broadcasts",
      description: "Find the TV schedule for football broadcasts to make sure you don't miss any games."
    },
    twitter: {
      card: 'summary_large_image',
      title: "TV Schedule for Football Broadcasts",
      description: "Find the TV schedule for football broadcasts to make sure you don't miss any games."
    }
};

const page = () => {
    return (
        <div className="tv-schedule-page">
            <TVSchedule placement={'page'} lang={'en'} />
        </div>
    );
};

export default page;