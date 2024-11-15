export const dynamic = 'force-dynamic';
import { format } from 'date-fns';
import Header from "@/components/Main/Header/Header";
import TournamentBlock from "@/components/Main/TournamentBlock/TournamentBlock";
import config from '../../../public/conf.json';
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

export const metadata = {
  title: 'Latest Football News, Match Results, and Live Streams',
  description: 'Get the latest football news, watch live match streams, match results, and in-depth analysis on our website.',
  keywords: 'football news, match streams, match results, football online, football analysis',
  openGraph: {
    type: 'website',
    title: 'Latest Football News, Match Results, and Live Streams',
    description: 'Get the latest football news, watch live match streams, match results, and in-depth analysis on our website.'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Latest Football News, Match Results, and Live Streams',
    description: 'Get the latest football news, watch live match streams, match results, and in-depth analysis on our website.'
  }
};

const date = new Date();

async function fetchNews() {
  try {
    const res = await fetch(`${config.domain}/api/news?limit=200`, { cache: 'no-cache' });
    return await res.json();
  } catch (err) {
    console.error(err);
    return [];
  }
}

const urlFixtures = `https://api-football-v1.p.rapidapi.com/v3/fixtures?date=${format(date, 'yyyy-MM-dd')}`;
// const urlFixtures = ``;
const optionsFixtures = {
  method: 'GET',
  headers: {
    'x-rapidapi-key': '64ba7a5252msh7ee95ca829ca2e4p126736jsn8b074c27e2a5',
    'x-rapidapi-host': 'api-football-v1.p.rapidapi.com'
  },
  cache: 'no-cache'
};

async function fetchFixtures() {
  try {
    const response = await fetch(urlFixtures, optionsFixtures);
    const result = await response.json();
    return result;
  } catch (err) {
    console.error(err);
    return [];
  }
}

// Функция для фетча odds для конкретной лиги
async function fetchOddsForLeague(leagueId) {
  const urlOdds = `https://api-football-v1.p.rapidapi.com/v3/odds?league=${leagueId}&season=${date.getFullYear()}&date=${format(date, 'yyyy-MM-dd')}`;
  // const urlOdds = ``;
  const optionsOdds = {
    method: 'GET',
    headers: {
      'x-rapidapi-key': '64ba7a5252msh7ee95ca829ca2e4p126736jsn8b074c27e2a5',
      'x-rapidapi-host': 'api-football-v1.p.rapidapi.com'
    },
    cache: 'no-cache'
  };
  
  try {
    const response = await fetch(urlOdds, optionsOdds);
    const result = await response.json();
    return result;
  } catch (err) {
    console.error(err);
    return [];
  }
}

const Page = async () => {
  // Выполняем все асинхронные запросы параллельно
  const [news, fixturesToday] = await Promise.all([fetchNews(), fetchFixtures()]);

  // Фильтрация матчей по статусам
  const liveStatuses = ['1T', '2T', 'HT'];
  const filteredLiveMatches = fixturesToday.response
    ?.filter(match => config.actualLeagueIds.includes(match.league.id) && liveStatuses.includes(match.fixture.status.short))
    .sort((a, b) => config.actualLeagueIds.indexOf(a.league.id) - config.actualLeagueIds.indexOf(b.league.id));

  const filteredFixtures = fixturesToday.response
    ?.filter(match => config.actualLeagueIds.includes(match.league.id) && match.fixture.status.short !== 'NS')
    .sort((a, b) => config.actualLeagueIds.indexOf(a.league.id) - config.actualLeagueIds.indexOf(b.league.id));

  const filteredNSMatches = fixturesToday.response
    ?.filter(match => config.actualLeagueIds.includes(match.league.id) && match.fixture.status.short === 'NS')
    .sort((a, b) => config.actualLeagueIds.indexOf(a.league.id) - config.actualLeagueIds.indexOf(b.league.id));

  // Получаем все уникальные league.id из матчей
  const leagueIds = [...new Set([...filteredLiveMatches || [], ...filteredFixtures || [], ...filteredNSMatches || []].map(match => match.league.id))];

  // Выполняем запросы для всех уникальных league.id
  const oddsPromises = leagueIds.map(id => fetchOddsForLeague(id));

  // Ждем завершения всех запросов на odds
  const allOddsResponses = await Promise.all(oddsPromises);

  // Объединяем все odds в один массив
  const allOdds = allOddsResponses.flatMap(response => response.response || []);

  // Добавляем odds к каждому матчу с 'NS' статусом
  const updatedNSMatches = filteredNSMatches?.map(match => {
    const oddsMatch = allOdds.find(odds => odds.fixture.id === match.fixture.id);
    return oddsMatch ? { ...match, odds: oddsMatch.bookmakers } : match;
  });

  // Объединяем все матчи
  const fixtures = [...filteredLiveMatches || [], ...updatedNSMatches || [], ...filteredFixtures || []];

  // Рендер компонента с данными
  return (
    <>
      <Header lang={'en'} fixtures={fixtures} news={news} />
      <TournamentBlock lang={'en'} news={news} leagueId={config.actualLeagueIds[0]} placement={'main'} />
      <div className="newsFeeds">
        <NewsFeed lang={'en'} news={news.slice(5, 13)} />
        <VKPosts lang={'en'} placement={'main'} />
      </div>
      <TournamentBlock lang={'en'} news={news} leagueId={config.actualLeagueIds[1]} placement={'main'} />
      <div className="broadcasts-tv-schedule">
        <Broadcasts lang={'en'} placement={'main'} />
        <TVSchedule lang={'en'} placement={'main'} />
      </div>
      <div className="tags-transfers">
        <Tags lang={'en'} placement={'main'} news={news} />
        <TransferList lang={'en'} placement={'main'} />
      </div>
      <TournamentBlock lang={'en'} news={news} leagueId={config.actualLeagueIds[2]} placement={'main'} />
      <div className="newsFeeds">
        <Odds lang={'en'} placement={'main'} />
        <NewsFeed lang={'en'} news={news.slice(13, 21)} />
      </div>
      <div className="uefa-fifa-ranks">
        <UefaRank lang={'en'} placement={'main'} />
        <FifaRank lang={'en'} placement={'main'} />
      </div>
      <TournamentBlock lang={'en'} news={news} leagueId={config.actualLeagueIds[3]} placement={'main'} />
      <Carousel lang={'en'} param={{ name: "Блоги", url: '/blogs', category: 'blog', limit: 5 }} />
      <Carousel lang={'en'} param={{ name: "Видео", url: '/video', category: 'video', limit: 5 }} />
      <PhotoGallery lang={'en'} placement={'main'} news={news} />
    </>
  );
};

export default Page;