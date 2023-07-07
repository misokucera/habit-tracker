"use client";

import React, { useEffect, useState } from "react";
import { Habit, HabitsContext } from "../contexts/HabitsContexts";
import { db } from "@/services/firebase";
import { query, collection, onSnapshot, Unsubscribe } from "firebase/firestore";
import { useUserId } from "@/features/auth/hooks/useUserId";
import { useAuth } from "@/features/auth/hooks/useAuth";

type Props = {
    children: React.ReactNode;
};

const HabitsProvider = ({ children }: Props) => {
    const [habits, setHabits] = useState<Habit[]>([]);
    const { user } = useAuth();

    useEffect(() => {
        let unsubscribe: Unsubscribe;

        if (user) {
            const q = query(collection(db, `users/${user.uid}/habits`));
            unsubscribe = onSnapshot(q, (querySnapshot) => {
                const habitsFromSnapshot: Habit[] = [];

                querySnapshot.forEach((doc) => {
                    const { name, description, days } = doc.data();
                    habitsFromSnapshot.push({
                        id: doc.id,
                        name,
                        description,
                        days,
                    });
                });

                setHabits(habitsFromSnapshot);
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

    return (
        <HabitsContext.Provider value={{ habits }}>
            {children}
        </HabitsContext.Provider>
    );
};

export default HabitsProvider;
