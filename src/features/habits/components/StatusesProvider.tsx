"use client";

import { db } from "@/services/firebase";
import {
    query,
    collection,
    onSnapshot,
    Timestamp,
    where,
} from "firebase/firestore";
import { useState, useEffect } from "react";
import { Status, StatusesContext } from "../contexts/StatusesContexts";
import dayjs from "dayjs";
import { useUserId } from "@/features/auth/hooks/useUserId";

type Props = {
    selectedDays: number;
    habitId?: string;
    children: React.ReactNode;
};

const StatusesProvider = ({ children, selectedDays, habitId }: Props) => {
    const [statuses, setStatuses] = useState<Status[]>([]);
    const [lastSelectedDays, setLastSelectedDays] = useState<number>(0);
    const userId = useUserId();

    useEffect(() => {
        const dayInPast = dayjs().subtract(selectedDays, "days").toDate();

        const conditions = [where("date", ">", Timestamp.fromDate(dayInPast))];

        if (habitId) {
            conditions.push(where("habitId", "==", habitId));
        }

        const q = query(
            collection(db, `users/${userId}/statuses`),
            ...conditions
        );

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const statusesFromSnapshot: Status[] = [];

            querySnapshot.forEach((doc) => {
                const { date, habitId } = doc.data();

                statusesFromSnapshot.push({
                    id: doc.id,
                    habitId,
                    date: date.toDate(),
                });
            });

            setStatuses(statusesFromSnapshot);
            setLastSelectedDays(selectedDays);
        });

        return () => unsubscribe();
    }, [userId, selectedDays, habitId]);

    return (
        <StatusesContext.Provider value={{ statuses, lastSelectedDays }}>
            {children}
        </StatusesContext.Provider>
    );
};

export default StatusesProvider;
