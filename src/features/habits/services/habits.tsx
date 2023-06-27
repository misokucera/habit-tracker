import { db } from "@/services/firebase";
import { addDoc, collection } from "firebase/firestore";
import { CreateHabitFormInput } from "../components/CreateHabitForm";

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
