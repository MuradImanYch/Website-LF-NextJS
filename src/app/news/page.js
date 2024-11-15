import NewsPage from "@/components/News/NewsPage/NewsPage";

export const metadata = {
    title: 'Последние футбольные новости и события',
    description: 'Читайте последние новости футбола, включая результаты, трансферы, слухи и аналитику футбольных матчей.',
    keywords: 'футбольные новости, новости трансферов, футбольные события, аналитика матчей',
    openGraph: {
      type: 'website',
      title: 'Последние футбольные новости и события',
      description: 'Читайте последние новости футбола, включая результаты, трансферы, слухи и аналитику футбольных матчей.'
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Последние футбольные новости и события',
      description: 'Читайте последние новости футбола, включая результаты, трансферы, слухи и аналитику футбольных матчей.'
    }
};

const page = async () => {
    return (
        <NewsPage placement={'news'} />
    );
};

export default page;