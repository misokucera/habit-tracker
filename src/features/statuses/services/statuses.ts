import { db } from "@/services/firebase";
import { normalizeDate } from "@/utils/day";
import {
    Timestamp,
    addDoc,
    collection,
    deleteDoc,
    doc,
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
