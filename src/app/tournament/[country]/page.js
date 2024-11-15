import './style.css';
import Carousel from '@/components/Main/Carousel/Carousel';
import config from '../../../../public/conf.json';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Fixtures from '@/components/Main/TournamentBlock/Fixtures/Fixtures';

export const generateMetadata = ({ params }) => {
    const country = config.tournaments.filter(e => {
        return e.name.en.toLowerCase().replaceAll(/\s+/g, '').replaceAll(/-/g, '') === params.country.replaceAll(/-/g, '');
    });

    if(country.length < 1) {
        notFound();
    }

    return {
        title: `${country[0]?.name.ru} - Турниры, футбольные новости, расписание матчей, результаты`,
        description: `Актуальные новости, расписание и результаты матчей турнира ${country[0]?.name.ru}. Следите за последними событиями и аналитикой футбола`,
        keywords: `Турнир ${country[0]?.name.ru}, новости футбола ${country[0]?.name.ru}, расписание матчей ${country[0]?.name.ru}, результаты футбольных матчей`,
        openGraph: {
          type: 'website',
          title: `${country[0]?.name.ru} - Турниры, футбольные новости, расписание матчей, результаты`,
          description: `Актуальные новости, расписание и результаты матчей турнира ${country[0]?.name.ru}. Следите за последними событиями и аналитикой футбола`
        },
        twitter: {
          card: 'summary_large_image',
          title: `${country[0]?.name.ru} - Турниры, футбольные новости, расписание матчей, результаты`,
          description: `Актуальные новости, расписание и результаты матчей турнира ${country[0]?.name.ru}. Следите за последними событиями и аналитикой футбола`
        }
    };
};

const page = async ({params}) => {
    const country = config.tournaments.filter(e => {
        return e.name.en.toLowerCase().replaceAll(/\s+/g, '').replaceAll(/-/g, '') === params.country.replaceAll(/-/g, '');
    });

    let tags = [];

    country[0].leagues.map(e => {
        if(e.category) {
            tags.push(e.category);
        }
    });

    const getLeague = country[0].leagues.filter(e => {
        return e.type !== 'National';
    });

    const getNationalTeam = country[0].leagues.filter(e => {
        return e.type === 'National';
    });

    async function fetchUefaRank() {
        try {
          const res = await fetch(`${config.domain}/api/uefa-rank?country=${country[0].name.ru}`, {cache: 'no-cache'});
          const data = await res.json();
          
          return data;
        } 
        catch (err) {
          console.error(err);
        }
    }

    async function fetchFifaRank() {
        try {
          const res = await fetch(`${config.domain}/api/fifa-rank?country=${country[0].name.ru}`, {cache: 'no-cache'});
          const data = await res.json();
          
          return data;
        } 
        catch (err) {
          console.error(err);
        }
    }

    const uefaRank = await fetchUefaRank();
    const fifaRank = await fetchFifaRank();

    const getCurrentSeasonFromLeagueId = async () => {
        const url = `https://api-football-v1.p.rapidapi.com/v3/leagues?id=${getLeague[0]?.id}&current=true`;
        // const url = ``;
        const options = {
            method: 'GET',
            headers: {
                'x-rapidapi-key': '64ba7a5252msh7ee95ca829ca2e4p126736jsn8b074c27e2a5',
                'x-rapidapi-host': 'api-football-v1.p.rapidapi.com'
            },
            cache: 'no-cache'
        };

        try {
            const response = await fetch(url, options);
            const result = await response.json();
            return result;
        } catch (error) {
            console.error(error);
        }
    }

    const currentSeason = await getCurrentSeasonFromLeagueId();

    return (
        <div className='tournament-country'>
            <div className="head">
                <h2 className="left">
                    <div className="name">
                        <Image className='country-flag' src={country[0].flag} width={22} height={16} alt={'флаг ' + country[0].name.ru} title={country[0].name.ru} /> <span className='country-name'>{country[0].name.ru}</span>
                    </div>
                    
                    <div className="right">
                        {uefaRank && uefaRank[0] && <Link className='rankLink' href={`/uefa-ranking#${uefaRank[0].name}`}>Рейтинг УЕФА #{uefaRank[0].place}</Link>}
                        {fifaRank && fifaRank[0] && <Link className='rankLink' href={`/fifa-ranking#${fifaRank[0].name}`}>Рейтинг ФИФА #{fifaRank[0].place}</Link>}
                    </div>
                </h2>
            </div>
            <Carousel param={{name: "Новости", url: `${country[0].name.en.replaceAll(/\s+/g, '-').toLowerCase()}/news`, limit: 5, tags: tags && tags.join(',')}} />
            <div className="content">
                <div className="left tournamentBlock">
                    {getLeague[0] && <div className="item">
                        <div className="head"><h3><Image src={getLeague[0].logo} width={22} height={16} placeholder={'empty'} alt={getLeague[0].name.ru} title={getLeague[0].name.ru} /><Link href={`/tournament/${country[0].name.en.replace(/\s+/g, '-').toLowerCase()}/${getLeague[0]?.name.en.replaceAll('.', '').replaceAll('-', '').replaceAll(/\s+/g, '-').toLowerCase().replaceAll('ü', 'u').replaceAll('ə', 'a').replaceAll('ö', 'o').replaceAll('ğ', 'gh').replaceAll('ı', 'i').replaceAll('ç', 'c').replaceAll('ç', 'c').replaceAll('ã', 'a').replaceAll('ş', 's').replaceAll('ó', 'o').replaceAll('ú', 'u').replaceAll('é', 'e').replaceAll('ý', 'y').replaceAll('ï', 'i').replaceAll('á', 'a').replaceAll('ø', 'o').replaceAll('í', 'i').replaceAll('/', '-').replaceAll('\'', '')}`}>{getLeague[0]?.name.ru}</Link></h3></div>
                        <Fixtures placement={'main'} currentSeason={currentSeason && currentSeason?.response[0]?.seasons[0].year} leagueId={getLeague[0]?.id} />
                    </div>}
                    {getNationalTeam[0] && <div className="item">
                        <div className="head"><h3><Image src={getNationalTeam[0].logo} width={22} height={16} placeholder={'empty'} alt={getNationalTeam[0].name.ru} title={getNationalTeam[0].name.ru} /><Link href={`/tournament/${country[0].name.en.replace(/\s+/g, '-').toLowerCase()}/${getNationalTeam[0]?.name.en.replaceAll('.', '').replaceAll('-', '').replaceAll(/\s+/g, '-').toLowerCase().replaceAll('ü', 'u').replaceAll('ə', 'a').replaceAll('ö', 'o').replaceAll('ğ', 'gh').replaceAll('ı', 'i').replaceAll('ç', 'c').replaceAll('ç', 'c').replaceAll('ã', 'a').replaceAll('ş', 's').replaceAll('ó', 'o').replaceAll('ú', 'u').replaceAll('é', 'e').replaceAll('ý', 'y').replaceAll('ï', 'i').replaceAll('á', 'a').replaceAll('ø', 'o').replaceAll('í', 'i').replaceAll('/', '-').replaceAll('\'', '')}`}>{getNationalTeam[0]?.name.ru}</Link></h3></div>
                        <Fixtures placement={'national-fixtures'} currentSeason={currentSeason && currentSeason?.response[0]?.seasons[0].year} leagueId={getNationalTeam[0]?.id} />
                    </div>}
                </div>
                <div className="right">
                    <h3 className="head">Турниры</h3>
                    <ul className='tournament-list'>
                        {country[0].leagues.map(e => {
                            let countryPathname = `/tournament/${country[0].name.en.replace(/\s+/g, '-').toLowerCase()}`;

                            return <li key={e.id}><Image src={e.logo} width={20} height={17} alt={'лого ' + e.name.ru} title={e.name.ru} /><Link href={`${countryPathname}/${e.name.en.replaceAll('.', '').replaceAll('-', '').replaceAll(/\s+/g, '-').toLowerCase().replaceAll('ü', 'u').replaceAll('ə', 'a').replaceAll('ö', 'o').replaceAll('ğ', 'gh').replaceAll('ı', 'i').replaceAll('ç', 'c').replaceAll('ç', 'c').replaceAll('ã', 'a').replaceAll('ş', 's').replaceAll('ó', 'o').replaceAll('ú', 'u').replaceAll('é', 'e').replaceAll('ý', 'y').replaceAll('ï', 'i').replaceAll('á', 'a').replaceAll('ø', 'o').replaceAll('í', 'i').replaceAll('/', '-').replaceAll('\'', '')}`}>{e.name.ru}</Link></li>
                        })}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default page;