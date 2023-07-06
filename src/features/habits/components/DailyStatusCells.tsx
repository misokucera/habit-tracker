import { getWeekdayInPast, getDateInPast, normalizeDate } from "@/utils/day";
import ChangeStatusButton from "./ChangeStatusButton";
import { Habit } from "../contexts/HabitsContexts";
import { addStatus, removeStatus } from "../services/statuses";
import { useStatuses } from "../hooks/useStatuses";
import { useAuth } from "@/features/auth/hooks/useAuth";
import classNames from "classnames";

type Props = {
    habit: Habit;
    daysInPast: number;
};

const DailyStatusCells = ({ habit, daysInPast }: Props) => {
    const { statuses } = useStatuses();
    const { user } = useAuth();
    const days = Array.from(Array(daysInPast).keys());

    const handleStatusAdd = async (habitId: string, date: Date) => {
        if (user) {
            await addStatus(user.uid, habitId, date);
        }
    };

    const handleStatusRemoved = async (statusId: string) => {
        if (user) {
            await removeStatus(user.uid, statusId);
        }
    };

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

    return (
        <>
            {days.map((day) => (
                <td
                    key={day}
                    className={classNames("p-3 text-center transition-colors", {
                        "bg-lime-100": findStatus(habit.id, day),
                        "bg-slate-100": !habit.days.includes(
                            getWeekdayInPast(day)
                        ),
                    })}
                >
                    <ChangeStatusButton
                        status={findStatus(habit.id, day)}
                        onAdded={() =>
                            handleStatusAdd(habit.id, getDateInPast(day))
                        }
                        onRemoved={(statusId) => handleStatusRemoved(statusId)}
                    />
                </td>
            ))}
        </>
    );
};

export default DailyStatusCells;
