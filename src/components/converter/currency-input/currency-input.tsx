import React, {useEffect, useState} from "react";
import "./currency-input.css";
import {CurrencySelect} from "../currency-select/currency-select";
import availableCurrencies from "../../available-currencies";

type Props = {
    isFrom: boolean;
    isTo: boolean;
    onAmount?: (value: string) => void;
    onTo?: (value: string | null | undefined) => void;
    onFrom?: (value: string | null | undefined) => void;
    amount?: string;
    from?: string;
    to?: string;
    reverse: boolean;
}

export const CurrencyInput: React.FC<Props> = ({isFrom, isTo, onAmount, onFrom, onTo, amount, from, to,reverse}: Props) => {
    const [inputValue, setInputValue] = useState("");

    const inputValueHandler = (event: React.ChangeEvent) => {
        if (isTo) {
            return;
        }
        const regex = /^\d*(\.\d{0,4})*(\.)?$/;
        const value = (event.target as HTMLInputElement).value;
        if (regex.test(value)) {
            setInputValue(value);
        }
    };

    const keyDownHandler = (event: any) => {
        if (event.key === "Enter") {
            inputValuePrettier(event);
        }
    }

    const inputValuePrettier = (event: any) => {
        const targetValue = (event.target as HTMLInputElement).value;
        let value = "";
        const separator = "."
        if (targetValue.includes(separator)) {
            const temp = targetValue.split(separator);
            if (temp[1].length === 0) {
                value = targetValue + "00";
                setInputValue(value);
            } else if (temp[1].length === 1) {
                value = targetValue + "0";
                setInputValue(value);
            } else {
                value = targetValue;
                setInputValue(value);
            }

        } else {
            value = targetValue.length ? targetValue + separator + "00" : targetValue;
            setInputValue(value);
        }
        if (onAmount) {
            onAmount(value !== "0.00" ? value : "");
        }
    }

    return (
        <div className={"currency__input"}>
            <input className={"currency-input"}
                   onChange={(event) => inputValueHandler(event)}
                   onBlur={(event) => inputValuePrettier(event)}
                   value={isFrom ? inputValue : amount}
                   placeholder={"0.00"}
                   onKeyDown={(event) => keyDownHandler(event)}
            />
            <CurrencySelect
                reverse={reverse}
                isFrom={isFrom} isTo={isTo}
                onTo={(value) => onTo ? onTo(value) : null}
                onFrom={(value) => onFrom ? onFrom(value) : null}
                from={from}
                to={to}
            />
        </div>
    )
}