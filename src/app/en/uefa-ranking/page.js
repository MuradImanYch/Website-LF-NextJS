import UefaRank from "@/components/Main/UefaRank/UefaRank";
import "@/app/uefa-ranking/style.css";

export const metadata = {
    title: 'UEFA Ranking - Team Positions and Updates',
    description: 'Check out the latest UEFA team rankings, positions, and updates.',
    keywords: 'UEFA ranking, UEFA table, team positions',
    openGraph: {
      type: 'website',
      title: 'UEFA Ranking - Team Positions and Updates',
      description: 'Check out the latest UEFA team rankings, positions, and updates.'
    },
    twitter: {
      card: 'summary_large_image',
      title: 'UEFA Ranking - Team Positions and Updates',
      description: 'Check out the latest UEFA team rankings, positions, and updates.'
    }
};

const page = () => {
    return (
        <div className="uefa-rank-page">
            <UefaRank lang={'en'} placement={'page'} />
        </div>
    );
};

export default page;