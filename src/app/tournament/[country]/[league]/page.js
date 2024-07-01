import config from '../../../../../public/conf.json';
import Image from 'next/image';
import Link from 'next/link';

const page = ({params}) => {
    const country = config.tournaments.filter(e => {
        return e.name.en.toLowerCase().replace(/\s+/g, '').replace(/-/g, '') === params.country.replace(/-/g, '');
    });

    const league = country[0].leagues.filter(e => {
        return e.name.en.toLowerCase().replace(/\s+/g, '').replace(/-/g, '').replace('ü', 'u').replace('ə', 'a').replace('ö', 'o').replace('ğ', 'gh').replace('ı', 'i').replace('ç', 'c').replace('ş', 's').replace('ç', 'c').replace('ã', 'a').replace('ó', 'o').replace('ú', 'u').replace('é', 'e').replace('ý', 'y').replace('/', '').replace('\'', '').replace('.', '') === params.league.replace(/-/g, '');
    });

    

    return (
        <div>
            <div className="head">
                <div className="left">
                    <Image className='country-flag' src={country[0].flag} width={22} height={16} alt={'флаг ' + country[0].name.ru} title={country[0].name.ru} /> <Link href={`/tournament/${country[0].name.en.replace(/\s+/g, '-').toLowerCase()}`} className='country-name'>{country[0].name.ru}</Link>
                    <span className='league-name'> <span className='slash'>/</span> <Image className='league-logo' src={league[0].logo} width={22} height={16} alt={'лого ' + league[0].name.ru} title={league[0].name.ru} /> {league[0].name.ru}</span>
                </div>
                <div className="right">
                    <input type="date" />
                </div>
            </div>
        </div>
    );
};

export default page;