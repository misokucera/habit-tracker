"use client";

import React, { useEffect, useState } from "react";
import { Habit, HabitsContext } from "../contexts/HabitsContexts";
import { db } from "@/services/firebase";
import {
    query,
    collection,
    onSnapshot,
    Unsubscribe,
    orderBy,
} from "firebase/firestore";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { reorderHabits } from "../services/habits";

type Props = {
    children: React.ReactNode;
};

const HabitsProvider = ({ children }: Props) => {
    const [habits, setHabits] = useState<Habit[]>([]);
    const [fetching, setFetching] = useState<boolean>(true);
    const { user } = useAuth();

    useEffect(() => {
        let unsubscribe: Unsubscribe;

        if (user) {
            const q = query(
                collection(db, `users/${user.uid}/habits`),
                orderBy("order")
            );
            setFetching(true);
            unsubscribe = onSnapshot(q, (querySnapshot) => {
                const habitsFromSnapshot: Habit[] = [];

                querySnapshot.forEach((doc) => {
                    const { name, description, days, order } = doc.data();

                    habitsFromSnapshot.push({
                        id: doc.id,
                        name,
                        description,
                        days,
                        order,
                    });
                });

                setHabits(habitsFromSnapshot);
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

export default HabitsProvider;
