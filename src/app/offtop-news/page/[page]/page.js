import NewsPage from "@/components/News/NewsPage/NewsPage";

const page = async ({params}) => {
    return (
        <NewsPage placement={'offtop-news'} params={params} />
    )
}

export default page;