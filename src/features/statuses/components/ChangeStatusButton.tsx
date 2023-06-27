import { HiCheck, HiXMark } from "react-icons/hi2";
import { Status } from "../contexts/StatusesContexts";

type Props = {
    color: string;
    status: Status | null;
    onAdded: () => void;
    onRemoved: (statusId: string) => void;
};

const ChangeStatusButton = ({ color, status, onAdded, onRemoved }: Props) => {
    return status ? (
        <button
            onClick={() => onRemoved(status.id)}
            style={{ backgroundColor: color, outlineColor: color }}
            className="w-8 h-8 inline-flex items-center justify-center rounded-full transition-colors text-white hover:opacity-80 focus:outline-2 focus:outline-offset-2            "
        >
            <HiCheck className="w-3 h-3" />
        </button>
    ) : (
        <button
            onClick={onAdded}
            className="w-8 h-8 inline-flex items-center justify-center rounded-full transition-colors text-slate-500 hover:bg-slate-200 hover:text-slate-600 focus:outline-slate-400 focus:outline-2 focus:outline-offset-2"
        >
            <HiXMark />
        </button>
    );
};

export default ChangeStatusButton;
