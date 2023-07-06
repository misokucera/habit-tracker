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
                "p-3 rounded-full transition-colors focus:outline-none focus-visible:ring-2",
                {
                    "hover:bg-lime-200  focus-visible:ring-lime-300": status,
                    "hover:bg-slate-100  focus-visible:ring-slate-300": !status,
                }
            )}
        >
            <div
                className={classNames("w-3 h-3 rounded-full", {
                    "bg-lime-500": status,
                    "bg-slate-300": !status,
                })}
            ></div>
        </button>
    );
};

export default ChangeStatusButton;
