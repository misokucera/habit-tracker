"use client";

import { useEffect, useRef, useState } from "react";
import CreateHabitDialog from "./CreateHabitDialog";
import { useHabits } from "../hooks/useHabits";
import { HabitFormValues } from "./HabitForm";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { addHabit } from "../services/habits";
import { formatDateInPast } from "@/utils/day";
import { useStatuses } from "@/features/habits/hooks/useStatuses";
import Link from "next/link";
import Headline from "@/components/ui/Headline";
import { useElementWidthOnViewportChange } from "../hooks/useElementWidthOnViewportChange";
import Button from "@/components/ui/Button";
import DailyStatusCells from "./DailyStatusCells";
import StatusesProvider from "./StatusesProvider";

dayjs.extend(localizedFormat);

const locale = "en";
const expectedCellWidth = 100;
const minCellCount = 3;

const HabitList = () => {
    const { habits } = useHabits();
    const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
    const { user } = useAuth();
    const tableParentRef = useRef<HTMLDivElement>(null);
    const [numberOfDaysToShow, setNumberOfDaysToShow] = useState(4);
    const tableWidth = useElementWidthOnViewportChange(tableParentRef);

    const handleFormSubmit = async (data: HabitFormValues) => {
        if (user) {
            setIsCreateDialogOpen(false);
            await addHabit(user.uid, data);
        }
    };

    useEffect(() => {
        setNumberOfDaysToShow(
            Math.max(Math.floor(tableWidth / expectedCellWidth), minCellCount)
        );
    }, [tableWidth]);

    const days = Array.from(Array(numberOfDaysToShow).keys());

    return (
        <div className="">
            <CreateHabitDialog
                open={isCreateDialogOpen}
                onClose={() => setIsCreateDialogOpen(false)}
                onFormSubmit={handleFormSubmit}
            />

            <div className="flex gap-3 justify-between items-center mb-10">
                <Headline>Habits</Headline>
                <Button
                    onClick={() => setIsCreateDialogOpen(true)}
                    variant="primary"
                >
                    Add new
                </Button>
            </div>
            <div className="overflow-auto" ref={tableParentRef}>
                <table className="w-full">
                    <thead>
                        <tr className="border-b">
                            <th></th>
                            {days.map((day) => (
                                <th
                                    key={day}
                                    className="p-2 text-xs text-slate-700 font-normal whitespace-nowrap"
                                >
                                    {formatDateInPast(day, locale)}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        <StatusesProvider selectedDays={numberOfDaysToShow}>
                            {habits.map((habit) => (
                                <tr
                                    key={habit.id}
                                    className="border-b last:border-none"
                                >
                                    <td className="p-3 align-middle">
                                        <Link href={`/detail/${habit.id}`}>
                                            {habit.name}
                                            <p className="text-sm text-slate-400">
                                                {habit.description}
                                            </p>
                                        </Link>
                                    </td>

                                    <DailyStatusCells
                                        habit={habit}
                                        daysInPast={numberOfDaysToShow}
                                    />
                                </tr>
                            ))}
                        </StatusesProvider>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default HabitList;
