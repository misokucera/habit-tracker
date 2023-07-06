import classNames from "classnames";

type Props = {
    checked: boolean;
    children: React.ReactNode;
};

const StatusPeriodOption = ({ checked, children }: Props) => {
    return (
        <p
            className={classNames(
                "px-4 py-2 text-sm font-semibold transition-colors cursor-pointer focus:outline-none focus-visible:ring-2",
                {
                    "bg-purple-200 text-purple-600": checked,
                    "bg-slate-100 text-slate-400 cursor-pointer hover:bg-slate-200 hover:text-slate-500":
                        !checked,
                }
            )}
        >
            {children}
        </p>
    );
};

export default StatusPeriodOption;
