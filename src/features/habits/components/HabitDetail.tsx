"use client";

import Headline from "@/components/ui/Headline";
import { useHabit } from "../hooks/useHabit";
import Button from "@/components/ui/Button";
import { editHabit, removeHabit } from "../services/habits";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Dialog from "@/components/ui/Dialog";
import HabitForm, { HabitFormValues } from "./HabitForm";

type Props = {
    habitId: string;
};

const HabitDetail = ({ habitId }: Props) => {
    const { habit, loading, refetch } = useHabit(habitId);
    const { user } = useAuth();
    const { replace } = useRouter();
    const [openRemoveDialog, setOpenRemoveDialog] = useState(false);
    const [openEditDialog, setOpenEditDialog] = useState(false);

    const handleRemove = async () => {
        if (user) {
            await removeHabit(user?.uid, habitId);
            replace("/");
        }
    };

    if (loading || habit === null) {
        return null;
    }

    const handleRemoveDialogClose = () => {
        setOpenRemoveDialog(false);
    };

    const handleEdit = async (data: HabitFormValues) => {
        if (user) {
            setOpenEditDialog(false);
            await editHabit(user?.uid, habitId, data);
            refetch();
        }
    };

    return (
        <div>
            <div className="flex items-center justify-between gap-5 mb-5">
                <Headline>{habit.name}</Headline>
                <div className="flex gap-3">
                    <Button
                        variant="primary"
                        onClick={() => setOpenEditDialog(true)}
                    >
                        Edit
                    </Button>
                    <Button
                        variant="secondary"
                        onClick={() => setOpenRemoveDialog(true)}
                    >
                        Remove
                    </Button>
                </div>
            </div>
            {habit.description && <p>{habit.description}</p>}
            <Dialog
                open={openRemoveDialog}
                onClose={handleRemoveDialogClose}
                title="Remove this habit?"
                description="Habit will be permanently removed."
            >
                <div className="flex gap-3">
                    <Button variant="primary" onClick={handleRemove}>
                        Remove
                    </Button>
                    <Button
                        variant="secondary"
                        onClick={handleRemoveDialogClose}
                    >
                        Cancel
                    </Button>
                </div>
            </Dialog>
            <Dialog
                open={openEditDialog}
                onClose={() => setOpenEditDialog(false)}
                title="Edit"
            >
                <HabitForm
                    onSubmit={handleEdit}
                    defaultValues={{
                        name: habit.name,
                        description: habit.description || "",
                        days: habit.days,
                    }}
                />
            </Dialog>
        </div>
    );
};

export default HabitDetail;
