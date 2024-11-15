import NewsPage from "@/components/News/NewsPage/NewsPage";
import config from '../../../../../public/conf.json';

export const generateMetadata = ({ params }) => {
    return {
        title: `Трансферные новости футбола – Последние слухи и переходы - Страница ${params.page}`,
        description: `Читайте последние трансферные новости футбола, слухи о переходах игроков и официальные подтверждения. Узнайте больше о будущих сделках. Страница ${params.page}`,
        keywords: `трансферные новости, футбольные переходы, слухи о трансферах, Страница ${params.page}`,
        openGraph: {
          type: 'website',
          title: `Трансферные новости футбола – Последние слухи и переходы - Страница ${params.page}`,
          description: `Читайте последние трансферные новости футбола, слухи о переходах игроков и официальные подтверждения. Узнайте больше о будущих сделках. Страница ${params.page}`
        },
        twitter: {
          card: 'summary_large_image',
          title: `Трансферные новости футбола – Последние слухи и переходы - Страница ${params.page}`,
          description: `Читайте последние трансферные новости футбола, слухи о переходах игроков и официальные подтверждения. Узнайте больше о будущих сделках. Страница ${params.page}`
        },
        alternates: {
          canonical: params.page === '1' && `${config.domain}/transfer-news`
        }
    };
};

const page = async ({params}) => {
    return (
        <NewsPage placement={'transfer-news'} params={params} />
    )
}

export default page;