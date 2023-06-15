import SignInForm from "@/features/auth/components/SignInForm";
import UserProvider from "@/features/auth/components/UserProvider";

export default function Home() {
    return (
        <UserProvider>
            <main className="flex min-h-screen flex-col items-center justify-between p-24">
                <SignInForm />
            </main>
        </UserProvider>
    );
}
