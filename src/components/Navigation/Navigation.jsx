'use client'

import './Navigation.css';
import Image from 'next/image';
import logo from '../../../public/assets/ico/logo.webp';
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import config from '../../../public/conf.json';
import { useState, useEffect } from 'react';
import { setFalse } from '../../redux/slices/navigation';

import signIn from '../../../public/assets/ico/sign-in-mob.webp';
import settings from '../../../public/assets/ico/settings-mob.png';
import arrowBottom from '../../../public/assets/ico/arrow-bottom.webp';
import H1 from './H1/H1';

const Navigation = () => {
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

    return (
        <nav style={isToggled ? {left: '0'} : {left: '-100%'}}>
            <div className="wrap">
                <Link href={'/'}><Image placeholder={'empty'} className="logo" src={logo} width={60} alt="legfootball.com" title="Главная" /></Link>
                <div className='sign-in-settings'>
                    <div className='sign-in'><Link onClick={() => dispatch(setFalse())} href="/login"><Image placeholder={'empty'} height={20} src={signIn} alt="Вход" title="Войти" /> <span>Войти</span></Link></div>
                    <div className="settings">
                        <Link onClick={() => dispatch(setFalse())} href={'/settings'}><Image placeholder={'empty'} width={20} src={settings} alt='Настройки' title='Настройки' /></Link>
                    </div>
                </div>
                <H1 />
                <ul>
                    <h4 className="nav-title">Популярные</h4>
                    {filteredTopTournaments.map((e, i) => {
                        let countryPathname = `/tournament/${e.name.en.replace(/\s+/g, '-').toLowerCase()}`;
                        return <li key={e.code}>
                            <div className="country-item">
                                <Link onClick={() => dispatch(setFalse())} href={countryPathname}>
                                    <Image placeholder={'empty'} src={e.flag} width={22} height={16} alt={'флаг ' + e.name.ru} title={e.name.ru} />
                                    {e.name.ru}
                                </Link>
                                <button onClick={() => toggleSubMenu('topTournaments', i)}>
                                    <Image placeholder={'empty'} width={12} src={arrowBottom} alt='Стрелка' title='Развернуть' />
                                </button>
                            </div>
                            <ul className="sub-menu" style={{ display: visibleSubMenus.topTournaments[i] ? 'block' : 'none' }}>
                                {e.leagues.map(e => {
                                    return <li key={e.id}><Link onClick={() => dispatch(setFalse())} href={`${countryPathname}/${e.name.en.replaceAll('.', '').replaceAll('-', '').replaceAll(/\s+/g, '-').toLowerCase().replaceAll('ü', 'u').replaceAll('ə', 'a').replaceAll('ö', 'o').replaceAll('ğ', 'gh').replaceAll('ı', 'i').replaceAll('ç', 'c').replaceAll('ç', 'c').replaceAll('ã', 'a').replaceAll('ş', 's').replaceAll('ó', 'o').replaceAll('ú', 'u').replaceAll('é', 'e').replaceAll('ý', 'y').replaceAll('ï', 'i').replaceAll('í', 'i').replaceAll('/', '-').replaceAll('\'', '').replaceAll('--', '')}`}><Image placeholder={'empty'} src={e.logo} width={17} height={17} alt={'лого ' + e.name.ru} title={e.name.ru} /> {e.name.ru}</Link></li>
                                })}
                            </ul>
                        </li>
                    })}
                    <h4 className="nav-title">ДРУГИЕ</h4>
                    {filteredOtherTournaments.map((e, i) => {
                        let countryPathname = `/tournament/${e.name.en.replace(/\s+/g, '-').toLowerCase()}`;
                        return <li key={e.code}>
                            <div className="country-item">
                                <Link onClick={() => dispatch(setFalse())} href={countryPathname}>
                                    <Image placeholder={'empty'} src={e.flag} width={22} height={16} alt={'флаг ' + e.name.ru} title={e.name.ru} />
                                    {e.name.ru}
                                </Link>
                                <button onClick={() => toggleSubMenu('otherTournaments', i)}>
                                    <Image placeholder={'empty'} width={12} src={arrowBottom} alt='Стрелка' title='Развернуть' />
                                </button>
                            </div>
                            <ul className="sub-menu" style={{ display: visibleSubMenus.otherTournaments[i] ? 'block' : 'none' }}>
                                {e.leagues.map(e => {
                                    return <li key={e.id}><Link onClick={() => dispatch(setFalse())} href={`${countryPathname}/${e.name.en.replaceAll('.', '').replaceAll('-', '').replaceAll(/\s+/g, '-').toLowerCase().replaceAll('ü', 'u').replaceAll('ə', 'a').replaceAll('ö', 'o').replaceAll('ğ', 'gh').replaceAll('ı', 'i').replaceAll('ç', 'c').replaceAll('ç', 'c').replaceAll('ã', 'a').replaceAll('ş', 's').replaceAll('ó', 'o').replaceAll('ú', 'u').replaceAll('é', 'e').replaceAll('ý', 'y').replaceAll('ï', 'i').replaceAll('í', 'i').replaceAll('/', '-').replaceAll('\'', '')}`}><Image placeholder={'empty'} src={e.logo} width={17} height={17} alt={'лого ' + e.name.ru} title={e.name.ru} /> {e.name.ru}</Link></li>
                                })}
                            </ul>
                        </li>
                    })}
                    <h4 className="nav-title">СНГ</h4>
                    {filteredCISTournaments.map((e, i) => {
                        let countryPathname = `/tournament/${e.name.en.replace(/\s+/g, '-').toLowerCase()}`;
                        return <li key={e.code}>
                            <div className="country-item">
                                <Link onClick={() => dispatch(setFalse())} href={countryPathname}>
                                    <Image placeholder={'empty'} src={e.flag} width={22} height={16} alt={'флаг ' + e.name.ru} title={e.name.ru} />
                                    {e.name.ru}
                                </Link>
                                <button onClick={() => toggleSubMenu('CISTournaments', i)}>
                                    <Image placeholder={'empty'} width={12} src={arrowBottom} alt='Стрелка' title='Развернуть' />
                                </button>
                            </div>
                            <ul className="sub-menu" style={{ display: visibleSubMenus.CISTournaments[i] ? 'block' : 'none' }}>
                                {e.leagues.map(e => {
                                    return <li key={e.id}><Link onClick={() => dispatch(setFalse())} href={`${countryPathname}/${e.name.en.replaceAll('.', '').replaceAll('-', '').replaceAll(/\s+/g, '-').toLowerCase().replaceAll('ü', 'u').replaceAll('ə', 'a').replaceAll('ö', 'o').replaceAll('ğ', 'gh').replaceAll('ı', 'i').replaceAll('ç', 'c').replaceAll('ç', 'c').replaceAll('ã', 'a').replaceAll('ş', 's').replaceAll('ó', 'o').replaceAll('ú', 'u').replaceAll('é', 'e').replaceAll('ý', 'y').replaceAll('ï', 'i').replaceAll('á', 'a').replaceAll('ø', 'o').replaceAll('í', 'i').replaceAll('/', '-').replaceAll('\'', '')}`}><Image placeholder={'empty'} src={e.logo} width={17} height={17} alt={'лого ' + e.name.ru} title={e.name.ru} /> {e.name.ru}</Link></li>
                                })}
                            </ul>
                        </li>
                    })}
                    <Link href="/tournaments" onClick={() => dispatch(setFalse())}>Все турниры</Link>
                </ul>
            </div>
        </nav>
    );
};

export default Navigation;