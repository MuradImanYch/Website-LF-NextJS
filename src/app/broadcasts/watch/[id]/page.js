import SinglePage from "@/components/Broadcasts/SinglePage/SinglePage";

const page = ({params}) => {
    return (
        <div className="broadcast-single-page">
            <SinglePage id={params.id.split('-')[0]} />
        </div>
    );
};

export default page;