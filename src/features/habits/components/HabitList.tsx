"use client";

import { useEffect, useRef, useState } from "react";
import CreateHabitDialog from "./CreateHabitDialog";
import { useHabits } from "../hooks/useHabits";
import { HabitFormValues } from "./HabitForm";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import { addHabit } from "../services/habits";
import { formatDateInPast } from "@/utils/day";
import Link from "next/link";
import Headline from "@/components/ui/Headline";
import { useElementWidthOnViewportChange } from "../hooks/useElementWidthOnViewportChange";
import Button from "@/components/ui/Button";
import DailyStatusCells from "./DailyStatusCells";
import StatusesProvider from "./StatusesProvider";
import { useUserId } from "@/features/auth/hooks/useUserId";
import {
    DndContext,
    DragEndEvent,
    DragStartEvent,
    KeyboardSensor,
    MouseSensor,
    TouchSensor,
    UniqueIdentifier,
    closestCenter,
    useSensor,
    useSensors,
} from "@dnd-kit/core";
import {
    SortableContext,
    arrayMove,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import SortableTableRow from "./SortableTableRow";
import {
    restrictToParentElement,
    restrictToVerticalAxis,
} from "@dnd-kit/modifiers";

dayjs.extend(localizedFormat);

const locale = "en";
const expectedCellWidth = 100;
const minCellCount = 3;

const HabitList = () => {
    const { habits, reorder } = useHabits();
    const [draggedItem, setDraggedItem] = useState<UniqueIdentifier | null>(
        null
    );
    const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
    const userId = useUserId();
    const tableParentRef = useRef<HTMLDivElement>(null);
    const [numberOfDaysToShow, setNumberOfDaysToShow] = useState(4);
    const tableWidth = useElementWidthOnViewportChange(tableParentRef);

    const sensors = useSensors(
        useSensor(MouseSensor),
        useSensor(TouchSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    useEffect(() => {
        setNumberOfDaysToShow(
            Math.max(Math.floor(tableWidth / expectedCellWidth), minCellCount)
        );
    }, [tableWidth]);

    const handleFormSubmit = async (data: HabitFormValues) => {
        setIsCreateDialogOpen(false);
        await addHabit(userId, data);
    };

    const handleDragStart = (event: DragStartEvent) => {
        setDraggedItem(event.active.id);
    };

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        const oldIndex = habits.findIndex((habit) => habit.id === active.id);
        const newIndex = habits.findIndex((habit) => habit.id === over?.id);

        const reorderedHabits = arrayMove(habits, oldIndex, newIndex);

        reorder(reorderedHabits);

        setDraggedItem(null);
    };

    const days = Array.from(Array(numberOfDaysToShow).keys());

    // TODO: Add DragOverlay
    const draggedHabit = habits.find((habit) => habit.id === draggedItem);

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
                            <DndContext
                                onDragEnd={handleDragEnd}
                                onDragStart={handleDragStart}
                                collisionDetection={closestCenter}
                                sensors={sensors}
                                modifiers={[
                                    restrictToVerticalAxis,
                                    restrictToParentElement,
                                ]}
                            >
                                <SortableContext
                                    items={habits}
                                    strategy={verticalListSortingStrategy}
                                >
                                    {habits.map((habit) => (
                                        <SortableTableRow
                                            key={habit.id}
                                            id={habit.id}
                                        >
                                            <td className="p-3 align-middle">
                                                <Link
                                                    href={`/detail/${habit.id}`}
                                                >
                                                    {habit.name}
                                                    {habit.description !==
                                                        "" && (
                                                        <p className="text-sm text-slate-400 mt-1">
                                                            {habit.description}
                                                        </p>
                                                    )}
                                                </Link>
                                            </td>

                                            <DailyStatusCells
                                                habit={habit}
                                                daysInPast={numberOfDaysToShow}
                                            />
                                        </SortableTableRow>
                                    ))}
                                </SortableContext>
                            </DndContext>
                        </StatusesProvider>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default HabitList;
