import React, { useEffect, useState } from "react";
import "./currency-select.css";
import Select from "react-select";
import { CurrencySelectOptionType } from "../../../types/currency-select-option-types";
import { useTypedSelector } from "../../../hooks/use-typed-selector";
import { CurrencyWithFlagTypes } from "../../../types/currency-with-flag-types";
import favoriteIcon from "../../../assets/icons/svg/favorite.svg";
import favoriteFillIcon from "../../../assets/icons/svg/favorite-fill.svg";
import { LocalStoragePath } from "../../../App";
import flagsJSON from "../../../assets/json/currency/currencies-with-flags.json";

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
  noName?: boolean;
};

type FlagsJSONType = {
  code?: string;
  name?: string;
  country?: string;
  countryCode?: string;
  flag?: string;
};

export const CurrencySelect: React.FC<Props> = ({
  isFrom,
  isTo,
  onFrom,
  onTo,
  from,
  to,
  reverse,
  favorite,
  onFavoriteChange,
  noName,
}: Props) => {
  const [options, setOptions] = useState<any>(null);
  const [selectedOption, setSelectedOption] = useState<any>(null);
  const { symbols } = useTypedSelector((state) => state.availableCurrencies);

  useEffect(() => {
    const favorite = localStorage.getItem(
      LocalStoragePath.CONVERTER_DEFAULT_CURRENCY
    );
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
      const defaultCurrency = localStorage.getItem(
        LocalStoragePath.CONVERTER_DEFAULT_CURRENCY
      );
      if (defaultCurrency) {
        const option: CurrencySelectOptionType =
          findOptionByCurrency(defaultCurrency);
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
      isFrom
        ? setSelectedOption(findOptionByCurrency(from))
        : setSelectedOption(findOptionByCurrency(to));
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
        onTo(selectedOption.value);
      }
    }
  }, [selectedOption]);

  const disableDuplicatedOptions = () => {
    options?.map((currencySelectOption: CurrencySelectOptionType) => {
      if (isTo) {
        currencySelectOption.isDisabled = currencySelectOption.value === from;
      } else
        currencySelectOption.isDisabled = currencySelectOption.value === to;
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
    localStorage.setItem(
      LocalStoragePath.CONVERTER_DEFAULT_CURRENCY,
      selectedOption.value
    );
    if (onFavoriteChange) {
      onFavoriteChange(selectedOption.value);
    }
  };

  const removeFavoriteCurrency = () => {
    localStorage.removeItem(LocalStoragePath.CONVERTER_DEFAULT_CURRENCY);
    if (onFavoriteChange) {
      onFavoriteChange("");
    }
  };

  const findOptionByCurrency = (
    currency: string | undefined
  ): CurrencySelectOptionType => {
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
        placeholder={""}
        noOptionsMessage={() => "No currencies"}
      />
      {favorite === selectedOption?.value ? (
        <div className={"icon__container"} onClick={removeFavoriteCurrency}>
          <img
            alt={""}
            id={"favorite-fill-icon"}
            className={"icon"}
            src={favoriteFillIcon.toString()}
          />
        </div>
      ) : (
        <div className={"icon__container"} onClick={setFavoriteCurrency}>
          <img
            alt={""}
            id={"favorite-icon"}
            className={"icon"}
            src={favoriteIcon.toString()}
          />
        </div>
      )}
      {!noName && (
        <span className={"currency-name no-select"}>
          {selectedOption ? selectedOption.name : ""}
        </span>
      )}
    </div>
  );
};

const generateOptions = (symbols:object) => {
  const flags: FlagsJSONType[] = flagsJSON;
  const options: CurrencySelectOptionType[] | any = [];

  for (const [key,] of Object.entries(symbols)) {
    const currencyWithFlag: CurrencyWithFlagTypes | any = flags.find(
      (obj: FlagsJSONType) => {
        return obj.code === key;
      }
    );
    if (!currencyWithFlag) {
      continue;
    }
    options.push({
      value: currencyWithFlag?.code,
      name: currencyWithFlag?.name,
      label: (
        <div className={"currency-option"}>
          {currencyWithFlag?.flag ? (
            <img
              className={"currency-icon"}
              src={currencyWithFlag?.flag}
              alt={""}
            ></img>
          ) : (
            <></>
          )}
          <span>{currencyWithFlag.code}</span>
        </div>
      ),
    });
  }
  return options;
};
