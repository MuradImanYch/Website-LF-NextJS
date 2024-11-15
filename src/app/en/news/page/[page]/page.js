import NewsPage from "@/components/News/NewsPage/NewsPage";
import config from '../../../../../../public/conf.json';

export const generateMetadata = ({ params }) => {
    return {
        title: `Latest Football News and Updates - Page ${params.page}`,
        description: `Read the latest football news, including match results, transfers, rumors, and match analysis. Page ${params.page}`,
        keywords: `football news, transfer news, football updates, match analysis, Page ${params.page}`,
        openGraph: {
          type: 'website',
          title: `Latest Football News and Updates - Page ${params.page}`,
          description: `Read the latest football news, including match results, transfers, rumors, and match analysis. Page ${params.page}`
        },
        twitter: {
          card: 'summary_large_image',
          title: `Latest Football News and Updates - Page ${params.page}`,
          description: `Read the latest football news, including match results, transfers, rumors, and match analysis. Page ${params.page}`
        },
        alternates: {
          canonical: params.page === '1' && `${config.domain}/en/news`
        }
    };
};

const page = async ({params}) => {
    return (
        <NewsPage lang={'en'} placement={'news'} params={params} />
    );
};

export default page;