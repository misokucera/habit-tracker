import React from "react";
import { forwardRef } from "react";
import { VariantProps, cva } from "class-variance-authority";

const variants = cva(
    "inline-flex h-10 w-10 items-center justify-center rounded-full  transition-colors hover:bg-slate-100",
    {
        variants: {
            variant: {
                light: "text-slate-300 hover:text-slate-500",
                normal: "text-slate-500",
            },
        },
    },
);

type Props = {
    children: React.ReactNode;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
} & VariantProps<typeof variants>;

const IconButton = forwardRef<HTMLButtonElement, Props>(
    ({ children, onClick, variant = "normal", ...props }: Props, ref) => {
        return (
            <button
                {...props}
                onClick={onClick}
                ref={ref}
                className={variants({ variant })}
            >
                {children}
            </button>
        );
    },
);

IconButton.displayName = "IconButton";

export default IconButton;
