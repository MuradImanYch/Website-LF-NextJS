import NewsPage from "@/components/News/NewsPage/NewsPage";
import config from '../../../../../../../public/conf.json';

export const generateMetadata = ({ params }) => {
    return {
        title: `Search results for "${params.tag.replaceAll('%20', ' ')}" | Legendary Football - Page ${params.page}`,
        description: `Explore the search results for "${params.tag.replaceAll('%20', ' ')}" on Legendary Football. Find relevant articles, updates, and more. Page ${params.page}`,
        keywords: `${params.tag.replaceAll('%20', ' ')} search, legfootball ${params.tag.replaceAll('%20', ' ')}, search results for, Page ${params.page}`,
        openGraph: {
          type: 'website',
          title: `Search results for "${params.tag.replaceAll('%20', ' ')}" | Legendary Football - Page ${params.page}`,
          description: `Explore the search results for "${params.tag.replaceAll('%20', ' ')}" on Legendary Football. Find relevant articles, updates, and more. Page ${params.page}`
        },
        twitter: {
          card: 'summary_large_image',
          title: `Search results for "${params.tag.replaceAll('%20', ' ')}" | Legendary Football - Page ${params.page}`,
          description: `Explore the search results for "${params.tag.replaceAll('%20', ' ')}" on Legendary Football. Find relevant articles, updates, and more. Page ${params.page}`
        },
        alternates: {
          canonical: params.page === '1' && `${config.domain}/en/search/${params.tag}`
        }
    };
};

const page = async ({params}) => {
    return (
        <NewsPage lang={'en'} placement={'tags-search'} params={params} />
    )
}

export default page;