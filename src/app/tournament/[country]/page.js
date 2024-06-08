import config from '@/conf.json';

const page = ({params}) => {
    const country = config.tournaments.filter(e => {
        return e.name.en.toLowerCase().replace(/\s+/g, '').replace(/-/g, '') === params.country.replace(/-/g, '');
    });

    return (
        <div>
            {country[0].name.ru}
        </div>
    );
};

export default page;