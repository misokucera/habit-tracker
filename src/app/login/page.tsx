"use client";

import SignInForm from "@/features/auth/components/SignInForm";
import WithoutAuthentication from "@/features/auth/components/WithoutAuthentication";
import { GiAbstract107 } from "react-icons/gi";

export default function Login() {
    return (
        <WithoutAuthentication>
            <main className="flex min-h-screen justify-center p-8 md:p-24 bg-gradient-to-b from-sky-400 to-purple-400">
                <div className="text-center ">
                    <p className="inline-flex gap-1 items-center font-bold text-white mb-8">
                        <GiAbstract107 className="w-6 h-6" />
                        HabitTracker
                    </p>
                    <div className="bg-white py-14 px-10 rounded-lg">
                        <h1 className="inline-block font-bold text-3xl bg-clip-text text-transparent bg-gradient-to-r from-sky-400 to-purple-400 mb-5">
                            Welcome
                        </h1>
                        <p className="max-w-xs text-sm text-slate-500 mb-10">
                            Start tracking your habits after sign in with
                            options below
                        </p>
                        <SignInForm />
                    </div>
                </div>
            </main>
        </WithoutAuthentication>
    );
}
