"use client";

import { FormProvider, useForm } from "react-hook-form";
import FormLabel from "../../../components/ui/FormLabel";
import { useState } from "react";
import ColorRadioGroup from "./ColorRadioGroup";

export type CreateHabitFormInput = {
    name: string;
    description: string;
    color: string;
};

type Props = {
    onSubmit: (data: CreateHabitFormInput) => Promise<void>;
};

const CreateHabitForm = ({ onSubmit }: Props) => {
    const formMethods = useForm<CreateHabitFormInput>();
    const [loading, setLoading] = useState<boolean>(false);

    const { handleSubmit, register } = formMethods;

    const onValid = async (data: CreateHabitFormInput) => {
        console.log(data);
        setLoading(true);
        await onSubmit(data);
        setLoading(false);
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
                <ColorRadioGroup />
                <div className="mt-10">
                    {loading && <div>Loading...</div>}
                    <button
                        className="px-4 py-3 rounded-md font-semibold text-sm bg-sky-200 hover:bg-sky-300 hover:text-sky-700 text-sky-600 transition-colors focus:outline-none focus:ring-2 focus:ring-sky-200 focus:ring-offset-2"
                        type="submit"
                    >
                        Add habit
                    </button>
                </div>
            </form>
        </FormProvider>
    );
};

export default CreateHabitForm;
