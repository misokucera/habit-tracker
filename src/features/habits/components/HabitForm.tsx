"use client";

import { FormProvider, useForm } from "react-hook-form";
import FormLabel from "../../../components/ui/FormLabel";
import DaysSelector from "./DaysSelector";
import Button from "@/components/ui/Button";

export type HabitFormValues = {
    name: string;
    description: string;
    days: number[];
};

type Props = {
    onSubmit: (data: HabitFormValues) => Promise<void>;
    defaultValues?: HabitFormValues;
};

const HabitForm = ({ onSubmit, defaultValues }: Props) => {
    const formMethods = useForm<HabitFormValues>({
        defaultValues,
    });

    const { handleSubmit, register } = formMethods;

    const onValid = async (data: HabitFormValues) => {
        await onSubmit(data);
    };

    return (
        <FormProvider {...formMethods}>
            <form onSubmit={handleSubmit(onValid)}>
                <FormLabel caption="Name">
                    <input
                        className="p-3 max-w-xs rounded-md focus:outline-none focus:border-slate-500  border-2 border-slate-200"
                        placeholder="What you want to do?"
                        {...register("name")}
                    />
                </FormLabel>
                <FormLabel caption="Description">
                    <textarea
                        className="p-3 rounded-md focus:outline-none focus:border-slate-500  border-2 border-slate-200"
                        placeholder="Why do you want to do it?"
                        {...register("description")}
                    ></textarea>
                </FormLabel>
                <div className="mb-5">
                    <p className="text-sm mb-2 text-slate-500">Days</p>
                    <DaysSelector />
                </div>
                <div className="mt-10">
                    <Button type="submit">
                        {defaultValues ? "Edit" : "Create"}
                    </Button>
                </div>
            </form>
        </FormProvider>
    );
};

export default HabitForm;
