import NewsPage from "@/components/News/NewsPage/NewsPage";

const page = async ({params}) => {
    return (
        <NewsPage placement={'video'} params={params} />
    )
}

export default page;