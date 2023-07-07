"use client";

import Breadcrumbs from "@/components/ui/Breadcrumbs";
import ContentBox from "@/components/ui/ContentBox";
import SignOutButton from "@/features/auth/components/SignOutButton";
import WithAuthentication from "@/features/auth/components/WithAuthentication";
import HabitList from "@/features/habits/components/HabitList";
import HabitsProvider from "@/features/habits/components/HabitsProvider";
import StatusesProvider from "@/features/habits/components/StatusesProvider";

export default function Home() {
    return (
        <WithAuthentication>
            <div className="w-full max-w-5xl">
                <div className="flex items-center justify-between gap-3 mb-5">
                    <Breadcrumbs />
                    <SignOutButton />
                </div>
                <ContentBox>
                    <HabitList />
                </ContentBox>
            </div>
        </WithAuthentication>
    );
}
