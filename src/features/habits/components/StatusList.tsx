import ChangeStatusButton from "./ChangeStatusButton";
import { formatDateInPast, getDateInPast, normalizeDate } from "@/utils/day";
import { addStatus, changeStatus } from "../services/statuses";
import { useUserId } from "@/features/auth/hooks/useUserId";
import classNames from "classnames";
import { StatusType, useStatusesContext } from "../contexts/StatusesContexts";
import { getStatusBackgroundClass } from "../services/statusTypes";
import { Habit } from "../contexts/HabitsContexts";

type Props = {
    habit: Habit;
    selectedDays: number;
};

const StatusList = ({ selectedDays, habit }: Props) => {
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

    const handleStatusAdd = async (
        habitId: string,
        type: StatusType,
        date: Date,
    ) => {
        await addStatus(userId, habitId, type, date);
    };

    const handleStatusChange = async (statusId: string, type: StatusType) => {
        await changeStatus(userId, statusId, type);
    };

    return (
        <div className="flex flex-wrap">
            {days.map((day) => (
                <div
                    className={classNames(
                        "p-2 transition-all",
                        getStatusBackgroundClass(
                            day,
                            habit,
                            findStatus(habit.id, day),
                        ),
                        {
                            "opacity-30": day >= lastSelectedDays,
                        },
                    )}
                    key={day}
                    title={formatDateInPast(day)}
                >
                    <ChangeStatusButton
                        status={findStatus(habit.id, day)}
                        onAdd={(type) =>
                            handleStatusAdd(habit.id, type, getDateInPast(day))
                        }
                        onChange={(statusId, type) =>
                            handleStatusChange(statusId, type)
                        }
                    />
                </div>
            ))}
        </div>
    );
};

export default StatusList;
