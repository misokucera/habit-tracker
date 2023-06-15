"use client";

import { auth } from "@/services/firebase";
import {
    AuthProvider,
    GoogleAuthProvider,
    signInWithPopup,
} from "firebase/auth";
import { useUser } from "../hooks/useUser";

const provider = new GoogleAuthProvider();

const SignInForm = () => {
    const { user, loading } = useUser();

    const singIn = (provider: AuthProvider) => {
        signInWithPopup(auth, provider);
    };

    const signOut = () => {
        auth.signOut();
    };

    return (
        <div>
            {loading && <div>Loading...</div>}

            {!loading && user !== null && (
                <button onClick={signOut}>Log out</button>
            )}

            {!loading && user === null && (
                <button
                    className="bg-white px-4 py-2 rounded-md border"
                    onClick={() => singIn(provider)}
                >
                    Sign in with Google
                </button>
            )}
        </div>
    );
};

export default SignInForm;
