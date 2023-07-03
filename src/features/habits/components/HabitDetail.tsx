"use client";

import Headline from "@/components/ui/Headline";
import { useHabit } from "../hooks/useHabit";
import Button from "@/components/ui/Button";

type Props = {
    habitId: string;
};

const HabitDetail = ({ habitId }: Props) => {
    const { habit, loading } = useHabit(habitId);

    if (loading || habit === null) {
        return null;
    }

    return (
        <div>
            <div className="flex items-center justify-between gap-5 mb-5">
                <Headline>{habit.name}</Headline>
                <Button variant="secondary">Remove</Button>
            </div>
            {habit.description && <p>{habit.description}</p>}
        </div>
    );
};

export default HabitDetail;
