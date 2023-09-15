import classNames from "classnames";
import { Status } from "../contexts/StatusesContexts";

type Props = {
    status: Status | null;
    onAdded: () => void;
    onRemoved: (statusId: string) => void;
};

const ChangeStatusButton = ({ status, onAdded, onRemoved }: Props) => {
    const handleClick = () => {
        if (status) {
            onRemoved(status.id);
        } else {
            onAdded();
        }
    };

    return (
        <button
            onClick={handleClick}
            className={classNames(
                "rounded-full p-3 transition-colors focus:outline-none",
                {
                    "hover:bg-lime-200 focus-visible:bg-lime-200": status,
                    "hover:bg-slate-100 focus-visible:bg-slate-100": !status,
                },
            )}
        >
            <div
                className={classNames("h-3 w-3 rounded-full", {
                    "bg-lime-500": status,
                    "bg-slate-300": !status,
                })}
            ></div>
        </button>
    );
};

export default ChangeStatusButton;
