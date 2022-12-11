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
}

export const CurrencySelect: React.FC<Props> = ({isFrom, isTo, onFrom, onTo, from, to, reverse}: Props) => {
    const [options, setOptions] = useState<any>(null);
    const [selectedOption, setSelectedOption] = useState<any>(null);
    const [favorite, setFavorite] = useState(false);
    const {symbols} = useTypedSelector(state => state.availableCurrencies);


    useEffect(() => {
        if (symbols) {
            const opts = generateOptions(symbols);
            setOptions(opts);
        }
    }, [symbols]);

    useEffect(() => {
        if (options?.length) {
            disableDuplicatedOptions();
            const notDisabled = getNotDisabledOption();
            const defaultCurrency = localStorage.getItem("converter-default-currency");
            if (defaultCurrency) {
                const opt: CurrencySelectOptionType = findOptionByCurrency(defaultCurrency);
                setSelectedOption(isFrom ? opt : notDisabled);
                if (onFrom) {
                    isFrom ? onFrom(opt.value) : onFrom(notDisabled);
                }
            } else setSelectedOption(isFrom ? options[0] : options[1]);
            if (isTo && onTo) {
                onTo(options[1].value);
            }
        }
    }, [options])


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
        isFavorite();
    }, [selectedOption]);

    const disableDuplicatedOptions = () => {
        options?.map((obj: CurrencySelectOptionType) => {
            if (isTo) {
                obj.isDisabled = obj.value === from;
            } else obj.isDisabled = obj.value === to;
            return obj;
        });
    }

    const getNotDisabledOption = () => {
        return options?.find((opt: CurrencySelectOptionType) => {
            return !opt.isDisabled;
        });
    }

    const handleChange = (selectedOption: any) => {
        setSelectedOption(selectedOption);
    }

    const setFavoriteCurrency = () => {
        localStorage.setItem("converter-default-currency", selectedOption.value);
        isFavorite();

    }

    const removeFavoriteCurrency = () => {
        localStorage.removeItem("converter-default-currency");
        isFavorite();
    }

    const isFavorite = () => {
        const currency = localStorage.getItem("converter-default-currency");
        setFavorite(currency === selectedOption?.value);
    }

    const findOptionByCurrency = (currency: string | undefined): CurrencySelectOptionType => {
        return options.find((obj: CurrencySelectOptionType) => {
            return obj.value === currency;
        })
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
            {!favorite ?
                <button onClick={setFavoriteCurrency}>To favorites</button>
                : <button onClick={removeFavoriteCurrency}>Remove</button>
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
