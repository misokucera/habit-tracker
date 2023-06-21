import { useUser } from "@/features/auth/hooks/useUser";
import { db } from "@/services/firebase";
import {
    QuerySnapshot,
    addDoc,
    collection,
    doc,
    onSnapshot,
    query,
    setDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";

type Habit = {
    name: string;
    color: string;
    description?: string;
};

export const useHabits = () => {
    const { user } = useUser();
    const [habits, setHabits] = useState([]);

    const addHabit = async (
        name: string,
        color: string,
        description: string = "",
        days: number[]
    ) => {
        await addDoc(collection(db, `users/${user?.uid}/habits`), {
            name,
            color,
            description,
            days,
        });
    };

    useEffect(() => {
        const q = query(collection(db, `users/${user?.uid}/habits`));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const habitsFromSnapshot = [];

            querySnapshot.forEach((doc) => {
                habitsFromSnapshot.push({
                    name: doc.data().name,
                });
            });

            setHabits(habitsFromSnapshot);
        });

        return () => unsubscribe();
    }, [user]);

    return { addHabit, habits };
};
