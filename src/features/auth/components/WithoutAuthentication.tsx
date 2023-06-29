import React, { useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { redirect } from "next/navigation";

type Props = {
    children: React.ReactNode;
};

const WithoutAuthentication = ({ children }: Props) => {
    const { user } = useAuth();

    useEffect(() => {
        if (user !== null) {
            redirect("/");
        }
    }, [user]);

    if (user !== null) {
        return null;
    }

    return <>{children}</>;
};

export default WithoutAuthentication;
