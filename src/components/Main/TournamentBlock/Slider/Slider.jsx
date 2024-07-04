import dynamic from 'next/dynamic';
import SliderContent from './SliderContent/SliderContent';
import './Slider.css';

// Динамический импорт компонента SliderClient с отключенным SSR
const SliderClient = dynamic(() => import('./SliderClient/SliderClient'), { ssr: false });

const Slider = () => {
    return (
        <div className="slider">
            <div className="swiper-container">
                <div className="swiper-wrapper">
                    <SliderContent />
                </div>
                <SliderClient />
            </div>
        </div>
    );
};

export default Slider;
