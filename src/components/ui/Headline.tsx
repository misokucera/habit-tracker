import React from "react";

type Props = {
    children: React.ReactNode;
};

const Headline = ({ children }: Props) => {
    return (
        <h1 className="inline-block bg-gradient-to-r from-sky-400 to-purple-400 bg-clip-text text-2xl font-extrabold text-transparent">
            {children}
        </h1>
    );
};

export default Headline;
