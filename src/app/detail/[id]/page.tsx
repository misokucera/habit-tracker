import Breadcrumbs from "@/components/ui/Breadcrumbs";
import ContentBox from "@/components/ui/ContentBox";
import HabitDetail from "@/features/habits/components/HabitDetail";
import SignOutButton from "@/features/auth/components/SignOutButton";

const Detail = ({ params }: { params: { id: string } }) => {
    const { id: habitId } = params;

    return (
        <div className="w-full max-w-5xl">
            <div className="mb-5 flex items-center justify-between gap-3">
                <Breadcrumbs segments={["habit-detail"]} />
                <SignOutButton />
            </div>
            <ContentBox>
                <HabitDetail habitId={habitId} />
            </ContentBox>
        </div>
    );
};

export default Detail;
