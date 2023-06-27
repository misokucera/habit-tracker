"use client";

import { useUser } from "@/features/auth/hooks/useUser";
import { db } from "@/services/firebase";
import { query, collection, onSnapshot, Timestamp } from "firebase/firestore";
import { useState, useEffect } from "react";
import { Status, StatusesContext } from "../contexts/StatusesContexts";
import { normalizeDate } from "@/utils/day";
import dayjs from "dayjs";

type Props = {
    children: React.ReactNode;
};

const StatusesProvider = ({ children }: Props) => {
    const [statuses, setStatuses] = useState<Status[]>([]);
    const { user } = useUser();

    console.log("statuses", statuses);

    useEffect(() => {
        const q = query(collection(db, `users/${user?.uid}/statuses`));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const statusesFromSnapshot: Status[] = [];

            querySnapshot.forEach((doc) => {
                const { date, habitId } = doc.data();
                console.log(date);
                statusesFromSnapshot.push({
                    id: doc.id,
                    habitId,
                    date: date.toDate(),
                });
            });

            setStatuses(statusesFromSnapshot);
        });

        return () => unsubscribe();
    }, [user]);

    return (
        <StatusesContext.Provider value={{ statuses }}>
            {children}
        </StatusesContext.Provider>
    );
};

export default StatusesProvider;
