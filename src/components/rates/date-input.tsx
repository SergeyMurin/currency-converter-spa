import React, { ChangeEvent, useEffect, useState } from "react";

type Props = {
  onDateChange: (date: string) => void;
};

export const DateInput: React.FC<Props> = ({ onDateChange }) => {
  const [value, setValue] = useState<string>(getFormattedTodayDate());

  useEffect(() => {
    onDateChange(value);
  }, [value]);

  const valueHandler = (event: ChangeEvent) => {
    const targetValue = (event.target as HTMLInputElement).value;
    if (targetValue && !isFutureDate(targetValue)) {
      setValue(targetValue);
    } else {
      const date = getFormattedTodayDate();
      setValue(date);
    }
  };

  const blurHandler = () => {
    setValue(value);
  };

  const keyDownHandler = (event: any) => {
    if (event.key === "Enter") {
      setValue(value);
    }
  };

  const todayHandler = () => {
    setValue(getFormattedTodayDate);
  };

  return (
    <div className={"date__input"}>
      <input
        className={"date-input"}
        type={"date"}
        value={value}
        onChange={(event) => {
          valueHandler(event);
        }}
        onBlur={blurHandler}
        onKeyDown={keyDownHandler}
      />
      <button onClick={todayHandler}>Today</button>
    </div>
  );
};

const getTodayDate = (): Date => {
  let date = new Date();
  const offset = date.getTimezoneOffset();
  date = new Date(date.getTime() - offset * 60 * 1000);
  return date;
};

const getFormattedTodayDate = (): string => {
  const date = getTodayDate();
  return date.toISOString().split("T")[0];
};

const isFutureDate = (dateValue: string): boolean => {
  const date = new Date(dateValue);
  const nowDate = getTodayDate();
  return date >= nowDate;
};
