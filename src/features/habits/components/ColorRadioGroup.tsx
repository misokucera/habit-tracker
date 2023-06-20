import { useState } from "react";
import { RadioGroup } from "@headlessui/react";
import { useController, useFormContext } from "react-hook-form";

type Color = {
    value: string;
    label: string;
};

const colors: Color[] = [
    { value: "#94a3b8", label: "Slate" },
    { value: "#a8a29e", label: "Stone" },
    { value: "#f87171", label: "Red" },
    { value: "#fb923c", label: "Orange" },
    { value: "#facc15", label: "Yellow" },
    { value: "#a3e635", label: "Lime" },
];

const ColorRadioGroup = () => {
    // const [selectedColor, setSelectedColor] = useState(colors[0]);
    const { field } = useController({
        name: "color",
        defaultValue: colors[0].value,
    });

    return (
        <RadioGroup
            value={field.value}
            onChange={field.onChange}
            onBlur={field.onBlur}
            ref={field.ref}
            name={field.name}
        >
            <RadioGroup.Label className="text-sm text-slate-500 mb-2 block">
                Color
            </RadioGroup.Label>
            <div className="flex flex-wrap gap-2">
                {colors.map((color) => (
                    <RadioGroup.Option
                        key={color.value}
                        value={color.value}
                        className={({ active }) =>
                            `rounded-full ${
                                active ? "outline-none outline-offset-2" : ""
                            }`
                        }
                        style={{
                            outlineColor: `${color.value}55`,
                            outlineWidth: 5,
                        }}
                    >
                        {({ checked, active }) => (
                            <div
                                className={`w-8 h-8 rounded-full hover:opacity-60 transition-opacity cursor-pointer ${
                                    checked
                                        ? "outline-none hover:opacity-100"
                                        : ""
                                }`}
                                style={{
                                    backgroundColor: color.value,
                                    outlineColor: color.value,
                                }}
                            ></div>
                        )}
                    </RadioGroup.Option>
                ))}
            </div>
        </RadioGroup>
    );
};

export default ColorRadioGroup;
