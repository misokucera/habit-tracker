import classNames from "classnames";
import { Status } from "../contexts/StatusesContexts";

type Props = {
    status: Status | null;
    dayInPast: number;
    onAdded: () => void;
    onRemoved: (statusId: string) => void;
};

const ChangeStatusButton = ({
    status,
    dayInPast,
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

    return (
        <div>
            <button
                onClick={handleClick}
                className={classNames(
                    "rounded-full p-3 transition-colors focus:outline-none",
                    {
                        "hover:bg-lime-200 focus-visible:bg-lime-200": status,
                        "hover:bg-amber-200 focus-visible:bg-amber-200":
                            !status && dayInPast > 0,
                        "hover:bg-slate-100 focus-visible:bg-slate-100":
                            !status && dayInPast === 0,
                    },
                )}
            >
                <div
                    className={classNames("h-3 w-3 rounded-full", {
                        "bg-lime-500": status,
                        "bg-amber-500": !status && dayInPast > 0,
                        "bg-slate-300": !status && dayInPast === 0,
                    })}
                ></div>
            </button>
        </div>
    );
};

export default ChangeStatusButton;
