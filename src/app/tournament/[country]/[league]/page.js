import config from '@/conf.json';

const page = ({params}) => {
    const country = config.tournaments.filter(e => {
        return e.name.en.toLowerCase().replace(/\s+/g, '').replace(/-/g, '') === params.country.replace(/-/g, '');
    });

    const league = country[0].leagues.filter(e => {
        return e.name.en.toLowerCase().replace(/\s+/g, '').replace(/-/g, '').replace('ü', 'u').replace('ə', 'a').replace('ö', 'o').replace('ğ', 'gh').replace('ı', 'i').replace('ç', 'ch').replace('ş', 'sh').replace('.', '') === params.league.replace(/-/g, '');
    });

    return (
        <div>
            {league[0].name.ru}
        </div>
    );
};

export default page;