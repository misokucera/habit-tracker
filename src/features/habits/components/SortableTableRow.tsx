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

const SortableTableRow = ({ id, children }: Props) => {
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
        <tr
            ref={setNodeRef}
            style={style}
            {...attributes}
            className={classNames({
                "opacity-70": isDragging,
            })}
        >
            <td>
                <IconButton
                    variant="light"
                    {...listeners}
                    ref={setActivatorNodeRef}
                >
                    <MdDragIndicator />
                </IconButton>
            </td>
            {children}
        </tr>
    );
};

export default SortableTableRow;
