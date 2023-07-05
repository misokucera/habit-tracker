import { HiXMark } from "react-icons/hi2";
import { Status } from "../contexts/StatusesContexts";

type Props = {
    color: string;
    status: Status | null;
    onAdded: () => void;
    onRemoved: (statusId: string) => void;
};

const ChangeStatusButton = ({ color, status, onAdded, onRemoved }: Props) => {
    const handleClick = () => {
        if (status) {
            onRemoved(status.id);
        } else {
            onAdded();
        }
    };

    const statusClasses = [];

    if (status) {
        statusClasses.push("bg-lime-500");
    } else {
        statusClasses.push("bg-slate-300");
    }

    return (
        <button
            onClick={handleClick}
            className={`p-3 rounded-full transition-colors hover:bg-lime-200 focus-visible:outline-none`}
        >
            <div
                className={`${statusClasses.join(
                    " "
                )} w-3 h-3 rounded-full transition-colors`}
            ></div>
        </button>
    );
};

export default ChangeStatusButton;
