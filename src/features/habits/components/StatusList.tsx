import ChangeStatusButton from "./ChangeStatusButton";
import { formatLongDate, getDateInPast, normalizeDate } from "@/utils/day";
import { addStatus, removeStatus } from "../services/statuses";
import { useUserId } from "@/features/auth/hooks/useUserId";
import classNames from "classnames";
import { useStatusesContext } from "../contexts/StatusesContexts";

type Props = {
    habitId: string;
    selectedDays: number;
};

const StatusList = ({ selectedDays, habitId }: Props) => {
    const { statuses, lastSelectedDays } = useStatusesContext();
    const userId = useUserId();

    const days = Array.from(Array(selectedDays).keys());

    const findStatus = (habitId: string, day: number) => {
        const dateInPast = getDateInPast(day);
        const normalizedDate = normalizeDate(dateInPast);

        return (
            statuses.find(
                (status) =>
                    status.habitId === habitId &&
                    status.date.getTime() === normalizedDate.getTime(),
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
                        "bg-amber-100": !findStatus(habitId, day) && day > 0,
                        "opacity-30": day >= lastSelectedDays,
                    })}
                    key={day}
                    title={formatLongDate(getDateInPast(day))}
                >
                    <ChangeStatusButton
                        status={findStatus(habitId, day)}
                        dayInPast={day}
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
