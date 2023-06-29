"use client";

import WithAuthentication from "@/features/auth/components/WithAuthentication";
import HabitList from "@/features/habits/components/HabitList";
import HabitsProvider from "@/features/habits/components/HabitsProvider";
import StatusesProvider from "@/features/statuses/components/StatusesProvider";
import Link from "next/link";

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center p-24">
            <WithAuthentication>
                <HabitsProvider>
                    <StatusesProvider>
                        <HabitList />
                    </StatusesProvider>
                </HabitsProvider>
            </WithAuthentication>
        </main>
    );
}
