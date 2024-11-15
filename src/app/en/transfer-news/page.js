import NewsPage from "@/components/News/NewsPage/NewsPage";

export const metadata = {
    title: 'Football Transfer News – Latest Rumours and Moves',
    description: 'Get the latest football transfer news, player move rumours, and official confirmations. Stay ahead with future deals.',
    keywords: 'transfer news, player moves, football rumours',
    openGraph: {
      type: 'website',
      title: 'Football Transfer News – Latest Rumours and Moves',
      description: 'Get the latest football transfer news, player move rumours, and official confirmations. Stay ahead with future deals.'
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Football Transfer News – Latest Rumours and Moves',
      description: 'Get the latest football transfer news, player move rumours, and official confirmations. Stay ahead with future deals.'
    }
};


const page = async () => {
    return (
        <NewsPage lang={'en'} placement={'transfer-news'} />
    );
};

export default page;