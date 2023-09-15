import { useSortable } from "@dnd-kit/sortable";
import React from "react";
import { CSS } from "@dnd-kit/utilities";
import { MdDragIndicator } from "react-icons/md";
import classNames from "classnames";
import IconButton from "@/components/ui/IconButton";

type Props = {
    id: string;
    children: React.ReactNode;
};

const SortableRow = ({ id, children }: Props) => {
    const {
        isDragging,
        attributes,
        listeners,
        setNodeRef,
        setActivatorNodeRef,
        transform,
        transition,
    } = useSortable({ id });

    const style = {
        transform: CSS.Translate.toString(transform),
        transition,
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            className={classNames("flex", {
                "opacity-70": isDragging,
            })}
        >
            <div className="flex items-center">
                <IconButton
                    variant="light"
                    {...attributes}
                    {...listeners}
                    ref={setActivatorNodeRef}
                >
                    <MdDragIndicator />
                </IconButton>
            </div>
            {children}
        </div>
    );
};

export default SortableRow;
