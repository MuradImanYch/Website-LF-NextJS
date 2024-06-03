'use client'

import './Navigation.css';
import Image from 'next/image';
import logo from '../../../public/assets/ico/logo.webp';
import Link from 'next/link';
import signIn from '../../../public/assets/ico/sign-in-mob.webp';
import settings from '../../../public/assets/ico/settings-mob.png';
import { useSelector } from 'react-redux';
import config from '@/conf.json';

const Navigation = () => {
    const isToggled = useSelector(state => state.toggle.value);
    const CISTournaments = ["Армения", "Азербайджан", "Беларусь", "Эстония", "Грузия", "Казахстан", "Киргизия", "Латвия", "Литва", "Молдова", "Россия", "Таджикистан", "Туркменистан", "Украина", "Узбекистан"];
    const filteredCISTournaments = config.tournaments.filter(e => 
        CISTournaments.includes(e.name.ru)
    );
    const topTournaments = ['Англия', 'Испания', 'Италия', 'Германия', 'Франция', "Португалия", "Нидерланды", "Турция", "Бельгия"];
    const filteredTopTournaments = config.tournaments.filter(e => 
        topTournaments.includes(e.name.ru)
    );

    return (
        <nav style={isToggled ? {left: '0'} : {left: '-100%'}}>
            <div className="wrap">
                <Link href={'/'}><Image className="logo" src={logo} width={60} alt="legfootball.com" title="Главная" /></Link>
                <div className='sign-in-settings'>
                    <div className='sign-in'><Link href="#"><Image height={20} src={signIn} alt="Вход" title="Войти" /> <span>Войти</span></Link></div>
                    <div className="settings">
                        <Link href={'#'}><Image width={20} src={settings} alt='Настройки' title='Настройки' /></Link>
                    </div>
                </div>
                <h1>Актуальные новости, прямые трансляции матчей, результаты, расписание, турнирная таблица</h1>
                <ul>
                    <span className="nav-title">Популярные</span>
                    {filteredTopTournaments.map((e, i) => (
                        <li key={'country' + i}>
                            <Link href={'#'}>
                                <Image src={e.flag} width={22} height={16} alt={'флаг ' + e.name.ru} title={e.name.ru} />
                                {e.name.ru}
                            </Link>
                        </li>
                    ))}
                    <span className="nav-title">СНГ</span>
                    {filteredCISTournaments.map((e, i) => (
                        <li key={'country' + i}>
                            <Link href={'#'}>
                                <Image src={e.flag} width={22} height={20} alt={'флаг ' + e.name.ru} title={e.name.ru} />
                                {e.name.ru}
                            </Link>
                        </li>
                    ))}
                    <Link href="#">Все турниры</Link>
                </ul>
            </div>
        </nav>
    );
};

export default Navigation;