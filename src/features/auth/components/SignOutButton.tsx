"use client";

import { auth } from "@/services/firebase";

const SignOutButton = () => {
    const signOut = () => {
        auth.signOut();
    };

    return (
        <button onClick={signOut} className="text-sm font-semibold text-white">
            Sign out
        </button>
    );
};

export default SignOutButton;
