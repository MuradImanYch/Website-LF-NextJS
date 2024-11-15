import FifaRank from "@/components/Main/FifaRank/FifaRank";
import "@/app/fifa-ranking/style.css";

export const metadata = {
    title: "FIFA Ranking - Current National Teams' Table",
    description: "View the current FIFA national teams ranking and latest updates.",
    keywords: "FIFA ranking, national teams ranking, FIFA table",
    openGraph: {
      type: 'website',
      title: "FIFA Ranking - Current National Teams' Table",
      description: "View the current FIFA national teams ranking and latest updates."
    },
    twitter: {
      card: 'summary_large_image',
      title: "FIFA Ranking - Current National Teams' Table",
      description: "View the current FIFA national teams ranking and latest updates."
    }
};

const page = () => {
    return (
        <div className="fifa-rank-page">
            <FifaRank lang={'en'} placement={'page'} />
        </div>
    );
};

export default page;