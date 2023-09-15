"use client";

import Headline from "@/components/ui/Headline";
import Button from "@/components/ui/Button";
import { editHabit, removeHabit } from "../services/habits";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Dialog from "@/components/ui/Dialog";
import HabitForm, { HabitFormValues } from "./HabitForm";
import { useUserId } from "@/features/auth/hooks/useUserId";
import StatusList from "./StatusList";
import { RadioGroup } from "@headlessui/react";
import StatusPeriodOption from "./StatusPeriodOption";
import { HiArrowLeft } from "react-icons/hi";
import Link from "next/link";
import { useHabitsContext } from "../contexts/HabitsContexts";
import { StatusesProvider } from "../contexts/StatusesContexts";

type Props = {
    habitId: string;
};

const HabitDetail = ({ habitId }: Props) => {
    const { habits } = useHabitsContext();
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
            <div className="mb-2 flex items-center justify-between gap-3">
                <Link
                    href="/"
                    className="group inline-flex items-center gap-1 text-sm font-medium text-slate-400 underline-offset-2 hover:text-violet-400 hover:underline focus:text-violet-400 focus:underline focus:outline-none"
                >
                    <HiArrowLeft className="transition-transform group-hover:-translate-x-1" />
                    Back to list
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
            <div className="mb-5 flex items-center justify-between gap-3">
                <div className="flex-1">
                    <Headline>{habit.name}</Headline>
                </div>
            </div>
            {habit.description && <p className="mb-5">{habit.description}</p>}
            <RadioGroup value={selectedDays} onChange={setSelectedDays}>
                <RadioGroup.Label className="mb-3 block text-sm text-slate-500">
                    Period
                </RadioGroup.Label>
                <div className="mb-5 inline-flex overflow-hidden rounded-md focus-within:ring-2 focus-within:ring-violet-200 focus-within:ring-offset-2">
                    <RadioGroup.Option
                        value={7}
                        className="focus-visible: focus:outline-none"
                    >
                        {({ checked }) => (
                            <StatusPeriodOption checked={checked}>
                                7 days
                            </StatusPeriodOption>
                        )}
                    </RadioGroup.Option>
                    <RadioGroup.Option
                        value={30}
                        className="focus:outline-none"
                    >
                        {({ checked }) => (
                            <StatusPeriodOption checked={checked}>
                                30 days
                            </StatusPeriodOption>
                        )}
                    </RadioGroup.Option>
                    <RadioGroup.Option
                        value={100}
                        className="focus:outline-none"
                    >
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
