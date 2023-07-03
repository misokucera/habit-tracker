import Breadcrumbs from "@/components/ui/Breadcrumbs";
import ContentBox from "@/components/ui/ContentBox";
import HabitDetail from "@/features/habits/components/HabitDetail";

const Detail = ({ params }: { params: { id: string } }) => {
    const { id: habitId } = params;

    return (
        <div className="w-full max-w-5xl">
            <div className="mb-5">
                <Breadcrumbs segments={["habit-detail"]} />
            </div>
            <ContentBox>
                <HabitDetail habitId={habitId} />
            </ContentBox>
        </div>
    );
};

export default Detail;
