import { Fragment, ReactNode } from "react";
import { Dialog as HeadlessDialog, Transition } from "@headlessui/react";
import Headline from "./Headline";

type Props = {
    open: boolean;
    title?: string;
    description?: string;
    onClose: () => void;
    children: ReactNode;
    maxWidth?: "xs" | "sm" | "md" | "lg" | "xl";
};

const Dialog = ({
    open,
    title = "",
    description = "",
    onClose,
    children,
    maxWidth,
}: Props) => {
    return (
        <Transition show={open} as={Fragment}>
            <HeadlessDialog onClose={onClose}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    {/* The backdrop, rendered as a fixed sibling to the panel container */}
                    <div
                        className="fixed inset-0 bg-black/30"
                        aria-hidden="true"
                    />
                </Transition.Child>
                {/* Full-screen scrollable container */}
                <div className="fixed inset-0 overflow-y-auto">
                    {/* Container to center the panel */}
                    <div className="flex min-h-full items-center justify-center p-4">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <HeadlessDialog.Panel
                                className={`bg-white px-8 py-7 sm:px-12 sm:py-10 rounded-xl ${
                                    maxWidth ? `w-full max-w-${maxWidth}` : ""
                                }`}
                            >
                                {title !== "" && (
                                    <HeadlessDialog.Title className="text-2xl text-slate-800 font-semibold mb-3">
                                        {title}
                                    </HeadlessDialog.Title>
                                )}
                                {description !== "" && (
                                    <HeadlessDialog.Description className="text-slate-500">
                                        {description}
                                    </HeadlessDialog.Description>
                                )}
                                {children}
                            </HeadlessDialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </HeadlessDialog>
        </Transition>
    );
};

export default Dialog;
