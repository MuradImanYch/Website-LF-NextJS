import NewsPage from "@/components/News/NewsPage/NewsPage";

export const metadata = {
    title: 'Latest Football News and Updates',
    description: 'Read the latest football news, including match results, transfers, rumors, and match analysis.',
    keywords: 'football news, transfer news, football updates, match analysis',
    openGraph: {
      type: 'website',
      title: 'Latest Football News and Updates',
      description: 'Read the latest football news, including match results, transfers, rumors, and match analysis.'
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Latest Football News and Updates',
      description: 'Read the latest football news, including match results, transfers, rumors, and match analysis.'
    }
};

const page = async () => {
    return (
        <NewsPage lang={'en'} placement={'news'} />
    );
};

export default page;