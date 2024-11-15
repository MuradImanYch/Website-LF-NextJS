import NewsPage from "@/components/News/NewsPage/NewsPage";
import config from '../../../../../public/conf.json';

export const generateMetadata = ({ params }) => {
    return {
        title: `Блоги о футболе - мнения и аналитика - Страница ${params.page}`,
        description: `Читайте блоги о футболе, личные мнения экспертов и фанатов, а также аналитические материалы. Страница ${params.page}`,
        keywords: `футбольные блоги, мнения о футболе, аналитика футбола, Страница ${params.page}`,
        openGraph: {
          type: 'website',
          title: `Блоги о футболе - мнения и аналитика - Страница ${params.page}`,
          description: `Читайте блоги о футболе, личные мнения экспертов и фанатов, а также аналитические материалы. Страница ${params.page}`
        },
        twitter: {
          card: 'summary_large_image',
          title: `Блоги о футболе - мнения и аналитика - Страница ${params.page}`,
          description: `Читайте блоги о футболе, личные мнения экспертов и фанатов, а также аналитические материалы. Страница ${params.page}`
        },
        alternates: {
          canonical: params.page === '1' && `${config.domain}/blogs`
        }
    };
};

const page = async ({params}) => {
    return (
        <NewsPage placement={'blogs'} params={params} />
    )
}

export default page;