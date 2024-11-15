import NewsPage from "@/components/News/NewsPage/NewsPage";

export const metadata = {
    title: 'Offtopic News - Unusual and Interesting Events',
    description: 'Read the most interesting and unusual news not directly related to football but worth your attention.',
    keywords: 'offtopic news, interesting events, unusual news',
    openGraph: {
      type: 'website',
      title: 'Offtopic News - Unusual and Interesting Events',
      description: 'Read the most interesting and unusual news not directly related to football but worth your attention.'
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Offtopic News - Unusual and Interesting Events',
      description: 'Read the most interesting and unusual news not directly related to football but worth your attention.'
    }
};

const page = async () => {
    return (
        <NewsPage lang={'en'} placement={'offtop-news'} />
    );
};

export default page;