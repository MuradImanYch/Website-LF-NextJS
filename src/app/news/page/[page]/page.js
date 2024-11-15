import NewsPage from "@/components/News/NewsPage/NewsPage";
import config from '../../../../../public/conf.json';

export const generateMetadata = ({ params }) => {
    return {
        title: `Последние футбольные новости и события - Страница ${params.page}`,
        description: `Читайте последние новости футбола, включая результаты, трансферы, слухи и аналитику футбольных матчей. Страница ${params.page}`,
        keywords: `футбольные новости, новости трансферов, футбольные события, аналитика матчей, Страница ${params.page}`,
        openGraph: {
          type: 'website',
          title: `Последние футбольные новости и события - Страница ${params.page}`,
          description: `Читайте последние новости футбола, включая результаты, трансферы, слухи и аналитику футбольных матчей. Страница ${params.page}`
        },
        twitter: {
          card: 'summary_large_image',
          title: `Последние футбольные новости и события - Страница ${params.page}`,
          description: `Читайте последние новости футбола, включая результаты, трансферы, слухи и аналитику футбольных матчей. Страница ${params.page}`
        },
        alternates: {
          canonical: params.page === '1' && `${config.domain}/news`
        }
    };
};

const page = async ({params}) => {
    return (
        <NewsPage placement={'news'} params={params} />
    );
};

export default page;