import NewsPage from "@/components/News/NewsPage/NewsPage";
import config from '../../../../../../public/conf.json';

export const generateMetadata = ({ params }) => {
    return {
        title: `Football Transfer News – Latest Rumours and Moves - Page ${params.page}`,
        description: `Get the latest football transfer news, player move rumours, and official confirmations. Stay ahead with future deals. Page ${params.page}`,
        keywords: `transfer news, player moves, football rumours, Page ${params.page}`,
        openGraph: {
          type: 'website',
          title: `Football Transfer News – Latest Rumours and Moves - Page ${params.page}`,
          description: `Get the latest football transfer news, player move rumours, and official confirmations. Stay ahead with future deals. Page ${params.page}`
        },
        twitter: {
          card: 'summary_large_image',
          title: `Football Transfer News – Latest Rumours and Moves - Page ${params.page}`,
          description: `Get the latest football transfer news, player move rumours, and official confirmations. Stay ahead with future deals. Page ${params.page}`
        },
        alternates: {
          canonical: params.page === '1' && `${config.domain}/en/transfer-news`
        }
    };
};

const page = async ({params}) => {
    return (
        <NewsPage lang={'en'} placement={'transfer-news'} params={params} />
    )
}

export default page;