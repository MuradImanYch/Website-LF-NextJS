import NewsPage from "@/components/News/NewsPage/NewsPage";
import config from '../../../../../../public/conf.json';

export const generateMetadata = ({ params }) => {
    return {
        title: `Football blogs, football opinions, football analysis - Page ${params.page}`,
        description: `Explore football blogs, expert opinions, and fan analysis for in-depth insights. Page ${params.page}`,
        keywords: `football blogs, football opinions, football analysis, Page ${params.page}`,
        openGraph: {
          type: 'website',
          title: `Football blogs, football opinions, football analysis - Page ${params.page}`,
          description: `Explore football blogs, expert opinions, and fan analysis for in-depth insights. Page ${params.page}`
        },
        twitter: {
          card: 'summary_large_image',
          title: `Football blogs, football opinions, football analysis - Page ${params.page}`,
          description: `Explore football blogs, expert opinions, and fan analysis for in-depth insights. Page ${params.page}`
        },
        alternates: {
          canonical: params.page === '1' && `${config.domain}/en/blogs`
        }
    };
};

const page = async ({params}) => {
    return (
        <NewsPage placement={'blogs'} params={params} lang={'en'} />
    )
}

export default page;