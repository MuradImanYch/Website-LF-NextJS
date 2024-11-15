import Odds from "@/components/Main/Odds/Odds";
import '@/app/odds/style.css';

export const metadata = {
    title: "Football Match Odds",
    description: "Compare football match odds from various bookmakers and find the best deals.",
    keywords: "football odds, match betting, odds comparison",
    openGraph: {
      type: 'website',
      title: "Football Match Odds",
      description: "Compare football match odds from various bookmakers and find the best deals."
    },
    twitter: {
      card: 'summary_large_image',
      title: "Football Match Odds",
      description: "Compare football match odds from various bookmakers and find the best deals."
    }
};

const page = () => {
    return (
        <div className="odds-page">
            <Odds lang={'en'} placement={'page'} />
        </div>
    );
};

export default page;