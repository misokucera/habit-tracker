import SignInForm from "@/features/auth/components/SignInForm";
import UserProvider from "@/features/auth/components/UserProvider";
import HabitList from "@/features/habits/components/HabitList";
import HabitsProvider from "@/features/habits/components/HabitsProvider";
import StatusesProvider from "@/features/statuses/components/StatusesProvider";

export default function Home() {
    return (
        <UserProvider>
            <main className="flex min-h-screen flex-col items-center p-24">
                <div className="border rounded p-5 mb-10">
                    <SignInForm />
                </div>

                <HabitsProvider>
                    <StatusesProvider>
                        <HabitList />
                    </StatusesProvider>
                </HabitsProvider>
            </main>
        </UserProvider>
    );
}
