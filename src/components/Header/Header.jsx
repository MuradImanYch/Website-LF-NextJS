import './Header.css';
import Image from 'next/image';
import Link from 'next/link';
import ad from '../../../public/assets/img/ad.png';
import Burger from './Burger/Burger';
import Nav2 from './Nav2/Nav2';

import logo from '../../../public/assets/ico/logo.webp';
import settings from '../../../public/assets/ico/settings.webp';
import signIn from '../../../public/assets/ico/sign-in.webp';

const Header = () => {
    return (
        <header>
            <div className="wrap">
                <div className="ad-banner">
                    <Image placeholder={'blur'} src={ad} alt="Банер" title="Банер" />
                </div>
                <div className='sign-in'><Link href="/login"><Image height={30} src={signIn} alt="Вход" title="Войти" /> <span>Войти</span></Link></div>
                <div className="settings">
                    <Link href={'/settings'}><Image src={settings} height={30} alt='Настройки' title='Настройки' /></Link>
                </div>
                <div className="socNet">
                    <a title="Вконтакте" href="https://vk.com/leg.football" target="__blank"><i className="fab fa-vk"></i></a>
                    <a title="Telegram" href="https://t.me/+zHJJw7xZ2300YjEy" target="__blank"><i className="fab fa-telegram-plane"></i></a>
                    <a title="Instagram" href="https://www.instagram.com/leg_football/" target="__blank"><i className="fab fa-instagram"></i></a>
                </div>
                <Link href={'/'}><Image className='logo' src={logo} width={40} alt="legfootball.com" title="Главная" /></Link>
                <Burger />
            </div>
            <Nav2 />
        </header>
    );
};

export default Header;