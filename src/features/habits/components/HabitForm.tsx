"use client";

import { FormProvider, useForm } from "react-hook-form";
import FormLabel from "../../../components/ui/FormLabel";
import DaysSelector from "./DaysSelector";
import Button from "@/components/ui/Button";
import Alert from "@/components/ui/Alert";

const nameMaxLength = 50;
const descriptionMaxLength = 150;

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

    const {
        handleSubmit,
        register,
        formState: { errors },
    } = formMethods;

    const onValid = async (data: HabitFormValues) => {
        await onSubmit(data);
    };

    return (
        <FormProvider {...formMethods}>
            <form onSubmit={handleSubmit(onValid)}>
                <FormLabel caption="Name">
                    <input
                        className="max-w-xs rounded-md border-2 border-slate-200 p-3 focus:outline-none focus-visible:border-slate-500"
                        placeholder="What you want to do?"
                        {...register("name", {
                            required: true,
                            maxLength: 50,
                        })}
                        aria-invalid={errors.name ? "true" : "false"}
                    />
                    {errors.name?.type === "required" && (
                        <Alert>
                            <strong>Name</strong> is required.
                        </Alert>
                    )}
                    {errors.name?.type === "maxLength" && (
                        <Alert>
                            Max length for <strong>name</strong> is{" "}
                            {nameMaxLength} characters.
                        </Alert>
                    )}
                </FormLabel>
                <FormLabel caption="Description">
                    <textarea
                        className="rounded-md border-2 border-slate-200 p-3  focus:outline-none focus-visible:border-slate-500"
                        placeholder="Why do you want to do it?"
                        {...register("description", { maxLength: 200 })}
                        aria-invalid={errors.description ? "true" : "false"}
                    ></textarea>
                    {errors.name?.type === "maxLength" && (
                        <Alert>
                            Max length for <strong>description</strong> is{" "}
                            {descriptionMaxLength} characters.
                        </Alert>
                    )}
                </FormLabel>
                <div className="mb-5">
                    <p className="mb-2 text-sm text-slate-500">Days</p>
                    <DaysSelector />
                </div>
                <div className="mt-10">
                    <Button type="submit">
                        {defaultValues ? "Update" : "Create"}
                    </Button>
                </div>
            </form>
        </FormProvider>
    );
};

export default HabitForm;
