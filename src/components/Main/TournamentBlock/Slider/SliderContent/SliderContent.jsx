import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const SliderContent = async () => {
    let news = [];

    await fetch('https://jsonplaceholder.typicode.com/photos')
    .then(response => response.json())
    .then(json => news = json)
    
    return (
        <>
            {news.slice(200, 205).map((e, i) => {
                return <div className="swiper-slide" key={i}>
                    <Link href={'#'}><Image placeholder={'empty'} title='title' alt='alt' width={800} height={800} src={e.url} /></Link>
                    <Link className='preview-title' href="#">{e.title}</Link>
                </div>
            })}
        </>
    );
};

export default SliderContent;