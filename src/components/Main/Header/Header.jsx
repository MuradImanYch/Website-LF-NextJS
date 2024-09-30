import Collage from './Collage/Collage';
import './Header.css';
import LiveBoard from './LiveBoard/LiveBoard';
import Slider from './Slider/Slider';


const Header = ({news}) => {
    return (
        <>
            <Slider mobileNews={news} />
            <Collage news={news} />
            <LiveBoard />
        </>
    );
};

export default Header;