import React, {useEffect, useState} from 'react';
import "./currency-select.css";
import Select from 'react-select';
import {CurrencySelectOptionType} from "../../../types/currency-select-option-types";
import {useTypedSelector} from "../../../hooks/use-typed-selector";
import {CurrencyWithFlagTypes} from "../../../types/currency-with-flag-types";


type Props = {
    isFrom: boolean;
    isTo: boolean;
    onFrom?: (value: string) => void;
    onTo?: (value: string) => void;
    from?: string;
    to?: string;
}

export const CurrencySelect: React.FC<Props> = ({isFrom, isTo, onFrom, onTo, from, to}: Props) => {
    const [options, setOptions] = useState<any>(null);
    const [selectedOption, setSelectedOption] = useState<any>(null);
    const {symbols} = useTypedSelector(state => state.availableCurrencies);

    useEffect(() => {
        if (symbols) {
            const opts = generateOptions(symbols);
            setOptions(opts);
            setSelectedOption(isFrom ? opts[0] : opts[1]);
        }
    }, [symbols]);


    useEffect(() => {
        disableDuplicatedOptions();
    }, [from, to]);

    useEffect(() => {
        if (selectedOption) {
            if (isFrom) {
                if (onFrom) {
                    onFrom(selectedOption.value);
                }
            } else if (onTo) {
                onTo(selectedOption.value)
            }
        }
    }, [selectedOption]);

    const disableDuplicatedOptions = () => {
        const newOptions: CurrencySelectOptionType[] = options?.map((obj: CurrencySelectOptionType) => {
            if (isTo) {
                obj.isDisabled = obj.value === from;
            } else obj.isDisabled = obj.value === to;
            return obj;
        });
        setOptions(options ? newOptions : null);
    }

    const getNotDisabledOption = () => {
        return options?.find((opt: CurrencySelectOptionType) => {
            return !opt.isDisabled;
        });
    }

    const handleChange = (selectedOption: any) => {
        setSelectedOption(selectedOption);
    }


    return (
        <div className="currency__select">
            <Select
                value={selectedOption}
                className={"currency-select"}
                defaultValue={selectedOption}
                onChange={handleChange}
                options={options}
                noOptionsMessage={() => "No currencies"}
            />
            <span>{selectedOption ? selectedOption.name : ""}</span>
        </div>
    );
};

const generateOptions = (symbols: {}) => {
    const flags: [] = require("../../../assets/images/currencies-with-flags.json");
    const options: CurrencySelectOptionType[] | any = [];

    for (let [key, value] of Object.entries(symbols)) {
        const currencyWithFlag: CurrencyWithFlagTypes | any = flags.find((obj: CurrencyWithFlagTypes) => {
            return obj.code === key;
        });
        if (typeof currencyWithFlag === "undefined") {
            continue;
        }
        options.push({
            value: currencyWithFlag?.code,
            name: currencyWithFlag?.name,

            label:
                <div className={"currency-option"}>
                    {currencyWithFlag?.flag ?
                        <img className={"currency-icon"} src={currencyWithFlag?.flag} alt={""}></img>
                        : <></>
                    }
                    <span>{currencyWithFlag.code}</span>
                </div>
        });
    }
    return options;
}
