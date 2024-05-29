import './Header.css';
import logo from '../../../public/assets/ico/logo.webp';
import Image from 'next/image';
import Link from 'next/link';
import signIn from '../../../public/assets/ico/sign-in.webp';
import ad from '../../../public/assets/img/ad.png';
import Burger from './Burger/Burger';
import settings from '../../../public/assets/ico/settings.webp';
import Nav2 from './Nav2/Nav2';

const Header = () => {
    return (
        <header>
            <div className="wrap">
                <div className="ad-banner">
                    <Image placeholder={'blur'} src={ad} alt="Банер" title="Банер" />
                </div>
                <div className='sign-in'><Link href="#"><Image height={30} src={signIn} alt="Вход" title="Войти" /> <span>Войти</span></Link></div>
                <div className="settings">
                    <Image src={settings} height={30} alt='Настройки' title='Настройки' />
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