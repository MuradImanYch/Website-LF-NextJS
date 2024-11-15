import NewsPage from "@/components/News/NewsPage/NewsPage";

export const metadata = {
    title: 'Офтоп новости - необычные и интересные события',
    description: 'Читайте самые интересные и необычные новости, не связанные напрямую с футболом, но достойные внимания.',
    keywords: 'офтоп новости, интересные события, необычные новости',
    openGraph: {
      type: 'website',
      title: 'Офтоп новости - необычные и интересные события',
      description: 'Читайте самые интересные и необычные новости, не связанные напрямую с футболом, но достойные внимания.'
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Офтоп новости - необычные и интересные события',
      description: 'Читайте самые интересные и необычные новости, не связанные напрямую с футболом, но достойные внимания.'
    }
};

const page = async () => {
    return (
        <NewsPage placement={'offtop-news'} />
    );
};

export default page;