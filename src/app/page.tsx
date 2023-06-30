"use client";

import SignOutButton from "@/features/auth/components/SignOutButton";
import WithAuthentication from "@/features/auth/components/WithAuthentication";
import HabitList from "@/features/habits/components/HabitList";
import HabitsProvider from "@/features/habits/components/HabitsProvider";
import StatusesProvider from "@/features/statuses/components/StatusesProvider";
import Link from "next/link";

export default function Home() {
    return (
        <main className="min-h-screen p-8 md:p-24">
            <WithAuthentication>
                <div className="flex gap-5 items-center justify-between mb-5">
                    <Link
                        href="/"
                        className="text-2xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-sky-400 to-purple-400"
                    >
                        Habit Tracker
                    </Link>
                    <SignOutButton />
                </div>
                <HabitsProvider>
                    <StatusesProvider>
                        <HabitList />
                    </StatusesProvider>
                </HabitsProvider>
            </WithAuthentication>
        </main>
    );
}
