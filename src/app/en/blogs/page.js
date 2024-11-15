import NewsPage from "@/components/News/NewsPage/NewsPage";

export const metadata = {
    title: 'Football Blogs - Opinions and Analysis',
    description: 'Explore football blogs, expert opinions, and fan analysis for in-depth insights.',
    keywords: 'football blogs, football opinions, football analysis',
    openGraph: {
      type: 'website',
      title: 'Football Blogs - Opinions and Analysis',
      description: 'Explore football blogs, expert opinions, and fan analysis for in-depth insights.'
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Football Blogs - Opinions and Analysis',
      description: 'Explore football blogs, expert opinions, and fan analysis for in-depth insights.'
    }
};

const page = async () => {
    return (
        <NewsPage lang={'en'} placement={'blogs'} />
    );
};

export default page;