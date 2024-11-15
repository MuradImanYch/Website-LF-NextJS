import Broadcasts from "@/components/Main/Broadcasts/Broadcasts";
import '@/app/broadcasts/style.css';

export const metadata = {
    title: 'Live Football Broadcasts – Watch Online and Replays',
    description: 'Watch live football broadcasts and game replays online. Stay updated with every significant moment.',
    keywords: 'live football broadcasts, watch matches online, game replays',
    openGraph: {
      type: 'website',
      title: 'Live Football Broadcasts – Watch Online and Replays',
      description: 'Watch live football broadcasts and game replays online. Stay updated with every significant moment.'
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Live Football Broadcasts – Watch Online and Replays',
      description: 'Watch live football broadcasts and game replays online. Stay updated with every significant moment.'
    }
};

const page = () => {
    return (
        <div className='broadcasts-page'>
            <Broadcasts lang={'en'} placement={'page'} />
        </div>
    );
};

export default page;