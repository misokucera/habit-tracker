import { QueryDocumentSnapshot, DocumentData } from "firebase/firestore";
import { createContext } from "react";
import { z } from "zod";

export const createHabitFromDocument = (
    doc: QueryDocumentSnapshot<DocumentData>,
): Habit => {
    return habitSchema.parse({
        id: doc.id,
        ...doc.data(),
    });
};

export const habitSchema = z.object({
    id: z.string(),
    name: z.string(),
    description: z.optional(z.string()),
    days: z.array(z.number()),
    order: z.number(),
});

export type Habit = z.infer<typeof habitSchema>;

type HabitsContext = {
    habits: Habit[];
    fetching: boolean;
    reorder: (reorderedHabits: Habit[]) => void;
};

export const HabitsContext = createContext<HabitsContext>({
    habits: [],
    reorder: () => {},
    fetching: true,
});
