"use client";

import { useState } from "react";
import CreateHabitDialog from "./CreateHabitDialog";
import { useHabits } from "../hooks/useHabits";
import { CreateHabitFormInput } from "./CreateHabitForm";

const HabitList = () => {
    const { addHabit } = useHabits();
    const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(true);

    const handleFormSubmit = async (data: CreateHabitFormInput) => {
        setIsCreateDialogOpen(false);
        await addHabit(data.name, data.description, data.color, data.days);
    };

    return (
        <div>
            <button
                onClick={() => setIsCreateDialogOpen(true)}
                className="px-4 py-2 text-sm bg-blue-100 hover:bg-blue-200 text-blue-800 font-semibold rounded transition-colors"
            >
                Add new habit
            </button>
            <CreateHabitDialog
                open={isCreateDialogOpen}
                onClose={() => setIsCreateDialogOpen(false)}
                onFormSubmit={handleFormSubmit}
            />
        </div>
    );
};

export default HabitList;
