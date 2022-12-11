import React, {useEffect, useState} from "react";
import {useTypedSelector} from "../../hooks/use-typed-selector";
import {useAction} from "../../hooks/use-action";
import {DateInput} from "./date-input";
import {RatesList} from "./rates-list";
import {CurrencySelect} from "../converter/currency-select/currency-select";


export const Rates: React.FC = () => {
    const {loading_status} = useTypedSelector(state => state.historicalRates);
    const {symbols} = useTypedSelector(state => state.availableCurrencies);

    const {getHistoricalRates} = useAction();
    const [currency, setCurrency] = useState("");
    const [date, setDate] = useState("");
    const [favorite, setFavorite] = useState("");
    const onFavoriteChange = (value: string) => {
        setFavorite(value);
    }

    const fromHandler = (value: string | null | undefined) => {
        setCurrency(value ? value : "");
    }

    useEffect(() => {
        if (symbols && date && currency) {
            getHistoricalRates({from: currency, to: "", amount: "1", date: date});
        }
    }, [currency, date, symbols]);

    const dateChangeHandler = (newDate: string) => {
        setDate(newDate);
    }


    return (
        <div className={"rates"}>
            <CurrencySelect isFrom={true} isTo={false} from={currency} onFrom={fromHandler} favorite={favorite}
                            onFavoriteChange={onFavoriteChange}/>
            <DateInput onDateChange={dateChangeHandler}/>
            {loading_status ? <b>Loading...</b> : <RatesList currency={currency}/>}
        </div>
    )
};

const toCurrencyString = (symbols: {}): string => {
    let currencyString = "";
    for (let [key, value] of Object.entries(symbols)) {
        currencyString += key;
    }
    return currencyString;
}