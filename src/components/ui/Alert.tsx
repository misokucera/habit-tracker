type Props = {
    children: React.ReactNode;
};

const Alert = ({ children }: Props) => {
    return (
        <p
            role="alert"
            className="px-2 w-max py-1 inline-block rounded text-sm text-red-800 bg-red-100"
        >
            {children}
        </p>
    );
};

export default Alert;
