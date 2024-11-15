'use client'

import './Navigation.css';
import Image from 'next/image';
import logo from '../../../public/assets/ico/logo.webp';
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import config from '../../../public/conf.json';
import { useState, useEffect } from 'react';
import { setFalse } from '../../redux/slices/navigation';
import { setString } from '@/redux/slices/url';

import signIn from '../../../public/assets/ico/sign-in-mob.webp';
import settings from '../../../public/assets/ico/settings-mob.png';
import arrowBottom from '../../../public/assets/ico/arrow-bottom.webp';
import H1 from './H1/H1';
import { usePathname } from 'next/navigation';
import LangSwitcher from './LangSwitcher/LangSwitcher';

const Navigation = () => {
    const pathname = usePathname();
    const isToggled = useSelector(state => state.toggle.value);
    const dispatch = useDispatch();
    const CISTournaments = config.CISTournaments;
    const filteredCISTournaments = config.tournaments.filter(e => 
        CISTournaments.includes(e.name.ru)
    );
    const topTournaments = config.topTournaments;
    const filteredTopTournaments = config.tournaments.filter(e => 
        topTournaments.includes(e.name.ru)
    );
    const otherTournaments = config.otherTournaments;
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

    useEffect(() => {
        const logoElement = document.querySelector('body > div > div > header > div.wrap > a > img');
        if (logoElement) {
          logoElement.addEventListener('click', () => {
            dispatch(setFalse());
          });
        }
      }, []);

      const handleClick = () => { // handle click for closing nav mobile
        dispatch(setFalse());
      };

      !pathname.includes('/news/read') && dispatch(setString(null)); // reset our news url states

    return (
        <nav style={isToggled ? {left: '0'} : {left: '-100%'}}>
            <div className="wrap">
                <Link href={pathname.startsWith('/en') ? '/en' : '/'}><Image placeholder={'empty'} className="logo" src={logo} width={60} alt="legfootball.com" title={pathname.startsWith('/en') ? 'Home' : 'Главная'} /></Link>
                <LangSwitcher onClick={handleClick} />
                <div className='sign-in-settings'>
                    <div className='sign-in'><Link onClick={() => dispatch(setFalse())} href={pathname.startsWith('/en') ? '/en/login' : "/login"}><Image placeholder={'empty'} height={20} src={signIn} alt={pathname.startsWith('/en') ? 'Sign In' : 'Войти'} title={pathname.startsWith('/en') ? 'Sign In' : 'Войти'} /> <span>{pathname.startsWith('/en') ? 'Sign In' : 'Войти'}</span></Link></div>
                    <div className="settings">
                        <Link onClick={() => dispatch(setFalse())} href={pathname.startsWith('/en') ? '/en/settings' : '/settings'}><Image placeholder={'empty'} width={20} src={settings} alt={pathname.startsWith('/en') ? 'Settings' : 'Настройки'} title={pathname.startsWith('/en') ? 'Settings' : 'Настройки'} /></Link>
                    </div>
                </div>
                <H1 />
                <ul>
                    <h4 className="nav-title">{pathname.startsWith('/en') ? 'Popular' : 'Популярные'}</h4>
                    {filteredTopTournaments.map((e, i) => {
                        let countryPathname = `/tournament/${e.name.en.replace(/\s+/g, '-').toLowerCase()}`;
                        return <li key={e.code}>
                            <div className="country-item">
                                <Link onClick={() => dispatch(setFalse())} href={pathname.startsWith('/en') ? '/en' + countryPathname : countryPathname}>
                                    <Image placeholder={'empty'} src={e.flag} width={22} height={16} alt={'флаг ' + pathname.startsWith('/en') ? e.name.en : e.name.ru} title={pathname.startsWith('/en') ? e.name.en : e.name.ru} />
                                    {pathname.startsWith('/en') ? e.name.en : e.name.ru}
                                </Link>
                                <button onClick={() => toggleSubMenu('topTournaments', i)}>
                                    <Image placeholder={'empty'} width={12} src={arrowBottom} alt={pathname.startsWith('/en') ? 'Arrow' : 'Стрелка'} title={pathname.startsWith('/en') ? 'Expand' : 'Развернуть'} />
                                </button>
                            </div>
                            <ul className="sub-menu" style={{ display: visibleSubMenus.topTournaments[i] ? 'block' : 'none' }}>
                                {e.leagues.map(e => {
                                    return <li key={e.id}><Link onClick={() => dispatch(setFalse())} href={`${pathname.startsWith('/en') ? '/en' + countryPathname : countryPathname}/${e.name.en.replaceAll('.', '').replaceAll('-', '').replaceAll(/\s+/g, '-').toLowerCase().replaceAll('ü', 'u').replaceAll('ə', 'a').replaceAll('ö', 'o').replaceAll('ğ', 'gh').replaceAll('ı', 'i').replaceAll('ç', 'c').replaceAll('ç', 'c').replaceAll('ã', 'a').replaceAll('ş', 's').replaceAll('ó', 'o').replaceAll('ú', 'u').replaceAll('é', 'e').replaceAll('ý', 'y').replaceAll('ï', 'i').replaceAll('í', 'i').replaceAll('/', '-').replaceAll('\'', '').replaceAll('--', '')}`}><Image placeholder={'empty'} src={e.logo} width={17} height={17} alt={'logo ' + pathname.startsWith('/en') ? e.name.en : e.name.ru} title={pathname.startsWith('/en') ? e.name.en : e.name.ru} /> {pathname.startsWith('/en') ? e.name.en : e.name.ru}</Link></li>
                                })}
                            </ul>
                        </li>
                    })}
                    <h4 className="nav-title">{pathname.startsWith('/en') ? "Continental" : "Континентальные"}</h4>
                    {filteredOtherTournaments.map((e, i) => {
                        let countryPathname = `/tournament/${e.name.en.replace(/\s+/g, '-').toLowerCase()}`;
                        return <li key={e.code}>
                            <div className="country-item">
                                <Link onClick={() => dispatch(setFalse())} href={pathname.startsWith('/en') ? '/en' + countryPathname : countryPathname}>
                                    <Image placeholder={'empty'} src={e.flag} width={22} height={16} alt={'флаг ' + pathname.startsWith('/en') ? e.name.en : e.name.ru} title={pathname.startsWith('/en') ? e.name.en : e.name.ru} />
                                    {pathname.startsWith('/en') ? e.name.en : e.name.ru}
                                </Link>
                                <button onClick={() => toggleSubMenu('otherTournaments', i)}>
                                    <Image placeholder={'empty'} width={12} src={arrowBottom} alt={pathname.startsWith('/en') ? 'Arrow' : 'Стрелка'} title={pathname.startsWith('/en') ? 'Expand' : 'Развернуть'} />
                                </button>
                            </div>
                            <ul className="sub-menu" style={{ display: visibleSubMenus.otherTournaments[i] ? 'block' : 'none' }}>
                                {e.leagues.map(e => {
                                    return <li key={e.id}><Link onClick={() => dispatch(setFalse())} href={`${pathname.startsWith('/en') ? '/en' + countryPathname : countryPathname}/${e.name.en.replaceAll('.', '').replaceAll('-', '').replaceAll(/\s+/g, '-').toLowerCase().replaceAll('ü', 'u').replaceAll('ə', 'a').replaceAll('ö', 'o').replaceAll('ğ', 'gh').replaceAll('ı', 'i').replaceAll('ç', 'c').replaceAll('ç', 'c').replaceAll('ã', 'a').replaceAll('ş', 's').replaceAll('ó', 'o').replaceAll('ú', 'u').replaceAll('é', 'e').replaceAll('ý', 'y').replaceAll('ï', 'i').replaceAll('í', 'i').replaceAll('/', '-').replaceAll('\'', '')}`}><Image placeholder={'empty'} src={e.logo} width={17} height={17} alt={'logo ' + pathname.startsWith('/en') ? e.name.en : e.name.ru} title={pathname.startsWith('/en') ? e.name.en : e.name.ru} /> {pathname.startsWith('/en') ? e.name.en : e.name.ru}</Link></li>
                                })}
                            </ul>
                        </li>
                    })}
                    <h4 className="nav-title">{pathname.startsWith('/en') ? 'CIS' : 'СНГ'}</h4>
                    {filteredCISTournaments.map((e, i) => {
                        let countryPathname = `/tournament/${e.name.en.replace(/\s+/g, '-').toLowerCase()}`;
                        return <li key={e.code}>
                            <div className="country-item">
                                <Link onClick={() => dispatch(setFalse())} href={pathname.startsWith('/en') ? '/en' + countryPathname : countryPathname}>
                                    <Image placeholder={'empty'} src={e.flag} width={22} height={16} alt={'флаг ' + pathname.startsWith('/en') ? e.name.en : e.name.ru} title={pathname.startsWith('/en') ? e.name.en : e.name.ru} />
                                    {pathname.startsWith('/en') ? e.name.en : e.name.ru}
                                </Link>
                                <button onClick={() => toggleSubMenu('CISTournaments', i)}>
                                    <Image placeholder={'empty'} width={12} src={arrowBottom} alt={pathname.startsWith('/en') ? 'Arrow' : 'Стрелка'} title={pathname.startsWith('/en') ? 'Expand' : 'Развернуть'} />
                                </button>
                            </div>
                            <ul className="sub-menu" style={{ display: visibleSubMenus.CISTournaments[i] ? 'block' : 'none' }}>
                                {e.leagues.map(e => {
                                    return <li key={e.id}><Link onClick={() => dispatch(setFalse())} href={`${pathname.startsWith('/en') ? '/en' + countryPathname : countryPathname}/${e.name.en.replaceAll('.', '').replaceAll('-', '').replaceAll(/\s+/g, '-').toLowerCase().replaceAll('ü', 'u').replaceAll('ə', 'a').replaceAll('ö', 'o').replaceAll('ğ', 'gh').replaceAll('ı', 'i').replaceAll('ç', 'c').replaceAll('ç', 'c').replaceAll('ã', 'a').replaceAll('ş', 's').replaceAll('ó', 'o').replaceAll('ú', 'u').replaceAll('é', 'e').replaceAll('ý', 'y').replaceAll('ï', 'i').replaceAll('á', 'a').replaceAll('ø', 'o').replaceAll('í', 'i').replaceAll('/', '-').replaceAll('\'', '')}`}><Image placeholder={'empty'} src={e.logo} width={17} height={17} alt={'logo ' + pathname.startsWith('/en') ? e.name.en : e.name.ru} title={pathname.startsWith('/en') ? e.name.en : e.name.ru} /> {pathname.startsWith('/en') ? e.name.en : e.name.ru}</Link></li>
                                })}
                            </ul>
                        </li>
                    })}
                    <Link href={pathname.startsWith('/en') ? "/en/tournaments" : "/tournaments"} onClick={() => dispatch(setFalse())}>{pathname.startsWith('/en') ? 'All tournaments' : 'Все турниры'}</Link>
                </ul>
            </div>
        </nav>
    );
};

export default Navigation;