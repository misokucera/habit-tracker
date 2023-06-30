"use client";

import { auth } from "@/services/firebase";
import {
    AuthProvider,
    GoogleAuthProvider,
    signInWithPopup,
} from "firebase/auth";
import { FcGoogle } from "react-icons/fc";

const provider = new GoogleAuthProvider();

const SignInForm = () => {
    const singIn = (provider: AuthProvider) => {
        signInWithPopup(auth, provider);
    };

    return (
        <div>
            <button
                className="inline-flex items-center gap-3 px-4 py-2 rounded-md border text-sm whitespace-nowrap"
                onClick={() => singIn(provider)}
            >
                <FcGoogle />
                Sign in with Google
            </button>
        </div>
    );
};

export default SignInForm;
