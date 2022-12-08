import React, {useEffect, useState} from 'react';
import Select from 'react-select';
import {CurrencySelectOptionType} from "../../../types/currency-select-option-types";
import {useTypedSelector} from "../../../hooks/use-typed-selector";
import {CurrencyWithFlagTypes, ICurrencyWithFlag} from "../../../types/currency-with-flag-types";


const generateOptions = (symbols: {}) => {

    const options: CurrencySelectOptionType[] | any = [];
    const flags: [] = require("../../../assets/images/currencies-with-flags.json");

    for (let [key, value] of Object.entries(symbols)) {
        const currencyWithFlag: CurrencyWithFlagTypes | any = flags.find((obj: CurrencyWithFlagTypes) => {
            return obj.code === key;
        });
        if (typeof currencyWithFlag === "undefined") {
            continue;
        }

        options.push({
            value: currencyWithFlag?.code,
            label:
                <div className={"currency-option"}>
                    {currencyWithFlag?.flag ?
                        <div className={"currency__icon"}>
                            <img className={"currency-icon"} src={currencyWithFlag?.flag}></img>
                        </div>
                        : <></>
                    }
                    <span>{currencyWithFlag.code}</span>

                </div>
        });
    }
    return options;
}

export const CurrencySelect: React.FC = () => {
    const [options, setOptions] = useState<any>(null);
    const [selectedOption, setSelectedOption] = useState(null);
    const {symbols} = useTypedSelector(state => state.availableCurrencies);

    useEffect(() => {
        if (symbols) {
            setOptions(generateOptions(symbols));
        }
    }, [symbols]);

    useEffect(()=>{
        console.log("selected option:",selectedOption);
    },[selectedOption])

    const handleChange = (selectedOption: any) => {
        setSelectedOption(selectedOption);
    }

    return (
        <div className="currency__select">
            <Select
                className={"currency-select"}
                defaultValue={selectedOption}
                onChange={handleChange}
                options={options}
                noOptionsMessage={() => "No currencies"}
            />
        </div>
    );
}