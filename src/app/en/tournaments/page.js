import Image from 'next/image';
import config from '../../../../public/conf.json';
import '@/app/tournaments/style.css';
import Link from 'next/link';

export const metadata = {
    title: 'All Football Tournaments – Complete List and Schedule',
    description: 'Explore the complete list of football tournaments, their schedules, and results. Find information on tournaments worldwide.',
    keywords: 'football tournaments, tournament schedule, global tournaments',
    openGraph: {
      type: 'website',
      title: 'All Football Tournaments – Complete List and Schedule',
      description: 'Explore the complete list of football tournaments, their schedules, and results. Find information on tournaments worldwide.'
    },
    twitter: {
      card: 'summary_large_image',
      title: 'All Football Tournaments – Complete List and Schedule',
      description: 'Explore the complete list of football tournaments, their schedules, and results. Find information on tournaments worldwide.'
    }
};

function sortAndGroupCountries(countries) {
    // Сортировка стран по английскому названию
    countries.sort((a, b) => a.name.en.localeCompare(b.name.en, 'en'));

    // Группировка стран по первой букве английского названия
    const groupedCountries = countries.reduce((acc, country) => {
      const firstLetter = country.name.en[0].toUpperCase();
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
                    <h2 title={`Countries starting with letter "${letter}"`}>{letter}</h2>
                    <ul className='item'>
                        {groupedCountries[letter].map(country => (
                        <li key={country.code}>
                            <Image placeholder={'empty'} src={country.flag} title={country.name.en} alt={'flag ' + country.name.en} width={25} height={15} />
                            <Link href={`/en/tournament/${country.name.en.replace(/\s+/g, '-').toLowerCase()}`}>{country.name.en}</Link>
                        </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
};

export default page;