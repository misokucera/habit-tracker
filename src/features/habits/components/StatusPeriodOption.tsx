import classNames from "classnames";

type Props = {
    checked: boolean;
    children: React.ReactNode;
};

const StatusPeriodOption = ({ checked, children }: Props) => {
    return (
        <p
            className={classNames(
                "cursor-pointer px-4 py-2 text-sm font-semibold transition-colors focus:outline-none focus-visible:ring-2",
                {
                    "bg-purple-200 text-purple-600": checked,
                    "cursor-pointer bg-slate-100 text-slate-400 hover:bg-slate-200 hover:text-slate-500":
                        !checked,
                },
            )}
        >
            {children}
        </p>
    );
};

export default StatusPeriodOption;
