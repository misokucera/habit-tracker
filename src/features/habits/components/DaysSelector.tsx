import { Switch } from "@headlessui/react";
import dayjs from "dayjs";
import localeData from "dayjs/plugin/localeData";
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
                    className={`w-10 h-10 font-semibold rounded-md transition-colors focus:outline-none focus-visible:ring-2 ${
                        field.value.includes(day)
                            ? "bg-purple-200 text-purple-600 focus-visible:ring-purple-400"
                            : "bg-slate-100 text-slate-400 focus-visible:ring-slate-400"
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
