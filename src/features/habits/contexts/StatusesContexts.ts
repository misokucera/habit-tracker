import { QueryDocumentSnapshot, DocumentData } from "firebase/firestore";
import { createContext } from "react";
import { z } from "zod";

export const createStatusFromDocument = (
    doc: QueryDocumentSnapshot<DocumentData>,
): Status => {
    return statusSchema.parse({
        id: doc.id,
        ...doc.data(),
        date: doc.data().date.toDate(),
    });
};

export const statusSchema = z.object({
    id: z.string(),
    habitId: z.string(),
    date: z.date(),
});

export type Status = z.infer<typeof statusSchema>;

type StatusesContext = {
    statuses: Status[];
    lastSelectedDays: number;
};

export const StatusesContext = createContext<StatusesContext>({
    statuses: [],
    lastSelectedDays: 0,
});
