import React from "react";

type Props = {
    children: React.ReactNode;
    type?: "submit" | "button";
    variant?: "primary" | "secondary";
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

const Button = ({
    onClick,
    children,
    type = "button",
    variant = "primary",
}: Props) => {
    const variantClasses = [];

    if (variant === "primary") {
        variantClasses.push(
            "bg-sky-400",
            "hover:bg-sky-500",
            "text-white",
            "focus-visible:ring-sky-200",
        );
    }

    if (variant === "secondary") {
        variantClasses.push(
            "bg-slate-200",
            "hover:bg-slate-300",
            "text-slate-500",
            "hover:text-slate-600",
            "focus-visible:ring-slate-100",
        );
    }

    return (
        <button
            className={`rounded px-4 py-2 text-sm font-semibold ${variantClasses.join(
                " ",
            )}  transition-colors focus:outline-none focus-visible:ring-4`}
            onClick={onClick}
            type={type}
        >
            {children}
        </button>
    );
};

export default Button;
