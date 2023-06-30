import { db } from "@/services/firebase";
import { addDoc, collection, doc, getDoc } from "firebase/firestore";
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

export const getHabit = async (userId: string, habitId: string) => {
    const snapshot = await getDoc(doc(db, `users/${userId}/habits/${habitId}`));

    if (snapshot.exists()) {
        console.log(snapshot.data());
        return snapshot.data();
    } else {
        console.log("document not found");
    }
};
