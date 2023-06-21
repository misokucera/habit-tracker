import { Switch } from "@headlessui/react";
import dayjs from "dayjs";
import localeData from "dayjs/plugin/localeData";
import { useEffect, useState } from "react";
import { useController } from "react-hook-form";

dayjs.extend(localeData);

const DaysSelector = () => {
    const weekdaysShort = dayjs.weekdaysMin();
    const weekdays = dayjs.weekdays();
    const days = Array.from(Array(7).keys());

    const { field } = useController({
        name: "days",
        defaultValue: days,
    });

    const handleChange = (day: number) => {
        const values = field.value;

        let selection = values.includes(day)
            ? values.filter((item: number) => item !== day)
            : [...values, day];

        field.onChange(selection);
    };

    return (
        <div className="flex flex-wrap gap-2">
            {days.map((day, index) => (
                <Switch
                    key={index}
                    checked={field.value.includes(day)}
                    onChange={() => handleChange(day)}
                    className={`w-10 h-10 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 ${
                        field.value.includes(day)
                            ? "bg-slate-500 text-white"
                            : "bg-slate-200 text-slate-400"
                    }`}
                >
                    <span className="sr-only">Enable {weekdays[day]}</span>
                    <span className="text-sm">{weekdaysShort[day]}</span>
                </Switch>
            ))}
        </div>
    );
};

export default DaysSelector;
