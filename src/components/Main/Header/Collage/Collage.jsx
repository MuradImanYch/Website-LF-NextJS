import './Collage.css';
import Image from 'next/image';
import Link from 'next/link';

const Collage = async () => {
    let news = [];

    async function fetchNews() {
        try {
          const res = await fetch('http://78.46.254.73:8080/news/allNews');
          const data = await res.json();
          
          return data;
        } catch (err) {
          console.error(err);
        }
    }

    const data = await fetchNews();
    const reversedData = await data.reverse();

    return (
        <div className="collage">
            <div id="item-0" className="collage-item">
                <Link href={'#'}><Image placeholder={'empty'} title='title' alt='alt' width={800} height={800} src={reversedData[0].img} /></Link>
                <Link className='preview-title' href="#">{reversedData[0].title}</Link>
            </div>
            <div id="item-1" className="collage-item">
                <Link href={'#'}><Image placeholder={'empty'} title='title' alt='alt' width={800} height={800} src={reversedData[1].img} /></Link>
                <Link className='preview-title' href="#">{reversedData[1].title}</Link>
            </div>
            <div id="item-2" className="collage-item">
                <Link href={'#'}><Image placeholder={'empty'} title='title' alt='alt' width={800} height={800} src={reversedData[2].img} /></Link>
                <Link className='preview-title' href="#">{reversedData[2].title}</Link>
            </div>
            <div id="item-3" className="collage-item">
                <Link href={'#'}><Image placeholder={'empty'} title='title' alt='alt' width={800} height={800} src={reversedData[3].img} /></Link>
                <Link className='preview-title' href="#">{reversedData[3].title}</Link>
            </div>
            <div id="item-4" className="collage-item">
                <Link href={'#'}><Image placeholder={'empty'} title='title' alt='alt' width={800} height={800} src={reversedData[4].img} /></Link>
                <Link className='preview-title' href="#">{reversedData[4].title}</Link>
            </div>
        </div>
    );
};

export default Collage;