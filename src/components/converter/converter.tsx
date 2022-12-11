import React, {useEffect, useState} from 'react';
import {useTypedSelector} from "../../hooks/use-typed-selector";
import {useAction} from "../../hooks/use-action";
import {CurrencyInput} from "./currency-input/currency-input";
import {IRate} from "../../types/currency-converter-types";

const Converter: React.FC = () => {
    const {loading_status} = useTypedSelector(state => state.converter);
    const {rates} = useTypedSelector(state => state.converter);
    const {makeConversion} = useAction();

    const [amount, setAmount] = useState<string>("");
    const [to, setTo] = useState<string>("");
    const [from, setFrom] = useState<string>("");
    const [convertIsDisable, setConvertIsDisable] = useState<boolean>(true);
    const [rate, setRate] = useState<IRate>();
    const [reverse, setReverse] = useState(false);
    const [favorite, setFavorite] = useState("");

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
    };

    const fromHandler = (value: string | null | undefined) => {
        setFrom(value ? value : "");
    };

    const toHandler = (value: string | null | undefined) => {
        setTo(value ? value : "");
    };

    const onFavoriteChange = (value: string) => {
        setFavorite(value);
    };

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
    };

    const reverseHandler = () => {
        setFrom(to);
        setTo(from);
        setReverse(true);
    };

    return (
        <div className={"converter"}>
            converter {loading_status ? <b>Loading...</b> : <></>}
            <CurrencyInput isFrom={true} isTo={false} onAmount={amountHandler} onFrom={fromHandler} from={from}
                           to={to} reverse={reverse} favorite={favorite} onFavoriteChange={onFavoriteChange}/>
            <button onClick={reverseHandler} disabled={loading_status}>reverse</button>
            <CurrencyInput isFrom={false} isTo={true} onTo={toHandler}
                           amount={rate && amount ? rate.rate_for_amount : ""}
                           from={from} to={to} reverse={reverse} favorite={favorite}
                           onFavoriteChange={onFavoriteChange}/>

        </div>
    );
};

export default Converter;