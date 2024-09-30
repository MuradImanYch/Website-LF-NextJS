import NewsPage from "@/components/News/NewsPage/NewsPage";

const page = async ({params}) => {
    return (
        <NewsPage placement={'blogs'} params={params} />
    )
}

export default page;