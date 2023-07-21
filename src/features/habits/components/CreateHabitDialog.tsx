"use client";

import HabitForm, { HabitFormValues } from "./HabitForm";
import Dialog from "@/components/ui/Dialog";

type Props = {
    open: boolean;
    onClose: () => void;
    onFormSubmit: (data: HabitFormValues) => Promise<void>;
};

const CreateHabitDialog = ({ open, onClose, onFormSubmit }: Props) => {
    return (
        <Dialog
            open={open}
            onClose={onClose}
            title="Create new habit"
            description="What would you like to improve in?"
            maxWidth="lg"
            showCloseButton
        >
            <HabitForm onSubmit={onFormSubmit} />
        </Dialog>
    );
};

export default CreateHabitDialog;
