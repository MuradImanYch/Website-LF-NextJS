import NewsPage from "@/components/News/NewsPage/NewsPage";
import config from '../../../../../public/conf.json';

export const generateMetadata = ({ params }) => {
    return {
        title: `Видео о футболе - лучшие моменты и обзоры матчей - Страница ${params.page}`,
        description: `Смотрите видеоролики с лучшими моментами матчей, обзорами и аналитикой футбольных событий. Страница ${params.page}`,
        keywords: `видео о футболе, футбольные обзоры, лучшие моменты матчей, Страница ${params.page}`,
        openGraph: {
          type: 'website',
          title: `Видео о футболе - лучшие моменты и обзоры матчей - Страница ${params.page}`,
          description: `Смотрите видеоролики с лучшими моментами матчей, обзорами и аналитикой футбольных событий. Страница ${params.page}`
        },
        twitter: {
          card: 'summary_large_image',
          title: `Видео о футболе - лучшие моменты и обзоры матчей - Страница ${params.page}`,
          description: `Смотрите видеоролики с лучшими моментами матчей, обзорами и аналитикой футбольных событий. Страница ${params.page}`
        },
        alternates: {
          canonical: params.page === '1' && `${config.domain}/video`
        }
    };
};

const page = async ({params}) => {
    return (
        <NewsPage placement={'video'} params={params} />
    )
}

export default page;