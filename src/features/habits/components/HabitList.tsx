"use client";

import React, { useEffect, useRef, useState } from "react";
import CreateHabitDialog from "./CreateHabitDialog";
import { useHabits } from "../hooks/useHabits";
import { CreateHabitFormInput } from "./CreateHabitForm";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import { addStatus, removeStatus } from "../services/statuses";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { addHabit } from "../services/habits";
import {
    formatDateInPast,
    getDateInPast,
    getWeekdayInPast,
    normalizeDate,
} from "@/utils/day";
import { useStatuses } from "@/features/habits/hooks/useStatuses";
import ChangeStatusButton from "@/features/habits/components/ChangeStatusButton";
import Link from "next/link";
import Headline from "@/components/ui/Headline";
import { useElementWidthOnViewportChange } from "../hooks/useElementWidthOnViewportChange";
import Button from "@/components/ui/Button";

dayjs.extend(localizedFormat);

const locale = "en";
const expectedCellWidth = 100;
const minCellCount = 3;

const HabitList = () => {
    const { habits } = useHabits();
    const { statuses } = useStatuses();
    const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
    const { user } = useAuth();
    const tableParentRef = useRef<HTMLDivElement>(null);
    const [numberOfDaysToShow, setNumberOfDaysToShow] = useState(4);
    const tableWidth = useElementWidthOnViewportChange(tableParentRef);

    const handleFormSubmit = async (data: CreateHabitFormInput) => {
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

    const days = Array.from(Array(numberOfDaysToShow).keys());

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
                                {days.map((day) => (
                                    <td
                                        key={day}
                                        className={`p-3 text-center ${
                                            habit.days.includes(
                                                getWeekdayInPast(day)
                                            )
                                                ? ""
                                                : "bg-slate-100"
                                        }`}
                                    >
                                        <ChangeStatusButton
                                            color={habit.color}
                                            status={findStatus(habit.id, day)}
                                            onAdded={() =>
                                                handleStatusAdd(
                                                    habit.id,
                                                    getDateInPast(day)
                                                )
                                            }
                                            onRemoved={(statusId) =>
                                                handleStatusRemoved(statusId)
                                            }
                                        />
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default HabitList;
