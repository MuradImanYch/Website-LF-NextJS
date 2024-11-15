import NewsPage from "@/components/News/NewsPage/NewsPage";
import config from '../../../../../../public/conf.json';

export const generateMetadata = ({ params }) => {
    return {
        title: `Результаты поиска по запросу "${params.tag.replaceAll('%20', ' ')}" | Legendary Football - Страница ${params.page}`,
        description: `Ознакомьтесь с результатами поиска по запросу "${params.tag.replaceAll('%20', ' ')}" на Legendary Football. Найдите актуальные статьи, новости и многое другое. Страница ${params.page}`,
        keywords: `${params.tag.replaceAll('%20', ' ')} искать, legfootball ${params.tag.replaceAll('%20', ' ')}, поиск по запросу, Страница ${params.page}`,
        openGraph: {
          type: 'website',
          title: `Результаты поиска по запросу "${params.tag.replaceAll('%20', ' ')}" | Legendary Football - Страница ${params.page}`,
          description: `Ознакомьтесь с результатами поиска по запросу "${params.tag.replaceAll('%20', ' ')}" на Legendary Football. Найдите актуальные статьи, новости и многое другое. Страница ${params.page}`
        },
        twitter: {
          card: 'summary_large_image',
          title: `Результаты поиска по запросу "${params.tag.replaceAll('%20', ' ')}" | Legendary Football - Страница ${params.page}`,
          description: `Ознакомьтесь с результатами поиска по запросу "${params.tag.replaceAll('%20', ' ')}" на Legendary Football. Найдите актуальные статьи, новости и многое другое. Страница ${params.page}`
        },
        alternates: {
          canonical: params.page === '1' && `${config.domain}/search/${params.tag}`
        }
    };
};

const page = async ({params}) => {
    return (
        <NewsPage placement={'tags-search'} params={params} />
    )
}

export default page;