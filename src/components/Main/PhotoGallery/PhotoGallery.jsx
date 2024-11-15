import Link from 'next/link';
import './PhotoGallery.css';
import Image from 'next/image';
// import translate from '@/libs/translate';
import config from '../../../../public/conf.json';

const PhotoGallery = ({news, placement, lang}) => {
    return (
        <section className='photo-gallery'>
            {placement === 'main' && <div className="head">
                <h2 className="name"><Link href={`${lang === 'en' ? 'en' : ''}/photo`}>{lang === 'en' ? 'Photogallery' : 'Фотогалерея'}</Link></h2>
            </div>}
            <div className="gallery">
                {placement === 'main' ? news && news.slice(-30).map(async e => (
                    <div key={e.id} className="item">
                        <Link target='_blank' href={e.img !== "undefined" && e.img !== 'fotos/bb/42/e243d59e6e78c095477f3bbeb2e3fe65662aa5e971d88797595920.jpg' ? e.img.includes('http') ? e.img : `${config.domain}/assets/news/${e.img}` : ''}><Image
                            src={e.img !== "undefined" && e.img !== 'fotos/bb/42/e243d59e6e78c095477f3bbeb2e3fe65662aa5e971d88797595920.jpg' ? e.img.includes('http') ? e.img : `${config.domain}/assets/news/${e.img}` : ''}
                            title={(lang === 'en' ? e.titleEn : e.title)?.split(' ').slice(0, 5).toString().replaceAll(',', ' ')} 
                            alt={(lang === 'en' ? e.titleEn : e.title)?.split(' ').slice(0, 5).toString().replaceAll(',', ' ')}
                            layout="responsive"
                            width={'100'}
                            height={'100'}
                            objectFit="cover"
                            placeholder={'empty'}
                        /></Link>
                    </div>
                )) : news && news.map(async e => (
                    <div key={e.id} className="item">
                        <Link target='_blank' href={e.img !== "undefined" && e.img !== 'fotos/bb/42/e243d59e6e78c095477f3bbeb2e3fe65662aa5e971d88797595920.jpg' ? e.img.includes('http') ? e.img : `${config.domain}/assets/news/${e.img}` : ''}><Image
                            src={e.img !== "undefined" && e.img !== 'fotos/bb/42/e243d59e6e78c095477f3bbeb2e3fe65662aa5e971d88797595920.jpg' ? e.img.includes('http') ? e.img : `${config.domain}/assets/news/${e.img}` : ''}
                            title={(lang === 'en' ? e.titleEn : e.title)?.split(' ').slice(0, 5).toString().replaceAll(',', ' ')} 
                            alt={(lang === 'en' ? e.titleEn : e.title)?.split(' ').slice(0, 5).toString().replaceAll(',', ' ')}
                            layout="responsive"
                            width={'100'}
                            height={'100'}
                            objectFit="cover"
                            placeholder={'empty'}
                        /></Link>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default PhotoGallery;