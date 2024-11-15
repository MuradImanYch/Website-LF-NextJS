import PhotoGallery from "@/components/Main/PhotoGallery/PhotoGallery";
import '@/app/photo/style.css';
import config from '../../../../public/conf.json';

export const metadata = {
  title: "Football Photo Gallery",
  description: "Browse photos from football matches, training sessions, and events.",
  keywords: "football photo gallery, match photos, football images",
  openGraph: {
    type: 'website',
    title: "Football Photo Gallery",
    description: "Browse photos from football matches, training sessions, and events."
  },
  twitter: {
    card: 'summary_large_image',
    title: "Football Photo Gallery",
    description: "Browse photos from football matches, training sessions, and events."
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
            <PhotoGallery news={news} placement={'page'} lang={'en'} />
        </div>
    );
};

export default page;