import SignInForm from "@/features/auth/components/SignInForm";
import UserProvider from "@/features/auth/components/UserProvider";
import HabitList from "@/features/habits/components/HabitList";

export default function Home() {
    return (
        <UserProvider>
            <main className="flex min-h-screen flex-col items-center p-24">
                <div className="border rounded p-5 mb-10">
                    <SignInForm />
                </div>
                <HabitList />
            </main>
        </UserProvider>
    );
}
