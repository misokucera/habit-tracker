import classNames from "classnames";
import { Status, StatusType } from "../contexts/StatusesContexts";
import { Popover, RadioGroup } from "@headlessui/react";

type Props = {
    status: Status | null;
    onChange: (statusId: string, type: StatusType) => void;
    onAdd: (type: StatusType) => void;
};

const ChangeStatusButton = ({ status, onChange, onAdd }: Props) => {
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
                // onClick={handleClick}
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
            <Popover.Panel className="absolute z-10">
                <div className="rounded bg-white p-4 text-left shadow-lg">
                    <RadioGroup
                        value={status?.type ?? "unknown"}
                        onChange={handleClick}
                    >
                        <RadioGroup.Label className="mb-5 text-slate-500">
                            Options
                        </RadioGroup.Label>
                        <RadioGroup.Option
                            value="success"
                            className="flex cursor-pointer items-center gap-2 whitespace-nowrap rounded p-2 hover:bg-slate-100"
                        >
                            {({ checked }) => (
                                <>
                                    <div
                                        className={
                                            "h-3 w-3 shrink-0 rounded-full bg-lime-500"
                                        }
                                    ></div>
                                    <span>Success</span>
                                </>
                            )}
                        </RadioGroup.Option>
                        <RadioGroup.Option
                            value="unknown"
                            className="flex cursor-pointer items-center gap-2 whitespace-nowrap rounded p-2 hover:bg-slate-100"
                        >
                            <div
                                className={
                                    "h-3 w-3 shrink-0 rounded-full bg-slate-300"
                                }
                            ></div>
                            Not selected
                        </RadioGroup.Option>
                    </RadioGroup>
                </div>
            </Popover.Panel>
        </Popover>
    );
};

export default ChangeStatusButton;
