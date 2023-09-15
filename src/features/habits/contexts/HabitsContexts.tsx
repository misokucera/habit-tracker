"use client";

import { useAuth } from "@/features/auth/hooks/useAuth";
import { db } from "@/services/firebase";
import {
    QueryDocumentSnapshot,
    DocumentData,
    Unsubscribe,
    collection,
    onSnapshot,
    orderBy,
    query,
} from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";
import { z } from "zod";
import { reorderHabits } from "../services/habits";

const createHabitFromDocument = (
    doc: QueryDocumentSnapshot<DocumentData>,
): Habit => {
    return schema.parse({
        id: doc.id,
        ...doc.data(),
        dateCreated: doc.data().dateCreated.toDate(),
        dateUpdated: doc.data().dateUpdated.toDate(),
    });
};

const schema = z.object({
    id: z.string(),
    name: z.string(),
    description: z.optional(z.string()),
    days: z.array(z.number()),
    order: z.number(),
    dateCreated: z.date(),
    dateUpdated: z.date(),
});

export type Habit = z.infer<typeof schema>;

type HabitsContext = {
    habits: Habit[];
    fetching: boolean;
    reorder: (reorderedHabits: Habit[]) => void;
};

const HabitsContext = createContext<HabitsContext | null>(null);

type Props = {
    children: React.ReactNode;
};

export const HabitsProvider = ({ children }: Props) => {
    const [habits, setHabits] = useState<Habit[]>([]);
    const [fetching, setFetching] = useState<boolean>(true);
    const { user } = useAuth();

    useEffect(() => {
        let unsubscribe: Unsubscribe;

        if (user) {
            const q = query(
                collection(db, `users/${user.uid}/habits`),
                orderBy("order"),
            );

            setFetching(true);

            unsubscribe = onSnapshot(q, (querySnapshot) => {
                setHabits(querySnapshot.docs.map(createHabitFromDocument));
                setFetching(false);
            });
        } else {
            setHabits([]);
        }

        return () => {
            if (unsubscribe) {
                unsubscribe();
            }
        };
    }, [user]);

    const reorder = (reorderedHabits: Habit[]) => {
        if (user) {
            setHabits(reorderedHabits);
            reorderHabits(user.uid, reorderedHabits);
        }
    };

    return (
        <HabitsContext.Provider value={{ habits, reorder, fetching }}>
            {children}
        </HabitsContext.Provider>
    );
};

export const useHabitsContext = () => {
    const context = useContext(HabitsContext);

    if (context === null) {
        throw new Error(
            "Hook useHabitsContext must be used within HabitContextProvider",
        );
    }

    return context;
};
