import classNames from "classnames";
import { Status } from "../contexts/StatusesContexts";
import { formatLongDate, getDateInPast, getWeekdayInPast } from "@/utils/day";

type Props = {
    status: Status | null;
    isOptional: boolean;
    isLoading: boolean;
    dayInPast: number;
    onAdded: () => void;
    onRemoved: (statusId: string) => void;
};

const StatusButton = ({
    status,
    dayInPast,
    isOptional,
    isLoading,
    onAdded,
    onRemoved,
}: Props) => {
    const handleClick = () => {
        if (status) {
            onRemoved(status.id);
        } else {
            onAdded();
        }
    };

    const getBackgroundClass = () => {
        if (status) {
            return "bg-lime-100";
        }

        if (dayInPast > 0) {
            return "bg-red-100";
        }

        if (isOptional) {
            return "bg-slate-100";
        }

        return "";
    };

    return (
        <div
            className={classNames(
                "flex w-16 items-center justify-center p-2 text-center transition-all sm:p-3",
                getBackgroundClass(),
                { "opacity-30": isLoading },
            )}
            title={formatLongDate(getDateInPast(dayInPast))}
        >
            <button
                onClick={handleClick}
                className={classNames(
                    "rounded-full p-3 transition-colors focus:outline-none",
                    {
                        "hover:bg-lime-200 focus-visible:bg-lime-200": status,
                        "hover:bg-red-200 focus-visible:bg-red-200":
                            !status && dayInPast > 0,
                        "hover:bg-slate-100 focus-visible:bg-slate-100":
                            !status && dayInPast === 0,
                    },
                )}
            >
                <div
                    className={classNames("h-3 w-3 rounded-full", {
                        "bg-lime-500": status,
                        "bg-red-400": !status && dayInPast > 0,
                        "bg-slate-300": !status && dayInPast === 0,
                    })}
                ></div>
            </button>
        </div>
    );
};

export default StatusButton;
