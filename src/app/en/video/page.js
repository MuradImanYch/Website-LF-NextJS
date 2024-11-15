import NewsPage from "@/components/News/NewsPage/NewsPage";

export const metadata = {
    title: 'Football Videos - Highlights and Match Reviews',
    description: 'Watch videos featuring match highlights, reviews, and in-depth analysis of football events.',
    keywords: 'football videos, match highlights, football reviews',
    openGraph: {
      type: 'website',
      title: 'Football Videos - Highlights and Match Reviews',
      description: 'Watch videos featuring match highlights, reviews, and in-depth analysis of football events.'
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Football Videos - Highlights and Match Reviews',
      description: 'Watch videos featuring match highlights, reviews, and in-depth analysis of football events.'
    }
};

const page = async () => {
    return (
        <NewsPage lang={'en'} placement={'video'} />
    );
};

export default page;