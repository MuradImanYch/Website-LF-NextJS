import Header from "@/components/Main/Header/Header";
import TournamentBlock from "@/components/Main/TournamentBlock/TournamentBlock";
import config from '../../public/conf.json';

const page = () => {
  return (
    <>
      <Header />
      <TournamentBlock leagueId={config.mainPageLeagueIds[0]} />
    </>
  );
};

export default page;