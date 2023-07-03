import React from "react";

type Props = {
    children: React.ReactNode;
};

const Headline = ({ children }: Props) => {
    return (
        <h1 className="inline-block text-2xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-sky-400 to-purple-400">
            {children}
        </h1>
    );
};

export default Headline;
