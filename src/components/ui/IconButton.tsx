import classNames from "classnames";
import React from "react";
import { forwardRef } from "react";

type Props = {
    children: React.ReactNode;
    variant?: "light" | "normal";
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

const IconButton = forwardRef<HTMLButtonElement, Props>(
    ({ children, onClick, variant = "normal", ...props }: Props, ref) => {
        return (
            <button
                {...props}
                onClick={onClick}
                ref={ref}
                className={classNames(
                    "inline-flex items-center justify-center w-10 h-10 rounded-full  hover:bg-slate-100 transition-colors",
                    {
                        "text-slate-300 hover:text-slate-500":
                            variant === "light",
                        "text-slate-500": variant === "normal",
                    }
                )}
            >
                {children}
            </button>
        );
    }
);

IconButton.displayName = "IconButton";

export default IconButton;
