"use client";

import Headline from "@/components/ui/Headline";
import { useHabit } from "../hooks/useHabit";
import Button from "@/components/ui/Button";
import { removeHabit } from "../services/habits";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { redirect, useRouter } from "next/navigation";
import { useState } from "react";
import Dialog from "@/components/ui/Dialog";

type Props = {
    habitId: string;
};

const HabitDetail = ({ habitId }: Props) => {
    const { habit, loading } = useHabit(habitId);
    const { user } = useAuth();
    const { push } = useRouter();
    const [openRemoveDialog, setOpenRemoveDialog] = useState(false);

    const handleRemove = async () => {
        if (user) {
            await removeHabit(user?.uid, habitId);
            push("/");
        }
    };

    if (loading || habit === null) {
        return null;
    }

    const handleRemoveDialogClose = () => {
        setOpenRemoveDialog(false);
    };

    return (
        <div>
            <div className="flex items-center justify-between gap-5 mb-5">
                <Headline>{habit.name}</Headline>
                <div>
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
        </div>
    );
};

export default HabitDetail;
