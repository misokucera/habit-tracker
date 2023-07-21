"use client";

import Headline from "@/components/ui/Headline";
import Button from "@/components/ui/Button";
import { editHabit, removeHabit } from "../services/habits";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Dialog from "@/components/ui/Dialog";
import HabitForm, { HabitFormValues } from "./HabitForm";
import { useUserId } from "@/features/auth/hooks/useUserId";
import StatusesProvider from "./StatusesProvider";
import StatusList from "./StatusList";
import { RadioGroup } from "@headlessui/react";
import StatusPeriodOption from "./StatusPeriodOption";
import { useHabits } from "../hooks/useHabits";
import { HiArrowLeft } from "react-icons/hi";
import Link from "next/link";

type Props = {
    habitId: string;
};

const HabitDetail = ({ habitId }: Props) => {
    const { habits } = useHabits();
    const userId = useUserId();
    const { replace } = useRouter();
    const [openRemoveDialog, setOpenRemoveDialog] = useState(false);
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [selectedDays, setSelectedDays] = useState(7);

    const habit = habits.find((item) => item.id === habitId);

    const handleRemove = async () => {
        removeHabit(userId, habitId);
        replace("/");
    };

    const handleRemoveDialogClose = () => {
        setOpenRemoveDialog(false);
    };

    const handleEdit = async (data: HabitFormValues) => {
        setOpenEditDialog(false);
        await editHabit(userId, habitId, data);
    };

    if (!habit) {
        return null;
    }

    return (
        <div>
            <div className="flex items-center justify-between gap-3 mb-2">
                <Link href="/">
                    <button className="text-sm inline-flex gap-2 items-center text-slate-400">
                        <HiArrowLeft /> Back to list
                    </button>
                </Link>
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
            <div className="flex items-center justify-between gap-3 mb-5">
                <div className="flex-1">
                    <Headline>{habit.name}</Headline>
                </div>
            </div>
            {habit.description && <p>{habit.description}</p>}
            <RadioGroup value={selectedDays} onChange={setSelectedDays}>
                <RadioGroup.Label className="block mb-3">
                    Period
                </RadioGroup.Label>
                <div className="inline-flex mb-5 rounded-md overflow-hidden">
                    <RadioGroup.Option value={7}>
                        {({ checked }) => (
                            <StatusPeriodOption checked={checked}>
                                7 days
                            </StatusPeriodOption>
                        )}
                    </RadioGroup.Option>
                    <RadioGroup.Option value={30}>
                        {({ checked }) => (
                            <StatusPeriodOption checked={checked}>
                                30 days
                            </StatusPeriodOption>
                        )}
                    </RadioGroup.Option>
                    <RadioGroup.Option value={100}>
                        {({ checked }) => (
                            <StatusPeriodOption checked={checked}>
                                100 days
                            </StatusPeriodOption>
                        )}
                    </RadioGroup.Option>
                </div>
            </RadioGroup>
            <StatusesProvider selectedDays={selectedDays} habitId={habitId}>
                <StatusList habitId={habitId} selectedDays={selectedDays} />
            </StatusesProvider>
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
                title="Edit habit"
                maxWidth="lg"
                showCloseButton
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
