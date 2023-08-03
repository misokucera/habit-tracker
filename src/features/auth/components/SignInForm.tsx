"use client";

import Button from "@/components/ui/Button";
import { auth } from "@/services/firebase";
import {
    AuthProvider,
    GoogleAuthProvider,
    signInAnonymously,
    signInWithPopup,
} from "firebase/auth";
import { FcGoogle } from "react-icons/fc";

const provider = new GoogleAuthProvider();

const SignInForm = () => {
    const singIn = (provider: AuthProvider) => {
        signInWithPopup(auth, provider);
    };

    return (
        <div className="">
            <Button
                variant="secondary"
                className="inline-flex items-center gap-2"
                onClick={() => singIn(provider)}
            >
                <div className="rounded-full bg-white p-1">
                    <FcGoogle />
                </div>
                Sign in with Google
            </Button>
            <div className="relative mb-5 mt-10">
                <hr />
                <span className="relative -top-3 bg-white px-4 text-xs text-slate-500">
                    OR
                </span>
            </div>
            <Button variant="secondary" onClick={() => signInAnonymously(auth)}>
                Sign in Anonymously
            </Button>
        </div>
    );
};

export default SignInForm;
