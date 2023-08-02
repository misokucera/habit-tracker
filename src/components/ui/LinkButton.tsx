import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";
import styles from "./styles/link.module.css";

type Props = ComponentProps<"button">;

const LinkButton = ({ className, children, ...props }: Props) => {
    return (
        <button className={twMerge(styles.link, className)} {...props}>
            {children}
        </button>
    );
};

export default LinkButton;
