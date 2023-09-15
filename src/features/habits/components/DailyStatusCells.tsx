import {
    getWeekdayInPast,
    getDateInPast,
    normalizeDate,
    formatLongDate,
} from "@/utils/day";
import ChangeStatusButton from "./ChangeStatusButton";
import { Habit } from "../contexts/HabitsContexts";
import { addStatus, removeStatus } from "../services/statuses";
import classNames from "classnames";
import { useUserId } from "@/features/auth/hooks/useUserId";
import { useStatusesContext } from "../contexts/StatusesContexts";

type Props = {
    habit: Habit;
    daysInPast: number;
};

const DailyStatusCells = ({ habit, daysInPast }: Props) => {
    const { statuses, lastSelectedDays } = useStatusesContext();
    const userId = useUserId();
    const days = Array.from(Array(daysInPast).keys());

    const handleStatusAdd = async (habitId: string, date: Date) => {
        await addStatus(userId, habitId, date);
    };

    const handleStatusRemove = async (statusId: string) => {
        await removeStatus(userId, statusId);
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

    const getBackgroundClass = (day: number) => {
        const status = findStatus(habit.id, day);

        if (status) {
            return "bg-lime-100";
        }

        if (day > 0) {
            return "bg-amber-100";
        }

        if (!habit.days.includes(getWeekdayInPast(day))) {
            return "bg-slate-100";
        }

        return "";
    };

    return (
        <>
            {days.map((day) => (
                <div
                    key={day}
                    className={classNames(
                        "flex w-16 items-center justify-center p-2 text-center transition-all sm:p-3",
                        getBackgroundClass(day),
                        { "opacity-30": day >= lastSelectedDays },
                    )}
                    title={formatLongDate(getDateInPast(day))}
                >
                    <ChangeStatusButton
                        status={findStatus(habit.id, day)}
                        dayInPast={day}
                        onAdded={() =>
                            handleStatusAdd(habit.id, getDateInPast(day))
                        }
                        onRemoved={(statusId) => handleStatusRemove(statusId)}
                    />
                </div>
            ))}
        </>
    );
};

export default DailyStatusCells;
