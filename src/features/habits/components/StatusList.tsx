import { Fragment } from "react";
import ChangeStatusButton from "./ChangeStatusButton";
import { useStatuses } from "../hooks/useStatuses";
import { getDateInPast, normalizeDate } from "@/utils/day";
import { addStatus, removeStatus } from "../services/statuses";
import { useUserId } from "@/features/auth/hooks/useUserId";

type Props = {
    habitId: string;
    selectedDays: number;
};

const StatusList = ({ selectedDays, habitId }: Props) => {
    const { statuses } = useStatuses();
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
        <div>
            {days.map((day) => (
                <Fragment key={day}>
                    <ChangeStatusButton
                        status={findStatus(habitId, day)}
                        onAdded={() =>
                            handleStatusAdd(habitId, getDateInPast(day))
                        }
                        onRemoved={(statusId) => handleStatusRemove(statusId)}
                    />
                </Fragment>
            ))}
        </div>
    );
};

export default StatusList;
