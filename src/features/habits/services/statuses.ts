import { db } from "@/services/firebase";
import { normalizeDate } from "@/utils/day";
import {
    Timestamp,
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDocs,
    query,
    updateDoc,
    where,
} from "firebase/firestore";
import { StatusType } from "../contexts/StatusesContexts";
import { updateStreaks } from "./streaks";
import { Habit } from "../contexts/HabitsContexts";

export const addStatus = async (
    userId: string,
    habit: Habit,
    type: StatusType,
    date: Date,
) => {
    await addDoc(collection(db, `users/${userId}/statuses`), {
        date: Timestamp.fromDate(normalizeDate(date)),
        type,
        habitId: habit.id,
    });

    return await updateStreaks(userId, habit, date, type);
};

export const changeStatus = async (
    userId: string,
    habit: Habit,
    statusId: string,
    type: StatusType,
    date: Date,
) => {
    await updateDoc(doc(db, `users/${userId}/statuses/${statusId}`), {
        type,
    });

    return await updateStreaks(userId, habit, date, type);
};

export const removeStatusesByHabit = async (
    userId: string,
    habitId: string,
) => {
    const q = query(
        collection(db, `users/${userId}/statuses`),
        where("habitId", "==", habitId),
    );

    const statuses = await getDocs(q);

    statuses.forEach(async (snapshot) => {
        await deleteDoc(snapshot.ref);
    });
};
