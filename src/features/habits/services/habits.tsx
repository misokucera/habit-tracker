import { db } from "@/services/firebase";
import {
    Timestamp,
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDoc,
    updateDoc,
} from "firebase/firestore";
import { HabitFormValues } from "../components/HabitForm";
import { Habit } from "../contexts/HabitsContexts";
import { removeStatusesByHabit } from "./statuses";
import { normalizeDate } from "@/utils/day";

const getHabitsCollectionPath = (userId: string) => `users/${userId}/habits`;
const getHabitDocumentPath = (userId: string, habitId: string) =>
    `users/${userId}/habits/${habitId}`;

export const addHabit = async (userId: string, habitInput: HabitFormValues) => {
    const { name, description, days } = habitInput;
    const today = new Date();

    await addDoc(collection(db, getHabitsCollectionPath(userId)), {
        name,
        description,
        days,
        order: -1,
        dateCreated: Timestamp.fromDate(normalizeDate(today)),
        dateUpdated: Timestamp.fromDate(normalizeDate(today)),
    });
};

export const editHabit = async (
    userId: string,
    habitId: string,
    habitInput: HabitFormValues,
) => {
    const { name, description, days } = habitInput;
    const today = new Date();

    await updateDoc(doc(db, getHabitDocumentPath(userId, habitId)), {
        name,
        description,
        days,
        dateUpdated: Timestamp.fromDate(normalizeDate(today)),
    });
};

export const getHabit = async (
    userId: string,
    habitId: string,
): Promise<Habit | null> => {
    const snapshot = await getDoc(
        doc(db, getHabitDocumentPath(userId, habitId)),
    );

    if (snapshot.exists()) {
        const { name, days, description, order, dateCreated, dateUpdated } =
            snapshot.data();

        return {
            id: habitId,
            name,
            days,
            description,
            order,
            dateCreated,
            dateUpdated,
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

export const reorderHabits = (userId: string, habits: Habit[]) => {
    const promises = habits.map((habit, index) => {
        updateDoc(doc(db, getHabitDocumentPath(userId, habit.id)), {
            order: index,
        });
    });

    return Promise.all(promises);
};
