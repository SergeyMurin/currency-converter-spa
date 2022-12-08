import React, {useState} from "react";
import "./currency-input.css";
import {CurrencySelect} from "../currency-select/currency-select";

export const CurrencyInput: React.FC = () => {
    const [inputValue, setInputValue] = useState("");

    const inputValueHandler = (event: React.ChangeEvent) => {
        const regex = /^\d*(\.\d{0,4})*(\.)?$/;
        const value = (event.target as HTMLInputElement).value;
        if (regex.test(value)) {
            setInputValue(value);
        }
    };

    const inputValuePrettier = (event: any) => {
        const value = (event.target as HTMLInputElement).value;
        const separator = "."
        if (value.includes(separator)) {
            const temp = value.split(separator);
            if (temp[1].length === 0) {
                setInputValue(value + "00");
            }
            if (temp[1].length === 1) {
                setInputValue(value + "0");
            }
        } else {
            setInputValue(value.length ? value + separator + "00" : value);
        }
    }

    return (
        <div className={"currency__input"}>
            <input className={"currency-input"}
                   onChange={(event) => inputValueHandler(event)}
                   onBlur={(event) => inputValuePrettier(event)}
                   value={inputValue}
                   placeholder={"0.00"}/>
            <CurrencySelect/>
        </div>
    )
}