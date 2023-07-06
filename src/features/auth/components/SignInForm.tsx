"use client";

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
            <button
                className="inline-flex items-center gap-3 px-4 py-2 rounded-md border text-sm whitespace-nowrap"
                onClick={() => singIn(provider)}
            >
                <FcGoogle />
                Sign in with Google
            </button>
            <div className="relative mt-10 mb-5">
                <hr />
                <span className="relative -top-3 bg-white text-xs text-slate-500 px-4">
                    OR
                </span>
            </div>
            <button
                className="inline-flex items-center gap-3 px-4 py-2 rounded-md border text-sm whitespace-nowrap"
                onClick={() => signInAnonymously(auth)}
            >
                Sign in Anonymously
            </button>
        </div>
    );
};

export default SignInForm;
