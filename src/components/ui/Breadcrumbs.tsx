import Link from "next/link";
import styles from "./styles/link.module.css";
import classNames from "classnames";

type Segment = {
    name: string;
    href?: string;
};

type Props = {
    segments?: Segment[];
};

const Breadcrumbs = ({ segments = [] }: Props) => {
    return (
        <p className="inline-flex flex-wrap gap-1 font-mono font-bold text-sky-100">
            <span>/</span>
            <Link
                href="/"
                className={classNames("whitespace-nowrap", styles.link)}
            >
                habit-tracker
            </Link>
            {segments.map((segment, index) => (
                <>
                    <span key={index}>/</span>
                    {segment.href ? (
                        <Link
                            href={segment.href}
                            className={classNames(
                                "whitespace-nowrap",
                                styles.link,
                            )}
                        >
                            {segment.name}
                        </Link>
                    ) : (
                        <span className="whitespace-nowrap">
                            {segment.name}
                        </span>
                    )}
                </>
            ))}
        </p>
    );
};

export default Breadcrumbs;
