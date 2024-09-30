import './Collage.css';
import Image from 'next/image';
import Link from 'next/link';
import cyrillicToTranslit from 'cyrillic-to-translit-js';
import DateComponent from '@/components/News/Date/DateComponent';

const Collage = async ({news}) => {
    const reversedData = await news;

    return (
        <section className="collage">
            <article id="item-0" className="collage-item">
                <Link href={`/news/read/${reversedData && reversedData[0]?.id + '-' + cyrillicToTranslit().transform(reversedData && reversedData[0]?.title).replace(/[^a-zA-Z0-9\s]/g, '').replace(/\s+/g, '-').toLowerCase().replace(/-+$/, '')}`}><Image placeholder={'empty'} title={reversedData && reversedData[0]?.title.split(' ').slice(0, 5).toString().replaceAll(',', ' ')} alt={reversedData && reversedData[0]?.title.split(' ').slice(0, 5).toString().replaceAll(',', ' ')} width={800} height={800} src={reversedData && reversedData[0]?.img} /></Link>
                <h2><Link className='preview-title' href={`/news/read/${reversedData && reversedData[0]?.id + '-' + cyrillicToTranslit().transform(reversedData && reversedData[0]?.title).replace(/[^a-zA-Z0-9\s]/g, '').replace(/\s+/g, '-').toLowerCase().replace(/-+$/, '')}`}>{reversedData && reversedData[0]?.title}</Link></h2>
                <Link href={`/tags/search/${reversedData && reversedData[0]?.category}`} className="tag">#{reversedData && reversedData[0]?.category}</Link>
                <span className="date"><DateComponent dateProps={reversedData && reversedData[0].date} /></span>
            </article>
            <article id="item-1" className="collage-item">
                <Link href={`/news/read/${reversedData && reversedData[1]?.id + '-' + cyrillicToTranslit().transform(reversedData && reversedData[1]?.title).replace(/[^a-zA-Z0-9\s]/g, '').replace(/\s+/g, '-').toLowerCase().replace(/-+$/, '')}`}><Image placeholder={'empty'} title={reversedData && reversedData[1]?.title.split(' ').slice(0, 5).toString().replaceAll(',', ' ')} alt={reversedData && reversedData[1]?.title.split(' ').slice(0, 5).toString().replaceAll(',', ' ')} width={800} height={800} src={reversedData && reversedData[1]?.img} /></Link>
                <h2><Link className='preview-title' href={`/news/read/${reversedData && reversedData[1]?.id + '-' + cyrillicToTranslit().transform(reversedData && reversedData[1]?.title).replace(/[^a-zA-Z0-9\s]/g, '').replace(/\s+/g, '-').toLowerCase().replace(/-+$/, '')}`}>{reversedData && reversedData[1]?.title}</Link></h2>
                <Link href={`/tags/search/${reversedData && reversedData[1]?.category}`} className="tag">#{reversedData && reversedData[1]?.category}</Link>
                <span className="date"><DateComponent dateProps={reversedData && reversedData[1].date} /></span>
            </article>
            <article id="item-2" className="collage-item">
                <Link href={`/news/read/${reversedData && reversedData[2]?.id + '-' + cyrillicToTranslit().transform(reversedData && reversedData[2]?.title).replace(/[^a-zA-Z0-9\s]/g, '').replace(/\s+/g, '-').toLowerCase().replace(/-+$/, '')}`}><Image placeholder={'empty'} title={reversedData && reversedData[2]?.title.split(' ').slice(0, 5).toString().replaceAll(',', ' ')} alt={reversedData && reversedData[2]?.title.split(' ').slice(0, 5).toString().replaceAll(',', ' ')} width={800} height={800} src={reversedData && reversedData[2]?.img} /></Link>
                <h2><Link className='preview-title' href={`/news/read/${reversedData && reversedData[2]?.id + '-' + cyrillicToTranslit().transform(reversedData && reversedData[2]?.title).replace(/[^a-zA-Z0-9\s]/g, '').replace(/\s+/g, '-').toLowerCase().replace(/-+$/, '')}`}>{reversedData && reversedData[2]?.title}</Link></h2>
                <Link href={`/tags/search/${reversedData && reversedData[2]?.category}`} className="tag">#{reversedData && reversedData[2]?.category}</Link>
                <span className="date"><DateComponent dateProps={reversedData && reversedData[2].date} /></span>
            </article>
            <article id="item-3" className="collage-item">
                <Link href={`/news/read/${reversedData && reversedData[3]?.id + '-' + cyrillicToTranslit().transform(reversedData && reversedData[3]?.title).replace(/[^a-zA-Z0-9\s]/g, '').replace(/\s+/g, '-').toLowerCase().replace(/-+$/, '')}`}><Image placeholder={'empty'} title={reversedData && reversedData[3]?.title.split(' ').slice(0, 5).toString().replaceAll(',', ' ')} alt={reversedData && reversedData[3]?.title.split(' ').slice(0, 5).toString().replaceAll(',', ' ')} width={800} height={800} src={reversedData && reversedData[3]?.img} /></Link>
                <h2><Link className='preview-title' href={`/news/read/${reversedData && reversedData[3]?.id + '-' + cyrillicToTranslit().transform(reversedData && reversedData[3]?.title).replace(/[^a-zA-Z0-9\s]/g, '').replace(/\s+/g, '-').toLowerCase().replace(/-+$/, '')}`}>{reversedData && reversedData[3]?.title}</Link></h2>
                <Link href={`/tags/search/${reversedData && reversedData[3]?.category}`} className="tag">#{reversedData && reversedData[3]?.category}</Link>
                <span className="date"><DateComponent dateProps={reversedData && reversedData[3].date} /></span>
            </article>
            <article id="item-4" className="collage-item">
                <Link href={`/news/read/${reversedData && reversedData[4]?.id + '-' + cyrillicToTranslit().transform(reversedData && reversedData[4]?.title).replace(/[^a-zA-Z0-9\s]/g, '').replace(/\s+/g, '-').toLowerCase().replace(/-+$/, '')}`}><Image placeholder={'empty'} title={reversedData && reversedData[4]?.title.split(' ').slice(0, 5).toString().replaceAll(',', ' ')} alt={reversedData && reversedData[4]?.title.split(' ').slice(0, 5).toString().replaceAll(',', ' ')} width={800} height={800} src={reversedData && reversedData[4]?.img} /></Link>
                <h2><Link className='preview-title' href={`/news/read/${reversedData && reversedData[4]?.id + '-' + cyrillicToTranslit().transform(reversedData && reversedData[4]?.title).replace(/[^a-zA-Z0-9\s]/g, '').replace(/\s+/g, '-').toLowerCase().replace(/-+$/, '')}`}>{reversedData && reversedData[4]?.title}</Link></h2>
                <Link href={`/tags/search/${reversedData && reversedData[4]?.category}`} className="tag">#{reversedData && reversedData[4]?.category}</Link>
                <span className="date"><DateComponent dateProps={reversedData && reversedData[4].date} /></span>
            </article>
        </section>
    );
};

export default Collage;