import React from "react";

type Props = {
    children: React.ReactNode;
    caption: string;
};

const FormLabel = ({ children, caption }: Props) => {
    return (
        <label className="my-6 flex flex-col gap-2">
            <span className="text-sm text-slate-500">{caption}</span>
            {children}
        </label>
    );
};

export default FormLabel;
