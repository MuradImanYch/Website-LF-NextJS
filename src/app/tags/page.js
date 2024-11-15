import Tags from "@/components/Main/Tags/Tags";
import './style.css';
import config from '../../../public/conf.json';

export const metadata = {
  title: 'Теги - популярные темы и категории',
  description: 'Исследуйте популярные теги и категории, чтобы находить контент по интересующим темам.',
  keywords: 'теги футбола, популярные темы, категории контента',
  openGraph: {
    type: 'website',
    title: 'Теги - популярные темы и категории',
    description: 'Исследуйте популярные теги и категории, чтобы находить контент по интересующим темам.'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Теги - популярные темы и категории',
    description: 'Исследуйте популярные теги и категории, чтобы находить контент по интересующим темам.'
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
            <Tags placement={'page'} news={news} />
        </div>
    );
};

export default page;