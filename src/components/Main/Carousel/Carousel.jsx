import Link from 'next/link';
import './Carousel.css';
import Slider from './Slider/Slider';

const Carousel = ({param}) => {
    return (
        <section className='carousel'>
            <div className="head">
                <h2 className='name'><Link href={param.url}>{param.name}</Link></h2>
            </div>

            <Slider param={param} />
        </section>
    );
};

export default Carousel;