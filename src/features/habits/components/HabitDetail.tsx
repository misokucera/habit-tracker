"use client";

import { useEffect } from "react";
import { getHabit } from "../services/habits";

type Props = {
    userId: string;
    habitId: string;
};

const HabitDetail = ({ userId, habitId }: Props) => {
    useEffect(() => {
        getHabit(userId, habitId);
    }, [userId, habitId]);

    return <div>Habit detail: {habitId}</div>;
};

export default HabitDetail;
