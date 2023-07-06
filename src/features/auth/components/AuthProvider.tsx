"use client";

import React, { useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { User, onAuthStateChanged } from "firebase/auth";
import { auth } from "@/services/firebase";

type Props = {
    children: React.ReactNode;
    fallback?: React.ReactNode;
};

const AuthProvider = ({ children, fallback }: Props) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    if (loading && fallback) {
        return <>{fallback}</>;
    }

    return (
        <>
            <AuthContext.Provider value={{ user }}>
                {children}
            </AuthContext.Provider>
        </>
    );
};

export default AuthProvider;
