"use client";

import LinkButton from "@/components/ui/LinkButton";
import { auth } from "@/services/firebase";

const SignOutButton = () => {
    const signOut = () => {
        auth.signOut();
    };

    return (
        <LinkButton className="font-mono font-semibold" onClick={signOut}>
            Sign out
        </LinkButton>
    );
};

export default SignOutButton;
