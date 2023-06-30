"use client";

import { auth } from "@/services/firebase";

const SignOutButton = () => {
    const signOut = () => {
        auth.signOut();
    };

    return (
        <button onClick={signOut} className="border rounded px-4 py-2 text-sm">
            Sign out
        </button>
    );
};

export default SignOutButton;
