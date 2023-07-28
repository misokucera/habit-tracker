import classNames from "classnames";
import { Status, StatusType } from "../contexts/StatusesContexts";
import { Popover, RadioGroup } from "@headlessui/react";
import { usePopper } from "react-popper";
import React, { useRef, useState } from "react";
import Dot from "@/components/ui/Dot";

type Props = {
    status: Status | null;
    onChange: (statusId: string, type: StatusType) => void;
    onAdd: (type: StatusType) => void;
};

const ChangeStatusButton = ({ status, onChange, onAdd }: Props) => {
    const [buttonElement, setButtonElement] = useState<HTMLElement | null>();
    const [panelElement, setPanelElement] = useState<HTMLElement | null>();

    const { styles, attributes } = usePopper(buttonElement, panelElement, {
        placement: "bottom-start",
    });

    const handleClick = (value: StatusType) => {
        if (status) {
            onChange(status.id, value);
        } else {
            onAdd(value);
        }
    };

    return (
        <Popover className="relative">
            <Popover.Button
                ref={setButtonElement}
                className={classNames(
                    "rounded-full p-3 transition-colors focus:outline-none focus-visible:ring-2",
                    {
                        "hover:bg-lime-200  focus-visible:ring-lime-300":
                            status?.type === "success",
                        "hover:bg-slate-100  focus-visible:ring-slate-300":
                            !status || status.type === "unknown",
                    },
                )}
            >
                <div
                    className={classNames("h-3 w-3 rounded-full", {
                        "bg-lime-500": status?.type === "success",
                        "bg-slate-300": !status || status.type === "unknown",
                    })}
                ></div>
            </Popover.Button>
            <Popover.Panel
                className="z-10"
                ref={setPanelElement}
                style={styles.popper}
                {...attributes.popper}
            >
                <div className="rounded-lg bg-white p-2 text-left text-sm shadow-lg">
                    <Popover.Button
                        onClick={() => handleClick("success")}
                        className="flex w-full cursor-pointer items-center gap-2 whitespace-nowrap rounded p-1 hover:bg-slate-100"
                    >
                        <Dot color="lime" size="small" />
                        <span>Done</span>
                    </Popover.Button>
                    <Popover.Button
                        onClick={() => handleClick("failure")}
                        className="flex w-full cursor-pointer items-center gap-2 whitespace-nowrap rounded p-1 hover:bg-slate-100"
                    >
                        <Dot color="slate" size="small" />
                        <span>Failed</span>
                    </Popover.Button>
                    <Popover.Button
                        onClick={() => handleClick("unknown")}
                        className="flex w-full cursor-pointer items-center gap-2 whitespace-nowrap rounded p-1 hover:bg-slate-100"
                    >
                        <Dot color="slate" size="small" />
                        <span>Not yet</span>
                    </Popover.Button>
                    <Popover.Button
                        onClick={() => handleClick("blocker")}
                        className="flex w-full cursor-pointer items-center gap-2 whitespace-nowrap rounded p-1 hover:bg-slate-100"
                    >
                        <Dot color="slate" size="small" />
                        <span>Obstacle</span>
                    </Popover.Button>
                </div>
            </Popover.Panel>
        </Popover>
    );
};

export default ChangeStatusButton;
