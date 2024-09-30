import Carousel from '@/components/Main/Carousel/Carousel';
import config from '../../../../../public/conf.json';
import Image from 'next/image';
import Link from 'next/link';

const page = ({params}) => {
    const country = config.tournaments.filter(e => {
        return e.name.en.toLowerCase().replace(/\s+/g, '').replace(/-/g, '') === params.country.replace(/-/g, '');
    });

    const league = country[0].leagues.filter(e => {
        return e.name.en.toLowerCase().replaceAll(/\s+/g, '').replaceAll(/-/g, '').replaceAll('ü', 'u').replaceAll('ə', 'a').replaceAll('ö', 'o').replaceAll('ğ', 'gh').replaceAll('ı', 'i').replaceAll('ç', 'c').replaceAll('ş', 's').replaceAll('ç', 'c').replaceAll('ã', 'a').replaceAll('ó', 'o').replaceAll('ú', 'u').replaceAll('é', 'e').replaceAll('ý', 'y').replaceAll('ï', 'i').replaceAll('á', 'a').replaceAll('ø', 'o').replaceAll('í', 'i').replaceAll('/', '').replaceAll('\'', '').replaceAll('.', '') === params.league.replaceAll(/-/g, '');
    });

    return (
        <div className='tournament-league'>
            <div className="head">
                <h2 className="left">
                    <Image className='country-flag' src={country[0].flag} width={22} height={16} alt={'флаг ' + country[0].name.ru} title={country[0].name.ru} /> <Link href={`/tournament/${country[0].name.en.replaceAll(/\s+/g, '-').toLowerCase()}`} className='country-name'>{country[0].name.ru}</Link>
                    <span className='league-name'> <span className='slash'>/</span> <Image className='league-logo' src={league[0].logo} width={22} height={16} alt={'лого ' + league[0].name.ru} title={league[0].name.ru} /> {league[0].name.ru}</span>
                </h2>
                <div className="right">
                    <input type="date" />
                </div>
            </div>
            <Carousel param={{name: "Новости", url: `${league[0].name.en.replaceAll(/\s+/g, '-').toLowerCase()}/news`, limit: 5, tags: league[0].category && league[0].category.join(',')}} />
        </div>
    );
};

export default page;