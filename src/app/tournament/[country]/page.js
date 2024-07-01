import config from '../../../../public/conf.json';
import Image from 'next/image';
import Link from 'next/link';

const page = ({params}) => {
    const country = config.tournaments.filter(e => {
        return e.name.en.toLowerCase().replace(/\s+/g, '').replace(/-/g, '') === params.country.replace(/-/g, '');
    });

    return (
        <div>
            <div className="head">
                <div className="left">
                    <Image className='country-flag' src={country[0].flag} width={22} height={16} alt={'флаг ' + country[0].name.ru} title={country[0].name.ru} /> <span className='country-name'>{country[0].name.ru}</span>
                </div>
            </div>
            <div className="content">
                <div className="left">
                    <div className="item">
                        <div className="head"><Link href="#">Liga 1</Link></div>
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
                        <div className="head"><Link href="#">Liga 1</Link></div>
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
                    <div className="head">Турниры</div>
                    <ul>
                        {country[0].leagues.map(e => {
                            let countryPathname = `/tournament/${country[0].name.en.replace(/\s+/g, '-').toLowerCase()}`;

                            return <li key={e.id}><Image src={e.logo} width={20} height={17} alt={'лого ' + e.name.ru} title={e.name.ru} /><Link href={`${countryPathname}/${e.name.en.replace('.', '').replace('-', '').replace(/\s+/g, '-').toLowerCase().replace('ü', 'u').replace('ə', 'a').replace('ö', 'o').replace('ğ', 'gh').replace('ı', 'i').replace('ç', 'c').replace('ç', 'c').replace('ã', 'a').replace('ş', 's').replace('ó', 'o').replace('ú', 'u').replace('é', 'e').replace('ý', 'y').replace('/', '-').replace('\'', '')}`}>{e.name.ru}</Link></li>
                        })}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default page;