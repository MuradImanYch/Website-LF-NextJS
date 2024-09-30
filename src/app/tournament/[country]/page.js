import Carousel from '@/components/Main/Carousel/Carousel';
import config from '../../../../public/conf.json';
import Image from 'next/image';
import Link from 'next/link';

const page = async ({params, path}) => {
    const country = config.tournaments.filter(e => {
        return e.name.en.toLowerCase().replaceAll(/\s+/g, '').replaceAll(/-/g, '') === params.country.replaceAll(/-/g, '');
    });

    let tags = [];

    country[0].leagues.map(e => {
        if(e.category) {
            tags.push(e.category);
        }
    });

    async function fetchUefaRank() {
        try {
          const res = await fetch(`http://78.46.254.73:3000/api/uefa-rank?country=${country[0].name.ru}`, {cache: 'no-cache'});
          const data = await res.json();
          
          return data;
        } 
        catch (err) {
          console.error(err);
        }
    }

    async function fetchFifaRank() {
        try {
          const res = await fetch(`http://78.46.254.73:3000/api/fifa-rank?country=${country[0].name.ru}`, {cache: 'no-cache'});
          const data = await res.json();
          
          return data;
        } 
        catch (err) {
          console.error(err);
        }
    }

    const uefaRank = await fetchUefaRank();
    const fifaRank = await fetchFifaRank();

    return (
        <div className='tournament-country'>
            <div className="head">
                <h2 className="left">
                    <div className="name">
                        <Image className='country-flag' src={country[0].flag} width={22} height={16} alt={'флаг ' + country[0].name.ru} title={country[0].name.ru} /> <span className='country-name'>{country[0].name.ru}</span>
                    </div>
                    
                    <div className="right">
                        {uefaRank[0] && <Link className='rankLink' href={`/uefa-ranking#${uefaRank[0].name}`}>Рейтинг УЕФА #{uefaRank[0].place}</Link>}
                        {fifaRank[0] && <Link className='rankLink' href={`/fifa-ranking#${fifaRank[0].name}`}>Рейтинг ФИФА #{fifaRank[0].place}</Link>}
                    </div>
                </h2>
            </div>
            <Carousel param={{name: "Новости", url: `${country[0].name.en.replaceAll(/\s+/g, '-').toLowerCase()}/news`, limit: 5, tags: tags && tags.join(',')}} />
            <div className="content">
                <div className="left">
                    <div className="item">
                        <div className="head"><h3><Link href="#">Liga 1</Link></h3></div>
                        <ul>
                            <li>
                                <Link href="#">
                                    <span>l</span>
                                    <span>c</span>
                                    <span>r</span>
                                </Link>
                            </li>
                            <li>
                                <Link href="#">
                                    <span>l</span>
                                    <span>c</span>
                                    <span>r</span>
                                </Link>
                            </li>
                            <li>
                                <Link href="#">
                                    <span>l</span>
                                    <span>c</span>
                                    <span>r</span>
                                </Link>
                            </li>
                            <li>
                                <Link href="#">
                                    <span>l</span>
                                    <span>c</span>
                                    <span>r</span>
                                </Link>
                            </li>
                            <li>
                                <Link href="#">
                                    <span>l</span>
                                    <span>c</span>
                                    <span>r</span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="item">
                        <div className="head"><h3><Link href="#">Liga 1</Link></h3></div>
                        <ul>
                            <li>
                                <Link href="#">
                                    <span>l</span>
                                    <span>c</span>
                                    <span>r</span>
                                </Link>
                            </li>
                            <li>
                                <Link href="#">
                                    <span>l</span>
                                    <span>c</span>
                                    <span>r</span>
                                </Link>
                            </li>
                            <li>
                                <Link href="#">
                                    <span>l</span>
                                    <span>c</span>
                                    <span>r</span>
                                </Link>
                            </li>
                            <li>
                                <Link href="#">
                                    <span>l</span>
                                    <span>c</span>
                                    <span>r</span>
                                </Link>
                            </li>
                            <li>
                                <Link href="#">
                                    <span>l</span>
                                    <span>c</span>
                                    <span>r</span>
                                </Link>
                            </li>
                        </ul>
                    </div>
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