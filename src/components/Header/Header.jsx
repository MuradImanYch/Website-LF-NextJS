'use client'

import './Header.css';
import Image from 'next/image';
import Link from 'next/link';
import ad from '../../../public/assets/img/ad.png';
import Burger from './Burger/Burger';
import Nav2 from './Nav2/Nav2';

import logo from '../../../public/assets/ico/logo.webp';
import settings from '../../../public/assets/ico/settings.webp';
import signIn from '../../../public/assets/ico/sign-in.webp';
import { usePathname } from 'next/navigation';

const Header = () => {
    const pathname = usePathname();

    return (
        <header>
            <div className="wrap">
                <div className="ad-banner">
                    <Image placeholder={'empty'} src={ad} alt={"Банер"} title={"Банер"} />
                </div>
                <div className='sign-in'><Link href={pathname.startsWith('/en') ? '/en/login' : "/login"}><Image placeholder={'empty'} height={30} src={signIn} alt={pathname.startsWith('/en') ? 'Sign In' : 'Войти'} title={pathname.startsWith('/en') ? 'Sign In' : 'Войти'} /> <span>{pathname.startsWith('/en') ? 'Sign In' : 'Войти'}</span></Link></div>
                <div className="settings">
                    <Link href={pathname.startsWith('/en') ? '/en/settings' : '/settings'}><Image placeholder={'empty'} src={settings} height={30} alt={pathname.startsWith('/en') ? 'Settings' : 'Настройки'} title={pathname.startsWith('/en') ? 'Settings' : 'Настройки'}  /></Link>
                </div>
                <div className="socNet">
                    <a title={pathname.startsWith('/en') ? 'Vkontakte' : 'Вконтакте'} href="https://vk.com/leg.football" target="__blank"><i className="fab fa-vk"></i></a>
                    <a title={pathname.startsWith('/en') ? 'Telegram' : 'Телеграм'} href="https://t.me/+zHJJw7xZ2300YjEy" target="__blank"><i className="fab fa-telegram-plane"></i></a>
                    <a title={pathname.startsWith('/en') ? 'Instagram' : 'Инстаграм'} href="https://www.instagram.com/leg_football/" target="__blank"><i className="fab fa-instagram"></i></a>
                </div>
                <Link href={pathname.startsWith('/en') ? '/en' : '/'}><Image placeholder={'empty'} className='logo' src={logo} width={40} alt="legfootball.com" title={pathname.startsWith('/en') ? 'Main' : 'Главная'} /></Link>
                <Burger />
            </div>
            <Nav2 />
        </header>
    );
};

export default Header;