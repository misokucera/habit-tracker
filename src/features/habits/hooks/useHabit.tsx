import { useState, useEffect } from "react";
import { Habit } from "../contexts/HabitsContexts";
import { getHabit } from "../services/habits";
import { useAuth } from "@/features/auth/hooks/useAuth";

export const useHabit = (id: string) => {
    const [habit, setHabit] = useState<Habit | null>(null);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();

    useEffect(() => {
        if (user) {
            getHabit(user.uid, id).then((data) => {
                setHabit(data);
                setLoading(false);
            });
        }
    }, [user, id]);

    const refetch = () => {
        if (user) {
            getHabit(user.uid, id).then((data) => {
                setHabit(data);
            });
        }
    };

    return { habit, loading, refetch };
};
