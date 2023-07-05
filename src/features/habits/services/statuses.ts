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
    where,
} from "firebase/firestore";

export const addStatus = async (
    userId: string,
    habitId: string,
    date: Date
) => {
    return await addDoc(collection(db, `users/${userId}/statuses`), {
        date: Timestamp.fromDate(normalizeDate(date)),
        habitId,
    });
};

export const removeStatus = async (userId: string, statusId: string) => {
    return await deleteDoc(doc(db, `users/${userId}/statuses`, statusId));
};

export const removeStatusesByHabit = async (
    userId: string,
    habitId: string
) => {
    const q = query(
        collection(db, `users/${userId}/statuses`),
        where("habitId", "==", habitId)
    );

    const statuses = await getDocs(q);

    statuses.forEach(async (snapshot) => {
        await deleteDoc(snapshot.ref);
    });
};
