import { useSyncExternalStore } from "react";

const subscribe = (onStoreChange: () => void) => {
    window?.addEventListener("resize", onStoreChange);
    return () => window?.removeEventListener("resize", onStoreChange);
};

export const useElementWidthOnViewportChange = (
    elementRef: React.RefObject<HTMLElement>
) => {
    return useSyncExternalStore(
        subscribe,
        () => elementRef?.current?.clientWidth || 0
    );
};
