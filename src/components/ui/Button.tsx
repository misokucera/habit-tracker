import { VariantProps, cva } from "class-variance-authority";
import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

const variants = cva(
    "rounded px-4 py-2 text-sm font-semibold transition-colors focus:outline-none focus-visible:ring-4",
    {
        variants: {
            variant: {
                primary:
                    "bg-sky-400 text-white hover:bg-sky-500 focus-visible:ring-sky-200",
                secondary:
                    "bg-slate-200 text-slate-500 hover:bg-slate-300 hover:text-slate-600 focus-visible:ring-slate-100",
            },
        },
    },
);

type Props = ComponentProps<"button"> & VariantProps<typeof variants>;

const Button = ({
    children,
    variant = "primary",
    className,
    ...props
}: Props) => {
    return (
        <button
            {...props}
            className={twMerge(variants({ variant }), className)}
        >
            {children}
        </button>
    );
};

export default Button;
