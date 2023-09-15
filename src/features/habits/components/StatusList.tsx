import { getWeekdayInPast, getDateInPast, normalizeDate } from "@/utils/day";
import StatusButton from "./StatusButton";
import { Habit } from "../contexts/HabitsContexts";
import { addStatus, removeStatus } from "../services/statuses";
import { useUserId } from "@/features/auth/hooks/useUserId";
import { useStatusesContext } from "../contexts/StatusesContexts";
import { Fragment } from "react";
import { HiXMark } from "react-icons/hi2";

type Props = {
    habit: Habit;
    daysInPast: number;
};

const StatusList = ({ habit, daysInPast }: Props) => {
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

    return (
        <>
            {days.map((day) => (
                <Fragment key={day}>
                    {habit.dateCreated <= getDateInPast(day) ? (
                        <StatusButton
                            status={findStatus(habit.id, day)}
                            dayInPast={day}
                            isOptional={
                                !habit.days.includes(getWeekdayInPast(day))
                            }
                            isLoading={day >= lastSelectedDays}
                            onAdded={() =>
                                handleStatusAdd(habit.id, getDateInPast(day))
                            }
                            onRemoved={(statusId) =>
                                handleStatusRemove(statusId)
                            }
                        />
                    ) : (
                        <div
                            className="flex w-16 items-center justify-center"
                            title="Not available"
                        >
                            <HiXMark className="text-slate-400" />
                        </div>
                    )}
                </Fragment>
            ))}
        </>
    );
};

export default StatusList;
