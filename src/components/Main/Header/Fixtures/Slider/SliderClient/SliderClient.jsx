'use client'

import { useEffect } from 'react';
import Swiper from 'swiper/bundle';
import 'swiper/swiper-bundle.css';

const SliderClient = () => {
    useEffect(() => {
        new Swiper('.mainFixtures .swiper-container', {
            autoplay: {delay: 1},
            slidesPerView: 1.7,
            freeMode: true,
            speed: 5000,
            breakpoints: {
                768: {
                    slidesPerView: 4.2,
                },
                1024: {
                    slidesPerView: 5.2,
                }
            }
        });
    }, []);

    return null;
};

export default SliderClient;