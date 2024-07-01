'use client'

import './Slider.css';
import SlickSlider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

const Slider = () => {
    const[img, setImg] = useState([]);
    const sliderRef = useRef(null);

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/photos')
          .then(response => response.json())
          .then(json => setImg(json))
    }, []);

    const settings = {
        dots: false,
        infinite: true,
        speed: 700,
        slidesToShow: 1,
        slidesToScroll: 1,
        swipe: true,
        autoplay: true,
        autoplaySpeed: 5000,
        arrows: false,
        pauseOnHover: true,
        fade: true,
        lazyLoad: true,
        beforeChange: (current, next) => {
            if (sliderRef.current) {
                sliderRef.current.slickPause();
            }
        },
        afterChange: (current) => {
            if (sliderRef.current) {
                sliderRef.current.slickPlay();
            }
        }
    };

    return (
            <div className="main-slider-container">
                <SlickSlider ref={sliderRef} {...settings}>
                    {img.slice(0, 5).map((e, i) => {
                        return <div key={i} className="slider-item">
                            <Link href={'#'}><Image title='title' alt='alt' width={800} height={800} src={e.url} /></Link>
                            <Link className='preview-title' href="#">{e.title}</Link>
                        </div>
                    })}
                </SlickSlider>
            </div>
    );
};

export default Slider;