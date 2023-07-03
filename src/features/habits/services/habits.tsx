import { db } from "@/services/firebase";
import { addDoc, collection, doc, getDoc } from "firebase/firestore";
import { CreateHabitFormInput } from "../components/CreateHabitForm";
import { Habit } from "../contexts/HabitsContexts";

export const addHabit = async (
    userId: string,
    habitInput: CreateHabitFormInput
) => {
    const { name, color, description, days } = habitInput;

    await addDoc(collection(db, `users/${userId}/habits`), {
        name,
        color,
        description,
        days,
    });
};

export const getHabit = async (
    userId: string,
    habitId: string
): Promise<Habit | null> => {
    const snapshot = await getDoc(doc(db, `users/${userId}/habits/${habitId}`));

    if (snapshot.exists()) {
        const { name, color, days, description } = snapshot.data();
        return {
            id: habitId,
            name,
            color,
            days,
            description,
        };
    }

    return null;
};
