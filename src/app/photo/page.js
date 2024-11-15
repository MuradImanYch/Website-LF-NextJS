import PhotoGallery from "@/components/Main/PhotoGallery/PhotoGallery";
import './style.css';
import config from '../../../public/conf.json';

export const metadata = {
  title: 'Фотогалерея футбольных событий',
  description: 'Просматривайте фотографии с футбольных матчей, тренировок и мероприятий.',
  keywords: 'фотогалерея футбола, фотографии матчей, футбольные фото',
  openGraph: {
    type: 'website',
    title: 'Фотогалерея футбольных событий',
    description: 'Просматривайте фотографии с футбольных матчей, тренировок и мероприятий.'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Фотогалерея футбольных событий',
    description: 'Просматривайте фотографии с футбольных матчей, тренировок и мероприятий.'
  }
};

async function fetchNews() {
    try {
      const res = await fetch(`${config.domain}/api/news`, {cache: 'no-cache'});
      return await res.json();
    } catch (err) {
      console.error(err);
      return [];
    }
  }
  

const page = async () => {
    const news = await fetchNews();

    return (
        <div className="photo-gallery-page">
            <PhotoGallery news={news} placement={'page'} />
        </div>
    );
};

export default page;