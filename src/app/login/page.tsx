"use client";

import Breadcrumbs from "@/components/ui/Breadcrumbs";
import SignInForm from "@/features/auth/components/SignInForm";
import WithoutAuthentication from "@/features/auth/components/WithoutAuthentication";
import ContentBox from "@/components/ui/ContentBox";
import Headline from "@/components/ui/Headline";

export default function Login() {
    return (
        <WithoutAuthentication>
            <div className="text-center ">
                <div className="mb-5">
                    <Breadcrumbs segments={["welcome"]} />
                </div>
                <ContentBox>
                    <div className="py-5">
                        <div className="mb-5">
                            <Headline>Welcome</Headline>
                        </div>
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
