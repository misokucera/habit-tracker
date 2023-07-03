"use client";

import { useEffect, useState } from "react";
import { getHabit } from "../services/habits";
import Headline from "@/components/ui/Headline";
import { Habit } from "../contexts/HabitsContexts";

type Props = {
    userId: string;
    habitId: string;
};

const HabitDetail = ({ userId, habitId }: Props) => {
    useEffect(() => {
        getHabit(userId, habitId);
    }, [userId, habitId]);

    return (
        <div>
            <div className="mb-5">
                <Headline>Detail</Headline>
            </div>
            <p>{habitId}</p>
        </div>
    );
};

export default HabitDetail;
