import './Matches.css';
import { format } from 'date-fns';
import config from '../../../public/conf.json';
import Link from 'next/link';
import DateComponent from '../News/Date/DateComponent';
import Image from 'next/image';

const Matches = async ({ placement, lang, pathnameDate }) => {
    const date = new Date();

    const getFixtures = async () => {
        const url = placement === 'all' ? `https://api-football-v1.p.rapidapi.com/v3/fixtures?date=${pathnameDate ? pathnameDate : format(date, 'yyyy-MM-dd')}` 
            : placement === 'live' ? `https://api-football-v1.p.rapidapi.com/v3/fixtures?live=all` 
            : placement === 'ended' ? `https://api-football-v1.p.rapidapi.com/v3/fixtures?date=${pathnameDate ? pathnameDate : format(date, 'yyyy-MM-dd')}&status=FT` 
            : placement === 'scheduled' ? `https://api-football-v1.p.rapidapi.com/v3/fixtures?date=${pathnameDate ? pathnameDate : format(date, 'yyyy-MM-dd')}&status=NS` 
            : null;

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
    };

    const fixtures = await getFixtures();

    // Группируем матчи по id турнира
    const groupedMatches = fixtures.response.reduce((acc, match) => {
        const tournamentId = match.league.id;
        if (!acc[tournamentId]) {
            acc[tournamentId] = {
                tournament: {
                    id: tournamentId,
                    name: match.league.name,
                    countryNameEn: findLeagueByIdAndType(tournamentId, "National")?.country.name.en || '',
                    countryNameRu: findLeagueByIdAndType(tournamentId, "National")?.country.name.ru || ''
                },
                matches: []
            };
        }
        acc[tournamentId].matches.push(match);
        return acc;
    }, {});

    // Преобразуем объект в массив и сортируем по actualLeagueIds, затем по country.name в зависимости от языка
    const sortedMatches = Object.values(groupedMatches).sort((a, b) => {
        const idA = a.tournament.id;
        const idB = b.tournament.id;

        const indexA = config.actualLeagueIds.indexOf(idA);
        const indexB = config.actualLeagueIds.indexOf(idB);

        if (indexA !== -1 && indexB !== -1) {
            return indexA - indexB;
        } else if (indexA !== -1) {
            return -1;
        } else if (indexB !== -1) {
            return 1;
        } else {
            return lang === 'en' 
                ? a.tournament.countryNameEn.localeCompare(b.tournament.countryNameEn, 'en') 
                : a.tournament.countryNameRu.localeCompare(b.tournament.countryNameRu, 'ru');
        }
    });

    // Find league by id
    function findLeagueByIdAndType(tournamentId, type) {
        for (const country of config.tournaments) {
            const league = country.leagues.find(league => league.id === tournamentId && league.type !== type);
            if (league) {
                return { country, league };
            }
        }
        return null;
    }

    return (
        <>
            <div className="wrap">
                <div className="tournament-matches">
                    {sortedMatches.map(e => (
                        <div className='tournaments' key={e.tournament.id}>
                            <div className="head">
                                <Image 
                                    src={findLeagueByIdAndType(e.tournament.id, "National")?.country.flag} 
                                    width={22} 
                                    height={16} 
                                    alt={lang === 'en' ? findLeagueByIdAndType(e.tournament.id, "National")?.country.name.en : findLeagueByIdAndType(e.tournament.id, "National")?.country.name.ru} 
                                    title={lang === 'en' ? findLeagueByIdAndType(e.tournament.id, "National")?.country.name.en : findLeagueByIdAndType(e.tournament.id, "National")?.country.name.ru} 
                                />
                                <Image 
                                    src={findLeagueByIdAndType(e.tournament.id, "National")?.league.logo} 
                                    width={22} 
                                    height={16} 
                                    alt={lang === 'en' ? findLeagueByIdAndType(e.tournament.id, "National")?.league.name.en : findLeagueByIdAndType(e.tournament.id, "National")?.league.name.ru} 
                                    title={lang === 'en' ? findLeagueByIdAndType(e.tournament.id, "National")?.league.name.en : findLeagueByIdAndType(e.tournament.id, "National")?.league.name.ru} 
                                />
                                {findLeagueByIdAndType(e.tournament.id, "National") ? (
                                    <h2>
                                        <Link href={`${lang === 'en' ? '/en' : ''}/tournament/${findLeagueByIdAndType(e.tournament.id, "National").country.name.en.replaceAll(/\s+/g, '-').toLowerCase()}/${findLeagueByIdAndType(e.tournament.id, "National").league.name.en.replaceAll('.', '').replaceAll('-', '').replaceAll(/\s+/g, '-').toLowerCase().replaceAll('ü', 'u').replaceAll('ə', 'a').replaceAll('ö', 'o').replaceAll('ğ', 'gh').replaceAll('ı', 'i').replaceAll('ç', 'c').replaceAll('ç', 'c').replaceAll('ã', 'a').replaceAll('ş', 's').replaceAll('ó', 'o').replaceAll('ú', 'u').replaceAll('é', 'e').replaceAll('ý', 'y').replaceAll('ï', 'i').replaceAll('á', 'a').replaceAll('ø', 'o').replaceAll('í', 'i').replaceAll('/', '-').replaceAll('\'', '')}`}>
                                            {lang === 'en' ? findLeagueByIdAndType(e.tournament.id, "National")?.league.name.en : findLeagueByIdAndType(e.tournament.id, "National")?.league.name.ru}
                                        </Link>
                                    </h2>
                                ) : e.tournament.name}
                            </div>
                            <div className="items">
                                {e.matches.map(match => (
                                    <Link href={'#'} key={match.fixture.id}>
                                        <div className="item">
                                            <div className='status'>{match.league.round}</div>
                                            <div className='center'>
                                                {match?.events?.filter(event => event.detail === 'Red Card' && event.team.name === match.teams.home.name).length > 0 && (
                                                    <div className='rc'>
                                                        {match?.events?.filter(event => event.detail === 'Red Card' && event.team.name === match.teams.home.name).length}
                                                    </div>
                                                )}
                                                <span className='team'>{match.teams.home.name}</span> 
                                                <Image src={match.teams.home.logo} placeholder={'empty'} width={'20'} height={'20'} alt={match.teams.home.name} title={match.teams.home.name} /> 
                                                {match.fixture.status.short !== 'NS' ? (
                                                    <span>{`${match.goals.home !== null ? match.goals.home : '-'} : ${match.goals.away !== null ? match.goals.away : '-'}`}</span>
                                                ) : (
                                                    <span>-</span>
                                                )}
                                                <Image src={match.teams.away.logo} placeholder={'empty'} width={'20'} height={'20'} alt={match.teams.away.name} title={match.teams.away.name} /> 
                                                <span className='team'>{match.teams.away.name}</span>
                                                {match?.events?.filter(event => event.detail === 'Red Card' && event.team.name === match.teams.away.name).length > 0 && (
                                                    <div className='rc'>
                                                        {match?.events?.filter(event => event.detail === 'Red Card' && event.team.name === match.teams.away.name).length}
                                                    </div>
                                                )}
                                            </div>
                                            <div className='dateTime'>
                                                {/* {match.fixture.status.short === '1H' || match.fixture.status.short === '2H' || match.fixture.status.short === 'HT' ? (
                                                    <span style={{color: 'red'}}>{match.fixture.status.long + ' - ' + match.fixture.status.elapsed + '\''}</span>
                                                ) : (
                                                    <>
                                                    {match?.fixture?.status.short !== 'NS' || match?.fixture?.status.short !== '1H' || match?.fixture?.status.short !== '2H' || match?.fixture?.status.short !== 'FT' ? match.fixture.status.long : <DateComponent dateProps={match.fixture.date} />}
                                                    </>
                                                )} */}
                                                <span style={{color: match.fixture.status.short === '1H' || match.fixture.status.short === '2H' || match.fixture.status.short === 'HT' ? 'red' : null}} className='dateTime'>{match.fixture.status.short !== 'NS' ? match.fixture.status.long : <DateComponent dateProps={match.fixture.date} />}</span>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default Matches;