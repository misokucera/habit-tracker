import React, { ComponentProps } from "react";
import { forwardRef } from "react";
import { VariantProps, cva } from "class-variance-authority";
import { twMerge } from "tailwind-merge";

const variants = cva(
    "inline-flex h-10 w-10 items-center justify-center rounded-full transition-colors focus:outline-none",
    {
        variants: {
            variant: {
                light: "text-slate-300 hover:bg-slate-100 hover:text-slate-500 focus-visible:bg-slate-100  focus-visible:text-slate-500",
                normal: "text-slate-500 hover:bg-slate-200 hover:text-slate-700 focus-visible:bg-slate-200 focus-visible:text-slate-700",
            },
        },
    },
);

type Props = ComponentProps<"button"> & VariantProps<typeof variants>;

const IconButton = forwardRef<HTMLButtonElement, Props>(
    ({ children, variant = "normal", className, ...props }: Props, ref) => {
        return (
            <button
                {...props}
                ref={ref}
                className={twMerge(variants({ variant }), className)}
            >
                {children}
            </button>
        );
    },
);

IconButton.displayName = "IconButton";

export default IconButton;
