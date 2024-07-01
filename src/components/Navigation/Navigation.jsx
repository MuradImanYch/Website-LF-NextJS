'use client'

import './Navigation.css';
import Image from 'next/image';
import logo from '../../../public/assets/ico/logo.webp';
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import config from '../../../public/conf.json';
import { useState } from 'react';
import { setFalse } from '../../redux/slices/navigation';

import signIn from '../../../public/assets/ico/sign-in-mob.webp';
import settings from '../../../public/assets/ico/settings-mob.png';
import arrowBottom from '../../../public/assets/ico/arrow-bottom.webp';

const Navigation = () => {
    const isToggled = useSelector(state => state.toggle.value);
    const dispatch = useDispatch();
    const CISTournaments = ["Армения", "Азербайджан", "Беларусь", "Эстония", "Грузия", "Казахстан", "Киргизия", "Латвия", "Литва", "Молдова", "Россия", "Таджикистан", "Туркменистан", "Украина", "Узбекистан"];
    const filteredCISTournaments = config.tournaments.filter(e => 
        CISTournaments.includes(e.name.ru)
    );
    const topTournaments = ['Англия', 'Испания', 'Италия', 'Германия', 'Франция', "Португалия", "Нидерланды", "Турция", "Бельгия"];
    const filteredTopTournaments = config.tournaments.filter(e => 
        topTournaments.includes(e.name.ru)
    );
    const otherTournaments = ['Европа', 'Мир'];
    const filteredOtherTournaments = config.tournaments.filter(e => 
        otherTournaments.includes(e.name.ru)
    );

    const [visibleSubMenus, setVisibleSubMenus] = useState({
        topTournaments: Array(filteredTopTournaments.length).fill(false),
        otherTournaments: Array(filteredOtherTournaments.length).fill(false),
        CISTournaments: Array(filteredCISTournaments.length).fill(false)
    });

    const toggleSubMenu = (category, index) => {
        setVisibleSubMenus(prev => ({
            ...prev,
            [category]: prev[category].map((isVisible, i) => (i === index ? !isVisible : isVisible))
        }));
    };

    return (
        <nav style={isToggled ? {left: '0'} : {left: '-100%'}}>
            <div className="wrap">
                <Link href={'/'}><Image className="logo" src={logo} width={60} alt="legfootball.com" title="Главная" /></Link>
                <div className='sign-in-settings'>
                    <div className='sign-in'><Link href="/login"><Image height={20} src={signIn} alt="Вход" title="Войти" /> <span>Войти</span></Link></div>
                    <div className="settings">
                        <Link href={'/settings'}><Image width={20} src={settings} alt='Настройки' title='Настройки' /></Link>
                    </div>
                </div>
                <h1>Актуальные новости, прямые трансляции матчей, результаты, расписание, турнирная таблица</h1>
                <ul>
                    <span className="nav-title">Популярные</span>
                    {filteredTopTournaments.map((e, i) => {
                        let countryPathname = `/tournament/${e.name.en.replace(/\s+/g, '-').toLowerCase()}`;
                        return <li key={e.code}>
                            <div className="country-item">
                                <Link onClick={() => dispatch(setFalse())} href={countryPathname}>
                                    <Image src={e.flag} width={22} height={16} alt={'флаг ' + e.name.ru} title={e.name.ru} />
                                    {e.name.ru}
                                </Link>
                                <button onClick={() => toggleSubMenu('topTournaments', i)}>
                                    <Image width={12} src={arrowBottom} alt='Стрелка' title='Развернуть' />
                                </button>
                            </div>
                            <ul className="sub-menu" style={{ display: visibleSubMenus.topTournaments[i] ? 'block' : 'none' }}>
                                {e.leagues.map(e => {
                                    return <li key={e.id}><Link onClick={() => dispatch(setFalse())} href={`${countryPathname}/${e.name.en.replace('.', '').replace('-', '').replace(/\s+/g, '-').toLowerCase().replace('ü', 'u').replace('ə', 'a').replace('ö', 'o').replace('ğ', 'gh').replace('ı', 'i').replace('ç', 'c').replace('ç', 'c').replace('ã', 'a').replace('ş', 's').replace('ó', 'o').replace('ú', 'u').replace('é', 'e').replace('ý', 'y').replace('/', '-').replace('\'', '').replace('--', '')}`}><Image src={e.logo} width={17} height={17} alt={'лого ' + e.name.ru} title={e.name.ru} /> {e.name.ru}</Link></li>
                                })}
                            </ul>
                        </li>
                    })}
                    <span className="nav-title">ДРУГИЕ</span>
                    {filteredOtherTournaments.map((e, i) => {
                        let countryPathname = `/tournament/${e.name.en.replace(/\s+/g, '-').toLowerCase()}`;
                        return <li key={e.code}>
                            <div className="country-item">
                                <Link onClick={() => dispatch(setFalse())} href={countryPathname}>
                                    <Image src={e.flag} width={22} height={16} alt={'флаг ' + e.name.ru} title={e.name.ru} />
                                    {e.name.ru}
                                </Link>
                                <button onClick={() => toggleSubMenu('otherTournaments', i)}>
                                    <Image width={12} src={arrowBottom} alt='Стрелка' title='Развернуть' />
                                </button>
                            </div>
                            <ul className="sub-menu" style={{ display: visibleSubMenus.otherTournaments[i] ? 'block' : 'none' }}>
                                {e.leagues.map(e => {
                                    return <li key={e.id}><Link onClick={() => dispatch(setFalse())} href={`${countryPathname}/${e.name.en.replace('.', '').replace('-', '').replace(/\s+/g, '-').toLowerCase().replace('ü', 'u').replace('ə', 'a').replace('ö', 'o').replace('ğ', 'gh').replace('ı', 'i').replace('ç', 'c').replace('ç', 'c').replace('ã', 'a').replace('ş', 's').replace('ó', 'o').replace('ú', 'u').replace('é', 'e').replace('ý', 'y').replace('/', '-').replace('\'', '')}`}><Image src={e.logo} width={17} height={17} alt={'лого ' + e.name.ru} title={e.name.ru} /> {e.name.ru}</Link></li>
                                })}
                            </ul>
                        </li>
                    })}
                    <span className="nav-title">СНГ</span>
                    {filteredCISTournaments.map((e, i) => {
                        let countryPathname = `/tournament/${e.name.en.replace(/\s+/g, '-').toLowerCase()}`;
                        return <li key={e.code}>
                            <div className="country-item">
                                <Link onClick={() => dispatch(setFalse())} href={countryPathname}>
                                    <Image src={e.flag} width={22} height={16} alt={'флаг ' + e.name.ru} title={e.name.ru} />
                                    {e.name.ru}
                                </Link>
                                <button onClick={() => toggleSubMenu('CISTournaments', i)}>
                                    <Image width={12} src={arrowBottom} alt='Стрелка' title='Развернуть' />
                                </button>
                            </div>
                            <ul className="sub-menu" style={{ display: visibleSubMenus.CISTournaments[i] ? 'block' : 'none' }}>
                                {e.leagues.map(e => {
                                    return <li key={e.id}><Link onClick={() => dispatch(setFalse())} href={`${countryPathname}/${e.name.en.replace('.', '').replace('-', '').replace(/\s+/g, '-').toLowerCase().replace('ü', 'u').replace('ə', 'a').replace('ö', 'o').replace('ğ', 'gh').replace('ı', 'i').replace('ç', 'c').replace('ç', 'c').replace('ã', 'a').replace('ş', 's').replace('ó', 'o').replace('ú', 'u').replace('é', 'e').replace('ý', 'y').replace('/', '-').replace('\'', '')}`}><Image src={e.logo} width={17} height={17} alt={'лого ' + e.name.ru} title={e.name.ru} /> {e.name.ru}</Link></li>
                                })}
                            </ul>
                        </li>
                    })}
                    <Link href="/tournaments">Все турниры</Link>
                </ul>
            </div>
        </nav>
    );
};

export default Navigation;