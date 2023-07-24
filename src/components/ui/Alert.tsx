type Props = {
    children: React.ReactNode;
};

const Alert = ({ children }: Props) => {
    return (
        <p
            role="alert"
            className="inline-block w-max rounded bg-red-100 px-2 py-1 text-sm text-red-800"
        >
            {children}
        </p>
    );
};

export default Alert;
