import Link from "next/link";

type Props = {
    segments?: string[];
};

const Breadcrumbs = ({ segments = [] }: Props) => {
    return (
        <p className="whitespace-nowrap font-mono font-bold text-sky-100">
            <Link href="/" className="hover:text-sky-700">
                /habit-tracker
            </Link>

            {segments.map((segment, index) => (
                <span key={index}>/{segment}</span>
            ))}
        </p>
    );
};

export default Breadcrumbs;
