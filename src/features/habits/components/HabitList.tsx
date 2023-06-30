"use client";

import { useState } from "react";
import CreateHabitDialog from "./CreateHabitDialog";
import { useHabits } from "../hooks/useHabits";
import { CreateHabitFormInput } from "./CreateHabitForm";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import { addStatus, removeStatus } from "../../statuses/services/statuses";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { addHabit } from "../services/habits";
import {
    formatDateInPast,
    getDateInPast,
    getWeekdayInPast,
    normalizeDate,
} from "@/utils/day";
import { useStatuses } from "@/features/statuses/hooks/useStatuses";
import ChangeStatusButton from "@/features/statuses/components/ChangeStatusButton";
import { auth } from "@/services/firebase";
import SignOutButton from "@/features/auth/components/SignOutButton";
import Link from "next/link";

dayjs.extend(localizedFormat);

const locale = "en";

const numberOfDaysToShow = 7;

const HabitList = () => {
    const { habits } = useHabits();
    const { statuses } = useStatuses();
    const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
    const { user } = useAuth();

    const handleFormSubmit = async (data: CreateHabitFormInput) => {
        if (user) {
            setIsCreateDialogOpen(false);
            await addHabit(user.uid, data);
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
                <h1 className="text-2xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-sky-400 to-purple-400">
                    Habits
                </h1>
                <button
                    onClick={() => setIsCreateDialogOpen(true)}
                    className="px-4 py-2 text-sm text-white bg-sky-400 hover:bg-sky-500 font-semibold rounded transition-colors"
                >
                    Add new
                </button>
            </div>
            <div className="overflow-auto">
                <table className="">
                    <thead>
                        <tr className="border-b">
                            <th></th>
                            {days.map((day) => (
                                <th
                                    key={day}
                                    className="p-3 text-sm text-slate-700 font-normal whitespace-nowrap"
                                >
                                    {formatDateInPast(day, locale)}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {habits.map((habit) => (
                            <tr key={habit.id} className="border-b">
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
