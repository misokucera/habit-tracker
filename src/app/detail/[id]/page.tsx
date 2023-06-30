"use client";

import Breadcrumbs from "@/components/ui/Breadcrumbs";
import ContentBox from "@/components/ui/ContentBox";
import { useAuth } from "@/features/auth/hooks/useAuth";
import HabitDetail from "@/features/habits/components/HabitDetail";

const Detail = ({ params }: { params: { id: string } }) => {
    const { user } = useAuth();

    const { id: habitId } = params;

    return (
        <div className="w-full max-w-5xl">
            <div className="mb-5">
                <Breadcrumbs segments={["detail"]} />
            </div>
            <ContentBox>
                <div className="h-56">
                    <HabitDetail userId={user?.uid || ""} habitId={habitId} />
                </div>
            </ContentBox>
        </div>
    );
};

export default Detail;
