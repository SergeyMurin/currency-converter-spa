import * as ConverterActionCreator from "./converter-action-creator";
import * as HistoricalActionCreator from "./historical-rates-action-creator";
import * as AvailableCurrenciesActionCreator from "./available-currencies-action-creator";

export default {
  ...ConverterActionCreator,
  ...HistoricalActionCreator,
  ...AvailableCurrenciesActionCreator,
};
