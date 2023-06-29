"use client";

import SignInForm from "@/features/auth/components/SignInForm";
import WithoutAuthentication from "@/features/auth/components/WithoutAuthentication";

export default function Login() {
    return (
        <WithoutAuthentication>
            <div className="border rounded p-5 mb-10">
                <SignInForm />
            </div>
        </WithoutAuthentication>
    );
}
