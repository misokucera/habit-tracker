import { HiCheckCircle, HiXMark } from "react-icons/hi2";
import { Status } from "../contexts/StatusesContexts";
import { getDateInPast } from "@/utils/day";

type Props = {
    status: Status | null;
    onAdded: () => void;
    onRemoved: (statusId: string) => void;
};

const ChangeStatusButton = ({ status, onAdded, onRemoved }: Props) => {
    return status ? (
        <button onClick={() => onRemoved(status.id)}>
            <HiCheckCircle className="w-7 h-7 inline-block" />
        </button>
    ) : (
        <button
            onClick={onAdded}
            className="rounded-full p-2 transition-colors text-slate-500 hover:bg-slate-200 hover:text-slate-600 focus:outline-slate-400 focus:outline-2"
        >
            <HiXMark />
        </button>
    );
};

export default ChangeStatusButton;
