import NewsPage from "@/components/News/NewsPage/NewsPage";

export const generateMetadata = ({ params }) => {
    return {
        title: `Результаты поиска по запросу "${params.tag.replaceAll('%20', ' ')}" | Legendary Football`,
        description: `Ознакомьтесь с результатами поиска по запросу "${params.tag.replaceAll('%20', ' ')}" на Legendary Football. Найдите актуальные статьи, новости и многое другое.`,
        keywords: `${params.tag.replaceAll('%20', ' ')} искать, legfootball ${params.tag.replaceAll('%20', ' ')}, поиск по запросу`,
        openGraph: {
          type: 'website',
          title: `Результаты поиска по запросу "${params.tag.replaceAll('%20', ' ')}" | Legendary Football`,
          description: `Ознакомьтесь с результатами поиска по запросу "${params.tag.replaceAll('%20', ' ')}" на Legendary Football. Найдите актуальные статьи, новости и многое другое.`
        },
        twitter: {
          card: 'summary_large_image',
          title: `Результаты поиска по запросу "${params.tag.replaceAll('%20', ' ')}" | Legendary Football`,
          description: `Ознакомьтесь с результатами поиска по запросу "${params.tag.replaceAll('%20', ' ')}" на Legendary Football. Найдите актуальные статьи, новости и многое другое.`
        }
    };
};

const page = async ({params}) => {
    return (
        <NewsPage placement={'tags-search'} params={params} />
    );
};

export default page;