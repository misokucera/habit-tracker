import { useAuth } from "./useAuth";

export const useUserId = (): string => {
    const { user } = useAuth();

    if (user === null) {
        throw new Error("User is not defined.");
    }

    return user.uid;
};
