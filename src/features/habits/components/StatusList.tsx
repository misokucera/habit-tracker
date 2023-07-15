import ChangeStatusButton from "./ChangeStatusButton";
import { useStatuses } from "../hooks/useStatuses";
import { formatDateInPast, getDateInPast, normalizeDate } from "@/utils/day";
import { addStatus, removeStatus } from "../services/statuses";
import { useUserId } from "@/features/auth/hooks/useUserId";
import classNames from "classnames";

type Props = {
    habitId: string;
    selectedDays: number;
};

const StatusList = ({ selectedDays, habitId }: Props) => {
    const { statuses, lastSelectedDays } = useStatuses();
    const userId = useUserId();

    const days = Array.from(Array(selectedDays).keys());

    const findStatus = (habitId: string, day: number) => {
        const dateInPast = getDateInPast(day);
        const normalizedDate = normalizeDate(dateInPast);

        return (
            statuses.find(
                (status) =>
                    status.habitId === habitId &&
                    status.date.getTime() === normalizedDate.getTime()
            ) || null
        );
    };

    const handleStatusAdd = async (habitId: string, date: Date) => {
        await addStatus(userId, habitId, date);
    };

    const handleStatusRemove = async (statusId: string) => {
        await removeStatus(userId, statusId);
    };

    return (
        <div className="flex flex-wrap">
            {days.map((day) => (
                <div
                    className={classNames("p-2 transition-all", {
                        "bg-lime-100": findStatus(habitId, day),
                        "opacity-30": day >= lastSelectedDays,
                    })}
                    key={day}
                    title={formatDateInPast(day)}
                >
                    <ChangeStatusButton
                        status={findStatus(habitId, day)}
                        onAdded={() =>
                            handleStatusAdd(habitId, getDateInPast(day))
                        }
                        onRemoved={(statusId) => handleStatusRemove(statusId)}
                    />
                </div>
            ))}
        </div>
    );
};

export default StatusList;
