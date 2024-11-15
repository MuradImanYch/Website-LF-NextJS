import NewsPage from "@/components/News/NewsPage/NewsPage";
import config from '../../../../../../public/conf.json';

export const generateMetadata = ({ params }) => {
    return {
        title: `Football Videos - Highlights and Match Reviews - Page ${params.page}`,
        description: `Watch videos featuring match highlights, reviews, and in-depth analysis of football events. Page ${params.page}`,
        keywords: `football videos, match highlights, football reviews, Page ${params.page}`,
        openGraph: {
          type: 'website',
          title: `Football Videos - Highlights and Match Reviews - Page ${params.page}`,
          description: `Watch videos featuring match highlights, reviews, and in-depth analysis of football events. Page ${params.page}`
        },
        twitter: {
          card: 'summary_large_image',
          title: `Football Videos - Highlights and Match Reviews - Page ${params.page}`,
          description: `Watch videos featuring match highlights, reviews, and in-depth analysis of football events. Page ${params.page}`
        },
        alternates: {
          canonical: params.page === '1' && `${config.domain}/en/video`
        }
    };
};

const page = async ({params}) => {
    return (
        <NewsPage placement={'video'} params={params} lang={'en'} />
    )
}

export default page;