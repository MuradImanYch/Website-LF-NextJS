import NewsPage from "@/components/News/NewsPage/NewsPage";
import config from '../../../../../public/conf.json';

export const generateMetadata = ({ params }) => {
    return {
        title: `Офтоп новости - необычные и интересные события - Страница ${params.page}`,
        description: `Читайте самые интересные и необычные новости, не связанные напрямую с футболом, но достойные внимания. Страница ${params.page}`,
        keywords: `футбольные новости, новости трансферов, футбольные события, аналитика матчей, Страница ${params.page}`,
        openGraph: {
          type: 'website',
          title: `Офтоп новости - необычные и интересные события - Страница ${params.page}`,
          description: `Читайте самые интересные и необычные новости, не связанные напрямую с футболом, но достойные внимания. Страница ${params.page}`
        },
        twitter: {
          card: 'summary_large_image',
          title: `Офтоп новости - необычные и интересные события - Страница ${params.page}`,
          description: `Читайте самые интересные и необычные новости, не связанные напрямую с футболом, но достойные внимания. Страница ${params.page}`
        },
        alternates: {
          canonical: params.page === '1' && `${config.domain}/offtop-news`
        }
    };
};

const page = async ({params}) => {
    return (
        <NewsPage placement={'offtop-news'} params={params} />
    )
}

export default page;