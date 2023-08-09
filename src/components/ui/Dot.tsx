import { VariantProps, cva } from "class-variance-authority";

const variants = cva("shrink-0 rounded-full", {
    variants: {
        color: {
            lime: "bg-lime-500",
            slate: "bg-slate-300",
            orange: "bg-orange-400",
            stone: "bg-stone-500",
        },
        size: {
            small: "h-2 w-2",
            normal: "h-3 w-3",
        },
    },
});

type Props = VariantProps<typeof variants>;

const Dot = ({ color = "slate", size = "normal" }: Props) => {
    return <div className={variants({ color, size })}></div>;
};

export default Dot;
