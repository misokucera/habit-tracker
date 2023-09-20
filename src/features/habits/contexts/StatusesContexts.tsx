import { useUserId } from "@/features/auth/hooks/useUserId";
import { db } from "@/services/firebase";
import dayjs from "dayjs";
import {
    QueryDocumentSnapshot,
    DocumentData,
    Timestamp,
    collection,
    onSnapshot,
    query,
    where,
} from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";
import { z } from "zod";

const createStatusFromDocument = (
    doc: QueryDocumentSnapshot<DocumentData>,
): Status => {
    return schema.parse({
        id: doc.id,
        ...doc.data(),
        date: doc.data().date.toDate(),
    });
};

const schema = z.object({
    id: z.string(),
    habitId: z.string(),
    date: z.date(),
});

export type Status = z.infer<typeof schema>;

type StatusesContext = {
    statuses: Status[];
    // lastSelectedDays: number;
};

export const StatusesContext = createContext<StatusesContext>({
    statuses: [],
    // lastSelectedDays: 0,
});

type Props = {
    startDate: Date;
    endDate?: Date;
    // selectedDays: number;
    habitId?: string;
    children: React.ReactNode;
};

export const StatusesProvider = ({
    startDate,
    endDate,
    // selectedDays,
    habitId,
    children,
}: Props) => {
    const [statuses, setStatuses] = useState<Status[]>([]);
    // const [lastSelectedDays, setLastSelectedDays] = useState<number>(0);
    const userId = useUserId();

    useEffect(() => {
        // const dayInPast = dayjs().subtract(selectedDays, "days").toDate();

        const conditions = [where("date", ">=", Timestamp.fromDate(startDate))];

        if (endDate) {
            conditions.push(where("date", "<=", Timestamp.fromDate(endDate)));
        }

        if (habitId) {
            conditions.push(where("habitId", "==", habitId));
        }

        const q = query(
            collection(db, `users/${userId}/statuses`),
            ...conditions,
        );

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            setStatuses(querySnapshot.docs.map(createStatusFromDocument));
            // setLastSelectedDays(selectedDays);
        });

        return () => unsubscribe();
    }, [userId, startDate, endDate, habitId]);

    return (
        <StatusesContext.Provider value={{ statuses }}>
            {children}
        </StatusesContext.Provider>
    );
};

export const useStatusesContext = () => {
    const context = useContext(StatusesContext);

    if (context === null) {
        throw new Error(
            "Hook useStatusesContext must be used within StatusesContextProvider",
        );
    }

    return context;
};
