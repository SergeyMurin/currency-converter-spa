import * as ConverterActionCreator from "./converter-action-creator";
import * as HistoricalActionCreator from "./historical-rates-action-creator";
import * as LatestRatesActionCreator from "./latest-rates-action-creator";
import * as SupportedSymbolsActionCreator from "./supported-symbols-action-creator";

export default {
    ...ConverterActionCreator,
    ...HistoricalActionCreator,
    ...LatestRatesActionCreator,
    ...SupportedSymbolsActionCreator
}