"use client";

import { useAuth } from "@/features/auth/hooks/useAuth";
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

type Props = {
    selectedDays: number;
    children: React.ReactNode;
};

const StatusesProvider = ({ children, selectedDays }: Props) => {
    const [statuses, setStatuses] = useState<Status[]>([]);
    const { user } = useAuth();

    useEffect(() => {
        const dayInPast = dayjs().subtract(selectedDays, "days").toDate();

        console.log("statuses query fired", selectedDays);

        const q = query(
            collection(db, `users/${user?.uid}/statuses`),
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
    }, [user, selectedDays]);

    return (
        <StatusesContext.Provider value={{ statuses }}>
            {children}
        </StatusesContext.Provider>
    );
};

export default StatusesProvider;
