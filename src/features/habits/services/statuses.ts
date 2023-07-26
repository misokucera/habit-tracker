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

export const addStatus = async (
    userId: string,
    habitId: string,
    type: StatusType,
    date: Date,
) => {
    return await addDoc(collection(db, `users/${userId}/statuses`), {
        date: Timestamp.fromDate(normalizeDate(date)),
        type,
        habitId,
    });
};

export const changeStatus = async (
    userId: string,
    statusId: string,
    type: StatusType,
) => {
    return await updateDoc(doc(db, `users/${userId}/statuses/${statusId}`), {
        type,
    });
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
