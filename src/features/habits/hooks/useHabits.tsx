import { useContext } from "react";
import { HabitsContext } from "../contexts/HabitsContexts";

export const useHabits = () => {
    const { habits } = useContext(HabitsContext);

    return { habits };
};
