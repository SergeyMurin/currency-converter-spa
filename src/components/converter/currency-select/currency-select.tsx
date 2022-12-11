import React, {useEffect, useState} from 'react';
import "./currency-select.css";
import Select from 'react-select';
import {CurrencySelectOptionType} from "../../../types/currency-select-option-types";
import {useTypedSelector} from "../../../hooks/use-typed-selector";
import {CurrencyWithFlagTypes, ICurrencyWithFlag} from "../../../types/currency-with-flag-types";


type Props = {
    isFrom: boolean;
    isTo: boolean;
    onFrom?: (value: string | null | undefined) => void;
    onTo?: (value: string | null | undefined) => void;
    from?: string;
    to?: string;
    reverse?: boolean;
    favorite: string;
    onFavoriteChange?: (value: string) => void;
}

export const CurrencySelect: React.FC<Props> = (
    {isFrom, isTo, onFrom, onTo, from, to, reverse, favorite, onFavoriteChange}: Props) => {
    const [options, setOptions] = useState<any>(null);
    const [selectedOption, setSelectedOption] = useState<any>(null);
    const {symbols} = useTypedSelector(state => state.availableCurrencies);

    useEffect(() => {
        const favorite = localStorage.getItem("converter-default-currency");
        if (onFavoriteChange) {
            onFavoriteChange(favorite ? favorite : "");
        }
    }, []);

    useEffect(() => {
        if (symbols) {
            const opts = generateOptions(symbols);
            setOptions(opts);
        }
    }, [symbols]);

    useEffect(() => {
        if (options?.length) {
            disableDuplicatedOptions();
            const notDisabledOption = getNotDisabledOption();
            const defaultCurrency = localStorage.getItem("converter-default-currency");
            if (defaultCurrency) {
                const option: CurrencySelectOptionType = findOptionByCurrency(defaultCurrency);
                setSelectedOption(isFrom ? option : notDisabledOption);
                if (onFrom) {
                    isFrom ? onFrom(option.value) : onFrom(notDisabledOption);
                }
            } else setSelectedOption(isFrom ? options[0] : options[1]);
            if (isTo && onTo) {
                onTo(options[1].value);
            }
        }
    }, [options]);


    useEffect(() => {
        if (options?.length) {
            disableDuplicatedOptions();
        }
        if (reverse) {
            isFrom ? setSelectedOption(findOptionByCurrency(from)) : setSelectedOption(findOptionByCurrency(to));
        }
    }, [from, to]);

    useEffect(() => {
        if (selectedOption?.isDisabled && isTo) {
            setSelectedOption(getNotDisabledOption());
        }
        if (selectedOption) {
            if (isFrom && onFrom) {
                onFrom(selectedOption.value);
            } else if (onTo && onTo) {
                onTo(selectedOption.value)
            }
        }
    }, [selectedOption]);

    const disableDuplicatedOptions = () => {
        options?.map((currencySelectOption: CurrencySelectOptionType) => {
            if (isTo) {
                currencySelectOption.isDisabled = currencySelectOption.value === from;
            } else currencySelectOption.isDisabled = currencySelectOption.value === to;
            return currencySelectOption;
        });
    };

    const getNotDisabledOption = () => {
        return options?.find((currencySelectOption: CurrencySelectOptionType) => {
            return !currencySelectOption.isDisabled;
        });
    };

    const handleChange = (selectedOption: any) => {
        setSelectedOption(selectedOption);
    };

    const setFavoriteCurrency = () => {
        localStorage.setItem("converter-default-currency", selectedOption.value);
        if (onFavoriteChange) {
            onFavoriteChange(selectedOption.value);
        }
    };

    const removeFavoriteCurrency = () => {
        localStorage.removeItem("converter-default-currency");
        if (onFavoriteChange) {
            onFavoriteChange("");
        }
    };

    const findOptionByCurrency = (currency: string | undefined): CurrencySelectOptionType => {
        return options.find((currencySelectOption: CurrencySelectOptionType) => {
            return currencySelectOption.value === currency;
        });
    };

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
            {favorite === selectedOption?.value ?
                <button onClick={removeFavoriteCurrency}>Remove</button> :
                <button onClick={setFavoriteCurrency}>To favorites</button>
            }
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
        if (!currencyWithFlag) {
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
};
