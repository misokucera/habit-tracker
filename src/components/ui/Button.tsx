import React from "react";

type Props = {
    children: React.ReactNode;
    type?: "submit" | "button";
    variant?: "primary" | "secondary";
    onClick?: () => void;
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
            "focus:ring-sky-200"
        );
    }

    if (variant === "secondary") {
        variantClasses.push(
            "bg-slate-200",
            "hover:bg-slate-300",
            "text-slate-500",
            "hover:text-slate-600",
            "focus:ring-slate-100"
        );
    }

    return (
        <button
            className={`px-4 py-2 rounded font-semibold text-sm ${variantClasses.join(
                " "
            )}  transition-colors focus:outline-none focus:ring-4 focus:ring-offset-0`}
            onClick={onClick}
            type={type}
        >
            {children}
        </button>
    );
};

export default Button;
