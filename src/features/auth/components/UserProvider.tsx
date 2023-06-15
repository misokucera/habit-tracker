"use client";

import React, { useEffect, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import { User, onAuthStateChanged } from "firebase/auth";
import { auth } from "@/services/firebase";

type Props = {
    children: React.ReactNode;
};

const UserProvider = ({ children }: Props) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            console.log("user from provider", user);
            setUser(user);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    return (
        <UserContext.Provider value={{ user, loading }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;
