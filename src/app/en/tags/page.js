import Tags from "@/components/Main/Tags/Tags";
import '@/app/tags/style.css';
import config from '../../../../public/conf.json';

export const metadata = {
  title: "Tags - Popular Topics and Categories",
  description: "Explore popular tags and categories to find content on topics that interest you.",
  keywords: "football tags, popular topics, content categories",
  openGraph: {
    type: 'website',
    title: "Tags - Popular Topics and Categories",
    description: "Explore popular tags and categories to find content on topics that interest you."
  },
  twitter: {
    card: 'summary_large_image',
    title: "Tags - Popular Topics and Categories",
    description: "Explore popular tags and categories to find content on topics that interest you."
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
        <div className="tags-page">
            <Tags lang={'en'} placement={'page'} news={news} />
        </div>
    );
};

export default page;