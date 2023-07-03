import React from "react";

type Props = {
    children: React.ReactNode;
};

const ContentBox = ({ children }: Props) => {
    return <div className="rounded-lg bg-white p-6 sm:p-8">{children}</div>;
};

export default ContentBox;
