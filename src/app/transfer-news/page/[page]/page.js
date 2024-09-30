import NewsPage from "@/components/News/NewsPage/NewsPage";

export const metadata = {
    title: 'erfew',
    description: 'ergewg.',
    keywords: 'ergre'
};



const page = async ({params}) => {
    return (
        <NewsPage placement={'transfer-news'} params={params} />
    )
}

export default page;