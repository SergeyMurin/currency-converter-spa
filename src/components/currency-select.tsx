import React from "react";
import {useTypedSelector} from "../hooks/use-typed-selector";
import flags from "../assets/images/currencies-with-flags.json";

const generateOptions = (symbols: {}) => {
    let options: JSX.Element | JSX.Element[] = [];
    const flags: [] = require("../assets/images/currencies-with-flags.json");

    for (let [key, value] of Object.entries(symbols)) {
        const optionFlag: { flag: string } = flags.filter((obj): {} => {
            return obj["code"] === key;
        })[0];
        const baseImg = optionFlag?.flag;
        options = options.concat(
            <div key={key}>
                <span>
                    {baseImg ? <img src={baseImg}></img> : <></>}
                    <span key={key}>{key}</span>
                </span>
            </div>
        );
    }
    return options;
}


export const CurrencySelect: React.FC = () => {
    const {symbols} = useTypedSelector(state => state.availableCurrencies);

    return (
        <div className={"currency-select"}>
            {symbols ? generateOptions(symbols) : <></>}
        </div>
    )
}