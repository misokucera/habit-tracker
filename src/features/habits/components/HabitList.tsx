"use client";

import { useEffect, useRef, useState } from "react";
import CreateHabitDialog from "./CreateHabitDialog";
import { HabitFormValues } from "./HabitForm";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import { addHabit } from "../services/habits";
import { formatLongDate, formatShortDate, getDateInPast } from "@/utils/day";
import Link from "next/link";
import Headline from "@/components/ui/Headline";
import { useElementWidthOnViewportChange } from "../hooks/useElementWidthOnViewportChange";
import Button from "@/components/ui/Button";
import StatusList from "./StatusList";
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
import SortableRow from "./SortableRow";
import {
    restrictToParentElement,
    restrictToVerticalAxis,
} from "@dnd-kit/modifiers";
import Skeleton from "@/components/ui/Skeleton";
import { useHabitsContext } from "../contexts/HabitsContexts";
import { StatusesProvider } from "../contexts/StatusesContexts";

dayjs.extend(localizedFormat);

const expectedStatusButtonWidth = 64;
const minDaysToShow = 1;

const HabitList = () => {
    const { habits, fetching, reorder } = useHabitsContext();
    const [draggedItem, setDraggedItem] = useState<UniqueIdentifier | null>(
        null,
    );
    const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
    const userId = useUserId();
    const statusListParentRef = useRef<HTMLDivElement>(null);
    const [numberOfDaysToShow, setNumberOfDaysToShow] = useState(minDaysToShow);
    const statusListWidth =
        useElementWidthOnViewportChange(statusListParentRef);

    const sensors = useSensors(
        useSensor(MouseSensor),
        useSensor(TouchSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        }),
    );

    useEffect(() => {
        setNumberOfDaysToShow(
            Math.max(
                Math.floor(statusListWidth / expectedStatusButtonWidth),
                minDaysToShow,
            ),
        );
    }, [statusListWidth]);

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

            <div className="mb-10 flex items-center justify-between gap-3">
                <Headline>Habits</Headline>
                {habits.length > 0 && (
                    <Button
                        onClick={() => setIsCreateDialogOpen(true)}
                        variant="primary"
                    >
                        Add new
                    </Button>
                )}
            </div>
            {fetching && <Skeleton />}
            {!fetching && habits.length > 0 && (
                <div className="w-full">
                    <div>
                        <div className="flex justify-end border-b">
                            {days.map((day) => (
                                <div
                                    key={day}
                                    title={formatLongDate(getDateInPast(day))}
                                    className="w-16 whitespace-nowrap p-2 text-center text-xs font-normal text-slate-700"
                                >
                                    {formatShortDate(getDateInPast(day))}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div>
                        <StatusesProvider
                            startDate={getDateInPast(numberOfDaysToShow)}
                        >
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
                                        <SortableRow
                                            key={habit.id}
                                            id={habit.id}
                                        >
                                            <div className="flex max-w-xs flex-auto items-center px-2 py-3 sm:p-3 md:max-w-sm md:pr-6">
                                                <Link
                                                    href={`/detail/${habit.id}`}
                                                    className="group/link focus-visible:outline-none"
                                                >
                                                    <p className="line-clamp-2 font-medium text-slate-700 group-hover/link:text-violet-400 group-hover/link:underline group-hover/link:underline-offset-2 group-focus-visible/link:text-violet-400 group-focus-visible/link:underline group-focus-visible/link:underline-offset-2">
                                                        {habit.name}
                                                    </p>
                                                    {habit.description !==
                                                        "" && (
                                                        <p className="mt-1 line-clamp-2 text-sm text-slate-400">
                                                            {habit.description}
                                                        </p>
                                                    )}
                                                </Link>
                                            </div>

                                            <div
                                                ref={statusListParentRef}
                                                className="flex flex-1 justify-end"
                                            >
                                                <StatusList
                                                    habit={habit}
                                                    daysInPast={
                                                        numberOfDaysToShow
                                                    }
                                                    fillEmptyDays
                                                />
                                            </div>
                                        </SortableRow>
                                    ))}
                                </SortableContext>
                            </DndContext>
                        </StatusesProvider>
                    </div>
                </div>
            )}
            {!fetching && habits.length === 0 && (
                <div className="mb-10 text-center">
                    <p className="mb-1 text-lg font-bold text-slate-700">
                        No habits are tracked yet
                    </p>
                    <p className="mb-4 text-sm text-slate-500">
                        Your habits will be listed here
                    </p>
                    <Button onClick={() => setIsCreateDialogOpen(true)}>
                        Add habit
                    </Button>
                </div>
            )}
        </div>
    );
};

export default HabitList;
