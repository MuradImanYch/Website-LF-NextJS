import NewsPage from "@/components/News/NewsPage/NewsPage";

export const metadata = {
    title: 'Видео о футболе - лучшие моменты и обзоры матчей',
    description: 'Смотрите видеоролики с лучшими моментами матчей, обзорами и аналитикой футбольных событий.',
    keywords: 'видео о футболе, футбольные обзоры, лучшие моменты матчей',
    openGraph: {
      type: 'website',
      title: 'Видео о футболе - лучшие моменты и обзоры матчей',
      description: 'Смотрите видеоролики с лучшими моментами матчей, обзорами и аналитикой футбольных событий.'
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Видео о футболе - лучшие моменты и обзоры матчей',
      description: 'Смотрите видеоролики с лучшими моментами матчей, обзорами и аналитикой футбольных событий.'
    }
};

const page = async () => {
    return (
        <NewsPage placement={'video'} />
    );
};

export default page;