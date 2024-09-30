import NewsPage from "@/components/News/NewsPage/NewsPage";

const page = async ({params}) => {
    return (
        <NewsPage placement={'tags-search'} params={params} />
    )
}

export default page;