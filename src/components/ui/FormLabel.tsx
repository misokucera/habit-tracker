import React from "react";

type Props = {
    children: React.ReactNode;
    caption: string;
};

const FormLabel = ({ children, caption }: Props) => {
    return (
        <label className="flex flex-col my-6">
            <span className="text-sm mb-2 text-slate-500">{caption}</span>
            {children}
        </label>
    );
};

export default FormLabel;
