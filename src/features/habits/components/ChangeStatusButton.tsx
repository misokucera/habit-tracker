import classNames from "classnames";
import { Status, StatusType } from "../contexts/StatusesContexts";
import { Popover } from "@headlessui/react";
import { usePopper } from "react-popper";
import { useState } from "react";
import Dot from "@/components/ui/Dot";
import { selectColorByType } from "../services/statusTypes";

type StatusOption = {
    type: StatusType;
    label: string;
};

const statusOptions: StatusOption[] = [
    { type: "success", label: "Done" },
    { type: "failure", label: "Failed" },
    { type: "unknown", label: "Not yet" },
    { type: "blocker", label: "Obstacle" },
];

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
                        "hover:bg-orange-200  focus-visible:ring-orange-300":
                            status?.type === "failure",
                        "hover:bg-stone-200  focus-visible:ring-stone-300":
                            status?.type === "blocker",
                        "hover:bg-slate-100  focus-visible:ring-slate-300":
                            !status || status.type === "unknown",
                    },
                )}
            >
                <Dot color={selectColorByType(status?.type)} />
            </Popover.Button>
            <Popover.Panel
                className="z-10"
                ref={setPanelElement}
                style={styles.popper}
                {...attributes.popper}
            >
                <div className="rounded-md bg-white p-2 text-left text-sm shadow-lg">
                    <p className="whitespace-nowrap px-3 py-2">Select result</p>
                    {statusOptions.map((option) => (
                        <Popover.Button
                            key={option.type}
                            onClick={() => handleClick(option.type)}
                            className="flex w-full cursor-pointer items-center gap-2 whitespace-nowrap rounded-md px-3 py-2 hover:bg-slate-100"
                        >
                            <Dot color={selectColorByType(option.type)} />
                            <span>{option.label}</span>
                        </Popover.Button>
                    ))}
                </div>
            </Popover.Panel>
        </Popover>
    );
};

export default ChangeStatusButton;
