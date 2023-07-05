import { db } from "@/services/firebase";
import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDoc,
    setDoc,
} from "firebase/firestore";
import { HabitFormValues } from "../components/HabitForm";
import { Habit } from "../contexts/HabitsContexts";
import { removeStatusesByHabit } from "./statuses";

const getHabitsCollectionPath = (userId: string) => `users/${userId}/habits`;
const getHabitDocumentPath = (userId: string, habitId: string) =>
    `users/${userId}/habits/${habitId}`;

export const addHabit = async (userId: string, habitInput: HabitFormValues) => {
    const { name, color, description, days } = habitInput;

    await addDoc(collection(db, getHabitsCollectionPath(userId)), {
        name,
        color,
        description,
        days,
    });
};

export const editHabit = async (
    userId: string,
    habitId: string,
    habitInput: HabitFormValues
) => {
    const { name, color, description, days } = habitInput;

    await setDoc(doc(db, getHabitDocumentPath(userId, habitId)), {
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
    const snapshot = await getDoc(
        doc(db, getHabitDocumentPath(userId, habitId))
    );

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

export const removeHabit = (userId: string, habitId: string) => {
    return Promise.all([
        removeStatusesByHabit(userId, habitId),
        deleteDoc(doc(db, getHabitDocumentPath(userId, habitId))),
    ]);
};
