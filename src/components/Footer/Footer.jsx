import './Footer.css';
import Image from 'next/image';
import logo from '../../../public/assets/ico/logo.webp';

const Footer = () => {
    const date = new Date();

    return (
        <footer>
            <div className="wrap">
                <Image placeholder={'empty'} src={logo} width={'60'} height={'30'} alt={'logo'} />
                <span>© 2023 - {date.getFullYear()} Legendary Football</span>
            </div>
        </footer>
    );
};

export default Footer;