import { VariantProps, cva } from "class-variance-authority";
import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

const variants = cva(
    "rounded-md px-5 py-3 text-sm font-semibold transition-colors focus:outline-none focus-visible:ring-4",
    {
        variants: {
            variant: {
                primary:
                    "bg-sky-400 text-white hover:bg-sky-500 focus-visible:ring-sky-200",
                secondary:
                    "bg-sky-100 text-sky-700 hover:bg-sky-200 hover:text-sky-800 focus-visible:ring-sky-200",
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
