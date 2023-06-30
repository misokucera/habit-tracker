"use client";

import Breadcrumbs from "@/components/ui/Breadcrumbs";
import SignInForm from "@/features/auth/components/SignInForm";
import WithoutAuthentication from "@/features/auth/components/WithoutAuthentication";
import ContentBox from "@/components/ui/ContentBox";

export default function Login() {
    return (
        <WithoutAuthentication>
            <div className="text-center ">
                <div className="mb-5">
                    <Breadcrumbs segments={["welcome"]} />
                </div>
                <ContentBox>
                    <div className="py-5">
                        <h1 className="inline-block font-bold text-3xl bg-clip-text text-transparent bg-gradient-to-r from-sky-400 to-purple-400 mb-5">
                            Welcome
                        </h1>
                        <p className="max-w-xs text-sm text-slate-500 mb-10">
                            Start tracking your habits after sign in with
                            options below
                        </p>
                        <SignInForm />
                    </div>
                </ContentBox>
            </div>
        </WithoutAuthentication>
    );
}
