import PhotoGallery from "@/components/Main/PhotoGallery/PhotoGallery";
import './style.css';

async function fetchNews() {
    try {
      const res = await fetch(`http://78.46.254.73:3000/api/news`, {cache: 'no-cache'});
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