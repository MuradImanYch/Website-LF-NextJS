'use client'

import { useEffect } from 'react';
import Swiper from 'swiper/bundle';
import 'swiper/swiper-bundle.css';

const SliderClient = () => {
    useEffect(() => {
        new Swiper('.swiper-container', {
            slidesPerView: 1,
            breakpoints: {
                768: {
                    slidesPerView: 2,
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