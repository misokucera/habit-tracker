import React from "react";

type Props = {
    children: React.ReactNode;
    caption: string;
};

const FormLabel = ({ children, caption }: Props) => {
    return (
        <label className="flex flex-col gap-2 my-6">
            <span className="text-sm text-slate-500">{caption}</span>
            {children}
        </label>
    );
};

export default FormLabel;
