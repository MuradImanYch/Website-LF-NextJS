'use client';

import './Slider.css';
import SlickSlider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
// import Translation from '@/components/Translation/Translation';
import { usePathname } from 'next/navigation';
import config from '../../../../../public/conf.json';

const Slider = ({ mobileNews, lang }) => {
    const [news, setNews] = useState([]);
    const sliderRef = useRef(null);
    const pathname = usePathname();

    useEffect(() => {
        setNews(mobileNews);
    }, [mobileNews]);

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

                    return (
                        <article key={e.id} className="slider-item">
                            <Link href={pathname.startsWith('/en') ? `/en/news/read/${e.urlEn}` : `/news/read/${e.url}`}>
                                <Image
                                    placeholder={'empty'}
                                    title={e.title.split(' ').slice(0, 5).toString().replaceAll(',', ' ')}
                                    alt={e.title.split(' ').slice(0, 5).toString().replaceAll(',', ' ')}
                                    width={800}
                                    height={800}
                                    src={e.img !== "undefined" && e.img !== 'fotos/bb/42/e243d59e6e78c095477f3bbeb2e3fe65662aa5e971d88797595920.jpg' ? e.img.includes('http') ? e.img : `${config.domain}/assets/news/${e.img}` : ''}
                                />
                            </Link>
                            <h2>
                                <Link className='preview-title' href={pathname.startsWith('/en') ? `/en/news/read/${e.urlEn}` : `/news/read/${e.url}`}>
                                    {lang === 'en' ? e.titleEn : e.title}
                                </Link>
                            </h2>
                            <Link href={lang === 'en' ? `/en/search/${e.categoryEn}` : `/search/${e.category}`} className="tag">#{lang === 'en' ? e.categoryEn : e.category}</Link>
                            <span className="date">{day + '-' + month + '-' + year + ' | ' + hours + ':' + minutes}</span>
                        </article>
                    );
                })}
            </SlickSlider>
        </section>
    );
};

export default Slider;