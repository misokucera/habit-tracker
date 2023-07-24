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
                className="inline-flex items-center gap-3 whitespace-nowrap rounded-md border px-4 py-2 text-sm"
                onClick={() => singIn(provider)}
            >
                <FcGoogle />
                Sign in with Google
            </button>
            <div className="relative mb-5 mt-10">
                <hr />
                <span className="relative -top-3 bg-white px-4 text-xs text-slate-500">
                    OR
                </span>
            </div>
            <button
                className="inline-flex items-center gap-3 whitespace-nowrap rounded-md border px-4 py-2 text-sm"
                onClick={() => signInAnonymously(auth)}
            >
                Sign in Anonymously
            </button>
        </div>
    );
};

export default SignInForm;
