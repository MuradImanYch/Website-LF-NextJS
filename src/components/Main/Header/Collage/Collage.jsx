import './Collage.css';
import Image from 'next/image';
import Link from 'next/link';

const Collage = async () => {
    let news = [];

    await fetch('https://jsonplaceholder.typicode.com/photos')
    .then(response => response.json())
    .then(json => news = json)

    return (
        <div className="collage">
            <div id="item-0" className="collage-item">
                <Link href={'#'}><Image title='title' alt='alt' width={800} height={800} src={news[0]?.url} /></Link>
                <Link className='preview-title' href="#">{news[0]?.title}</Link>
            </div>
            <div id="item-1" className="collage-item">
                <Link href={'#'}><Image title='title' alt='alt' width={800} height={800} src={news[1]?.url} /></Link>
                <Link className='preview-title' href="#">{news[1]?.title}</Link>
            </div>
            <div id="item-2" className="collage-item">
                <Link href={'#'}><Image title='title' alt='alt' width={800} height={800} src={news[2]?.url} /></Link>
                <Link className='preview-title' href="#">{news[2]?.title}</Link>
            </div>
            <div id="item-3" className="collage-item">
                <Link href={'#'}><Image title='title' alt='alt' width={800} height={800} src={news[3]?.url} /></Link>
                <Link className='preview-title' href="#">{news[3]?.title}</Link>
            </div>
            <div id="item-4" className="collage-item">
                <Link href={'#'}><Image title='title' alt='alt' width={1000} height={1000} src={news[4]?.url} /></Link>
                <Link className='preview-title' href="#">{news[4]?.title}</Link>
            </div>
        </div>
    );
};

export default Collage;