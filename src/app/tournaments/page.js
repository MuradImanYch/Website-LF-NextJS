import Image from 'next/image';
import config from '../../../public/conf.json';
import './style.css';
import Link from 'next/link';

function sortAndGroupCountries(countries) {
    // Сортировка стран по русскому названию
    countries.sort((a, b) => a.name.ru.localeCompare(b.name.ru, 'ru'));
  
    // Группировка стран по первой букве
    const groupedCountries = countries.reduce((acc, country) => {
      const firstLetter = country.name.ru[0].toUpperCase();
      if (!acc[firstLetter]) {
        acc[firstLetter] = [];
      }
      acc[firstLetter].push(country);
      return acc;
    }, {});
  
    return groupedCountries;
}

const countriesData = config.tournaments;

const page = () => {
    const groupedCountries = sortAndGroupCountries(countriesData);
    return (
        <div className='country-list'>
            {Object.keys(groupedCountries).map(letter => (
                <div className='letter-items' key={letter}>
                    <h2 title={`Страны на букву "${letter}"`}>{letter}</h2>
                    <ul className='item'>
                        {groupedCountries[letter].map(country => (
                        <li key={country.code}>
                            <Image placeholder={'empty'} src={country.flag} title={country.name.ru} alt={'флаг ' + country.name.ru} width={25} height={15} />
                            <Link href={`/tournament/${country.name.en.replace(/\s+/g, '-').toLowerCase()}`}>{country.name.ru}</Link>
                        </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
};

export default page;