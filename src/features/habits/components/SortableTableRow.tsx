import { useSortable } from "@dnd-kit/sortable";
import React from "react";
import { CSS } from "@dnd-kit/utilities";
import { MdDragIndicator } from "react-icons/md";

type Props = {
    id: string;
    children: React.ReactNode;
};

const SortableTableRow = ({ id, children }: Props) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        setActivatorNodeRef,
        transform,
        transition,
    } = useSortable({ id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <tr
            ref={setNodeRef}
            style={style}
            {...attributes}
            className="border-b last-of-type:border-none"
        >
            <td>
                <button {...listeners} ref={setActivatorNodeRef}>
                    <MdDragIndicator className="text-slate-400" />
                </button>
            </td>
            {children}
        </tr>
    );
};

export default SortableTableRow;
