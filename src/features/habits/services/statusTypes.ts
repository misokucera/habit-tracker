import { ValueOf } from "@/utils/types";
import { Status, StatusType } from "../contexts/StatusesContexts";
import { getWeekdayInPast } from "@/utils/day";
import { Habit } from "../contexts/HabitsContexts";

type StatusTypeColor = ValueOf<typeof statusTypeColorMap>;

const statusTypeColorMap = {
    success: "lime",
    failure: "orange",
    unknown: "slate",
    blocker: "stone",
} as const;

export const selectColorByType = (
    statusType?: StatusType,
): StatusTypeColor | undefined => {
    if (!statusType) {
        return undefined;
    }

    return statusTypeColorMap[statusType];
};

// TODO: rewrite this function
export const getStatusBackgroundClass = (
    day: number,
    habit: Habit,
    status: Status | null,
) => {
    if (status?.type === "success") {
        return "bg-lime-100";
    }

    if (status?.type === "failure") {
        return "bg-orange-100";
    }

    if (status?.type === "blocker") {
        return "bg-stone-100";
    }

    if (!habit.days.includes(getWeekdayInPast(day))) {
        return "bg-slate-100";
    }

    return "";
};
