import SinglePage from "@/components/News/SinglePage/SinglePage";

const page = ({params}) => {
    return (
        <div className="news-single-page">
            <SinglePage lang={'en'} url={params.id} id={params.id.split('-')[0]} />
        </div>
    );
};

export default page;