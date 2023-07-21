import React, { forwardRef } from "react";

type Props = {
    children: React.ReactNode;
};

const DragOverlayItem = forwardRef<HTMLDivElement, Props>(
    ({ children, ...props }, ref) => {
        return (
            <div
                {...props}
                ref={ref}
                className="p-4 opacity-80 bg-sky-100 rounded border border-sky-500"
            >
                {children}
            </div>
        );
    }
);

DragOverlayItem.displayName = "DragOverlayItem";

export default DragOverlayItem;
