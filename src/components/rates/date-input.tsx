import React, {ChangeEvent, useState} from "react";

const getTodayDate = (): Date => {
    let date = new Date()
    const offset = date.getTimezoneOffset()
    date = new Date(date.getTime() - (offset * 60 * 1000));
    return date;
}

const getFormattedTodayDate = (): string => {
    const date = getTodayDate();
    return date.toISOString().split('T')[0]
}


const isFutureDate = (dateValue: string): boolean => {
    const date = new Date(dateValue);
    const nowDate = getTodayDate();
    return date >= nowDate;
}

export const DateInput: React.FC = () => {
    const [value, setValue] = useState<string>(getFormattedTodayDate());
    console.log(isFutureDate(value));


    const valueHandler = (event: ChangeEvent) => {
        if ((event.target as HTMLInputElement).value) {
            setValue((event.target as HTMLInputElement).value);
        } else setValue(getFormattedTodayDate());
    }
    return (
        <div className={"date__input"}>
            <input type={"date"} value={value} onChange={(event) => {
                valueHandler(event)
            }}/>
        </div>
    )
}