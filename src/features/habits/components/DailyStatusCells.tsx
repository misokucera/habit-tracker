import { getDateInPast, normalizeDate, formatDateInPast } from "@/utils/day";
import ChangeStatusButton from "./ChangeStatusButton";
import { Habit } from "../contexts/HabitsContexts";
import { addStatus, changeStatus } from "../services/statuses";
import classNames from "classnames";
import { useUserId } from "@/features/auth/hooks/useUserId";
import { StatusType, useStatusesContext } from "../contexts/StatusesContexts";
import { getStatusBackgroundClass } from "../services/statusTypes";

type Props = {
    habit: Habit;
    daysInPast: number;
};

const DailyStatusCells = ({ habit, daysInPast }: Props) => {
    const { statuses, lastSelectedDays } = useStatusesContext();
    const userId = useUserId();
    const days = Array.from(Array(daysInPast).keys());

    const handleStatusAdd = async (type: StatusType, date: Date) => {
        await addStatus(userId, habit, type, date);
    };

    const handleStatusChange = async (
        statusId: string,
        type: StatusType,
        date: Date,
    ) => {
        await changeStatus(userId, habit, statusId, type, date);
    };

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

    return (
        <>
            {days.map((day) => (
                <td
                    key={day}
                    className={classNames(
                        "p-2 text-center transition-all sm:p-3",
                        getStatusBackgroundClass(
                            day,
                            habit,
                            findStatus(habit.id, day),
                        ),
                        { "opacity-30": day >= lastSelectedDays },
                    )}
                    title={formatDateInPast(day)}
                >
                    <ChangeStatusButton
                        status={findStatus(habit.id, day)}
                        onAdd={(type) =>
                            handleStatusAdd(type, getDateInPast(day))
                        }
                        onChange={(statusId, type) =>
                            handleStatusChange(
                                statusId,
                                type,
                                getDateInPast(day),
                            )
                        }
                    />
                </td>
            ))}
        </>
    );
};

export default DailyStatusCells;
