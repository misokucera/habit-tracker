import React from "react";
import { forwardRef } from "react";

type Props = {
    children: React.ReactNode;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

const IconButton = forwardRef<HTMLButtonElement, Props>(
    ({ children, onClick, ...props }: Props, ref) => {
        return (
            <button
                {...props}
                onClick={onClick}
                ref={ref}
                className="inline-flex items-center justify-center w-10 h-10 rounded-full text-slate-300 hover:text-slate-500 hover:bg-slate-100 transition-colors"
            >
                {children}
            </button>
        );
    }
);

IconButton.displayName = "IconButton";

export default IconButton;
