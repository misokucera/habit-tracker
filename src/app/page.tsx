"use client";

import WithAuthentication from "@/features/auth/components/WithAuthentication";
import HabitList from "@/features/habits/components/HabitList";
import HabitsProvider from "@/features/habits/components/HabitsProvider";
import StatusesProvider from "@/features/statuses/components/StatusesProvider";

export default function Home() {
    return (
        <main className="flex min-h-screen items-center p-8 md:p-24">
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
