import Fixtures from './Fixtures/Fixtures';
import Collage from './Collage/Collage';
import './Header.css';
import Slider from './Slider/Slider';


const Header = ({news, lang, fixtures}) => {
    return (
        <>
            <Slider lang={lang} mobileNews={news} />
            <Collage news={news} lang={lang} />
            <Fixtures lang={lang} fixtures={fixtures} />
        </>
    );
};

export default Header;