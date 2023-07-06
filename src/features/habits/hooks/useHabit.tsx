import { useState, useEffect } from "react";
import { Habit } from "../contexts/HabitsContexts";
import { getHabit } from "../services/habits";
import { useUserId } from "@/features/auth/hooks/useUserId";

export const useHabit = (id: string) => {
    const [habit, setHabit] = useState<Habit | null>(null);
    const [loading, setLoading] = useState(true);
    const userId = useUserId();

    useEffect(() => {
        getHabit(userId, id).then((data) => {
            setHabit(data);
            setLoading(false);
        });
    }, [userId, id]);

    const refetch = async () => {
        const data = await getHabit(userId, id);
        setHabit(data);
    };

    return { habit, loading, refetch };
};
