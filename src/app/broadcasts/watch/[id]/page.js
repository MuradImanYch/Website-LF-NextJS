import SinglePage from "@/components/Broadcasts/SinglePage/SinglePage";

const page = ({params}) => {
    return (
        <div className="broadcast-single-page">
            <SinglePage url={params.id} />
        </div>
    );
};

export default page;