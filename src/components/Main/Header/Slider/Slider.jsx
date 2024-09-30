'use client'

import './Slider.css';
import SlickSlider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import cyrillicToTranslit from 'cyrillic-to-translit-js';

const Slider = ({mobileNews}) => {
    const[news, setNews] = useState([]);
    const sliderRef = useRef(null);

    useEffect(() => {
        setNews(mobileNews);
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
            <section className="main-slider-container">
                <SlickSlider ref={sliderRef} {...settings}>
                    {news && news.slice(0, 5).map(e => {
                        let date = new Date(e.date);
                        let day = String(date.getDate()).length < 2 ? '0' + String(date.getDate()) : String(date.getDate());
                        let month = String(date.getMonth() + 1).length < 2 ? '0' + String(date.getMonth() + 1) : String(date.getMonth() + 1);
                        let year = date.getFullYear();
                        let hours = String(date.getHours()).length < 2 ? '0' + String(date.getHours()) : String(date.getHours());
                        let minutes = String(date.getMinutes()).length < 2 ? '0' + String(date.getMinutes()) : String(date.getMinutes());

                        return <article key={e.id} className="slider-item">
                            <Link href={`/news/read/${e.id + '-' + cyrillicToTranslit().transform(e.title).replace(/[^a-zA-Z0-9\s]/g, '').replace(/\s+/g, '-').toLowerCase().replace(/-+$/, '')}`}><Image placeholder={'empty'} title={e.title.split(' ').slice(0, 5).toString().replaceAll(',', ' ')} alt={e.title.split(' ').slice(0, 5).toString().replaceAll(',', ' ')} width={800} height={800} src={e.img} /></Link>
                            <h2><Link className='preview-title' href={`/news/read/${e.id + '-' + cyrillicToTranslit().transform(e.title).replace(/[^a-zA-Z0-9\s]/g, '').replace(/\s+/g, '-').toLowerCase().replace(/-+$/, '')}`}>{e.title}</Link></h2>
                            <Link href={'/tags/search/' + e.category} className="tag">#{e.category}</Link>
                            <span className="date">{day + '-' + month + '-' + year + ' | ' + hours + ':' + minutes}</span>
                        </article>
                    })}
                </SlickSlider>
            </section>
    );
};

export default Slider;