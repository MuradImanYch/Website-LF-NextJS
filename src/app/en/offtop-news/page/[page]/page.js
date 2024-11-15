import NewsPage from "@/components/News/NewsPage/NewsPage";
import config from '../../../../../../public/conf.json';

export const generateMetadata = ({ params }) => {
    return {
        title: `Offtopic News - Unusual and Interesting Events - Page ${params.page}`,
        description: `Read the most interesting and unusual news not directly related to football but worth your attention. Page ${params.page}`,
        keywords: `offtopic news, interesting events, unusual news, Page ${params.page}`,
        openGraph: {
          type: 'website',
          title: `Offtopic News - Unusual and Interesting Events - Page ${params.page}`,
          description: `Read the most interesting and unusual news not directly related to football but worth your attention. Page ${params.page}`
        },
        twitter: {
          card: 'summary_large_image',
          title: `Offtopic News - Unusual and Interesting Events - Page ${params.page}`,
          description: `Read the most interesting and unusual news not directly related to football but worth your attention. Page ${params.page}`
        },
        alternates: {
          canonical: params.page === '1' && `${config.domain}/en/offtop-news`
        }
    };
};

const page = async ({params}) => {
    return (
        <NewsPage lang={'en'} placement={'offtop-news'} params={params} />
    )
}

export default page;