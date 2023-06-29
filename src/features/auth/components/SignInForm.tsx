"use client";

import { auth } from "@/services/firebase";
import {
    AuthProvider,
    GoogleAuthProvider,
    signInWithPopup,
} from "firebase/auth";
import { useAuth } from "../hooks/useAuth";

const provider = new GoogleAuthProvider();

const SignInForm = () => {
    const singIn = (provider: AuthProvider) => {
        signInWithPopup(auth, provider);
    };

    return (
        <div>
            <button
                className="bg-white px-4 py-2 rounded-md border"
                onClick={() => singIn(provider)}
            >
                Sign in with Google
            </button>
        </div>
    );
};

export default SignInForm;
