interface ICurrencySelectOption {
  label: string | JSX.Element | null | undefined;
  value: string | null | undefined;
  isDisabled: boolean;
}

export type CurrencySelectOptionType = ICurrencySelectOption;
