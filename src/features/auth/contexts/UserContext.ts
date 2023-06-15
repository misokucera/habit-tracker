import { User } from "firebase/auth";
import { createContext } from "react";

type UserContext = {
    user: User | null;
    loading: boolean;
};

export const UserContext = createContext<UserContext>({
    user: null,
    loading: true,
});
