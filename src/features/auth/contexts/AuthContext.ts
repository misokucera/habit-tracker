import { User } from "firebase/auth";
import { createContext } from "react";

type AuthContext = {
    user: User | null;
};

export const AuthContext = createContext<AuthContext>({
    user: null,
});
