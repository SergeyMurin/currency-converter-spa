import React, {useEffect, useState} from 'react';
import {useTypedSelector} from "../../hooks/use-typed-selector";
import {useAction} from "../../hooks/use-action";
import {CurrencyInput} from "./currency-input/currency-input";
import {IRate} from "../../types/currency-converter-types";

export type ConverterParams = {
    from: string,
    to: string,
    amount: string,
}

const Converter: React.FC = () => {
    const {loading_status} = useTypedSelector(state => state.converter);
    const [amount, setAmount] = useState<string>("");
    const [to, setTo] = useState<string>("");
    const [from, setFrom] = useState<string>("");
    const [convertIsDisable, setConvertIsDisable] = useState<boolean>(true);
    const {makeConversion} = useAction();
    const {rates} = useTypedSelector(state => state.converter);
    const [rate, setRate] = useState<IRate>();


    useEffect(() => {
        if (!convertIsDisable) {
            makeConversion({amount: amount, from: from, to: to});
        }
    }, [to, from, amount]);

    useEffect(() => {
        if (rates) {
            setRateFromRates(rates);
        }
    }, [rates]);

    const amountHandler = (value: string) => {
        setAmount(value);
        !!value ? setConvertIsDisable(false) : setConvertIsDisable(true);
    }

    const fromHandler = (value: string) => {
        setFrom(value);
    }

    const toHandler = (value: string) => {
        setTo(value);
    }

    const setRateFromRates = (rates: any) => {
        const rate: IRate = {
            currency_name: "",
            rate: "",
            rate_for_amount: "",
        };
        for (let [key, value] of Object.entries(rates)) {
            rate.currency_name = (value as IRate).currency_name;
            rate.rate = (value as IRate).rate;
            rate.rate_for_amount = (value as IRate).rate_for_amount;
        }
        setRate(rate);
    }


    return (
        <div className={"converter"}>
            converter {loading_status ? <b>Loading...</b> : <></>}
            <CurrencyInput isFrom={true} isTo={false} onAmount={amountHandler} onFrom={fromHandler} from={from}
                           to={to}/>
            <CurrencyInput isFrom={false} isTo={true} onTo={toHandler} amount={rate ? rate.rate_for_amount : ""}
                           from={from} to={to}/>
        </div>
    );
};

export default Converter;