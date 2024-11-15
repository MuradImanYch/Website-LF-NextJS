import NewsPage from "@/components/News/NewsPage/NewsPage";

export const generateMetadata = ({ params }) => {
    return {
        title: `Search results for "${params.tag.replaceAll('%20', ' ')}" | Legendary Football`,
        description: `Explore the search results for "${params.tag.replaceAll('%20', ' ')}" on Legendary Football. Find relevant articles, updates, and more.`,
        keywords: `${params.tag.replaceAll('%20', ' ')} search, legfootball ${params.tag.replaceAll('%20', ' ')}, search results for`,
        openGraph: {
          type: 'website',
          title: `Search results for "${params.tag.replaceAll('%20', ' ')}" | Legendary Football`,
          description: `Explore the search results for "${params.tag.replaceAll('%20', ' ')}" on Legendary Football. Find relevant articles, updates, and more.`
        },
        twitter: {
          card: 'summary_large_image',
          title: `Search results for "${params.tag.replaceAll('%20', ' ')}" | Legendary Football`,
          description: `Explore the search results for "${params.tag.replaceAll('%20', ' ')}" on Legendary Football. Find relevant articles, updates, and more.`
        }
    };
};


const page = async ({params}) => {
    return (
        <NewsPage lang={'en'} placement={'tags-search'} params={params} />
    );
};

export default page;