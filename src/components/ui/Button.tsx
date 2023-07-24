import classNames from "classnames";

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
    return (
        <button
            className={classNames(
                "rounded px-4 py-2 text-sm font-semibold transition-colors focus:outline-none focus-visible:ring-4",
                {
                    "bg-sky-400 text-white hover:bg-sky-500 focus-visible:ring-sky-200":
                        variant === "primary",
                    "bg-slate-200 text-slate-500 hover:bg-slate-300 hover:text-slate-600 focus-visible:ring-slate-100":
                        variant === "secondary",
                },
            )}
            onClick={onClick}
            type={type}
        >
            {children}
        </button>
    );
};

export default Button;
