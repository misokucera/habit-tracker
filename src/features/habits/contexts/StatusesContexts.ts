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
        type: doc.data()?.type ?? "success",
    });
};

export const statusSchema = z.object({
    id: z.string(),
    habitId: z.string(),
    type: z.union([
        z.literal("unknown"),
        z.literal("success"),
        z.literal("failure"),
        z.literal("blocker"),
    ]),
    date: z.date(),
});

export type Status = z.infer<typeof statusSchema>;
export type StatusType = Status["type"];

type StatusesContext = {
    statuses: Status[];
    lastSelectedDays: number;
};

export const StatusesContext = createContext<StatusesContext>({
    statuses: [],
    lastSelectedDays: 0,
});
