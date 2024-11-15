'use client'

import { useEffect } from 'react';
import Swiper from 'swiper/bundle';
import 'swiper/swiper-bundle.css';

const SliderClient = () => {
    useEffect(() => {
        new Swiper('.tournamentBlock .swiper-container', {
            autoplay: {delay: 5000, disableOnInteraction: true},
            slidesPerView: 1,
            breakpoints: {
                768: {
                    slidesPerView: 2.2,
                },
                1024: {
                    slidesPerView: 1,
                }
            }
        });
    }, []);

    return null;
};

export default SliderClient;