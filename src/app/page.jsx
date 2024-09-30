export const dynamic = 'force-dynamic';

import Header from "@/components/Main/Header/Header";
import TournamentBlock from "@/components/Main/TournamentBlock/TournamentBlock";
import config from '../../public/conf.json';
import VKPosts from "@/components/Main/VKPosts/VKPosts";
import NewsFeed from "@/components/Main/NewsFeed/NewsFeed";
import Broadcasts from "@/components/Main/Broadcasts/Broadcasts";
import TVSchedule from "@/components/Main/TVSchedule/TVSchedule";
import Tags from "@/components/Main/Tags/Tags";
import TransferList from "@/components/Main/TransferList/TransferList";
import Odds from "@/components/Main/Odds/Odds";
import UefaRank from "@/components/Main/UefaRank/UefaRank";
import FifaRank from "@/components/Main/FifaRank/FifaRank";
import Carousel from "@/components/Main/Carousel/Carousel";
import PhotoGallery from "@/components/Main/PhotoGallery/PhotoGallery";

async function fetchNews() {
  try {
    const res = await fetch(`http://78.46.254.73:3000/api/news?limit=100`, {cache: 'no-cache'});
    return await res.json();
  } catch (err) {
    console.error(err);
    return [];
  }
}

const Page = async () => {
  const news = await fetchNews();

  return (
    <>
      <Header news={news} />
      <TournamentBlock news={news} leagueId={config.actualLeagueIds[0]} />
      <div className="newsFeeds">
        <NewsFeed news={news.slice(5, 13)} />
        <VKPosts placement={'main'} />
      </div>
      <TournamentBlock news={news} leagueId={config.actualLeagueIds[1]} />
      <div className="broadcasts-tv-schedule">
        <Broadcasts placement={'main'} />
        <TVSchedule placement={'main'} />
      </div>
      <div className="tags-transfers">
        <Tags placement={'main'} news={news} />
        <TransferList placement={'main'} />
      </div>
      <TournamentBlock news={news} leagueId={config.actualLeagueIds[2]} />
      <div className="newsFeeds">
        <Odds placement={'main'} />
        <NewsFeed news={news.slice(13, 21)} />
      </div>
      <div className="uefa-fifa-ranks">
        <UefaRank placement={'main'} />
        <FifaRank placement={'main'} />
      </div>
      <TournamentBlock news={news} leagueId={config.actualLeagueIds[3]} />
      <Carousel param={{name: "Блоги", url: '/blogs', category: 'blog', limit: 5}} />
      <Carousel param={{name: "Видео", url: '/video', category: 'video', limit: 5}} />
      <PhotoGallery placement={'main'} news={news} />
    </>
  );
};

export default Page;