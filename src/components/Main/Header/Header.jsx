import Collage from './Collage/Collage';
import './Header.css';
import LiveBoard from './LiveBoard/LiveBoard';
import Slider from './Slider/Slider';


const Header = () => {
    return (
        <>
            <Slider />
            <Collage />
            <LiveBoard />
        </>
    );
};

export default Header;