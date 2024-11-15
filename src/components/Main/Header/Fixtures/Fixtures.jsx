import './Fixtures.css';
import Slider from './Slider/Slider';

const Fixtures = ({fixtures, lang}) => {
    return (
        <div className='mainFixtures'>
            <Slider lang={lang} fixtures={fixtures} />
        </div>
    );
};

export default Fixtures;