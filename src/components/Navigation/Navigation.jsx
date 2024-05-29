'use client'

import './Navigation.css';
import Image from 'next/image';
import logo from '../../../public/assets/ico/logo.webp';
import Link from 'next/link';
import signIn from '../../../public/assets/ico/sign-in-mob.webp';
import settings from '../../../public/assets/ico/settings-mob.png';
import { useSelector } from 'react-redux';

const Navigation = () => {
    const isToggled = useSelector(state => state.toggle.value);

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
            </div>
        </nav>
    );
};

export default Navigation;