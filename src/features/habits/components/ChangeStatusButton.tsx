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

    const dotClasses = [];

    if (status) {
        dotClasses.push("bg-lime-500");
    } else {
        dotClasses.push("bg-slate-300");
    }

    const buttonClasses = [];

    if (status) {
        buttonClasses.push(
            "hover:bg-lime-200 focus:outline-none focus-visible:ring-lime-300 focus-visible:ring-2"
        );
    } else {
        buttonClasses.push(
            "hover:bg-slate-100 focus:outline-none focus-visible:ring-slate-300 focus-visible:ring-2"
        );
    }

    return (
        <button
            onClick={handleClick}
            className={`${buttonClasses.join(
                " "
            )} p-3 rounded-full transition-colors`}
        >
            <div
                className={`${dotClasses.join(" ")} w-3 h-3 rounded-full`}
            ></div>
        </button>
    );
};

export default ChangeStatusButton;
