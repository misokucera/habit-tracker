import { useSortable } from "@dnd-kit/sortable";
import React from "react";
import { CSS } from "@dnd-kit/utilities";
import { MdDragIndicator } from "react-icons/md";
import classNames from "classnames";

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
            className={classNames("group", {
                "opacity-70": isDragging,
            })}
        >
            <td className="opacity-0 group-hover:opacity-100 transition-opacity">
                <button {...listeners} ref={setActivatorNodeRef}>
                    <MdDragIndicator className="text-slate-400" />
                </button>
            </td>
            {children}
        </tr>
    );
};

export default SortableTableRow;
