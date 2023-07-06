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
    children: React.ReactNode;
};

const StatusesProvider = ({ children, selectedDays }: Props) => {
    const [statuses, setStatuses] = useState<Status[]>([]);
    const userId = useUserId();

    useEffect(() => {
        const dayInPast = dayjs().subtract(selectedDays, "days").toDate();

        const q = query(
            collection(db, `users/${userId}/statuses`),
            where("date", ">", Timestamp.fromDate(dayInPast))
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
        });

        return () => unsubscribe();
    }, [userId, selectedDays]);

    return (
        <StatusesContext.Provider value={{ statuses }}>
            {children}
        </StatusesContext.Provider>
    );
};

export default StatusesProvider;
