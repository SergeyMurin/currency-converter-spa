import {combineReducers} from "redux";
import {converterReducer} from "./converter-reducer";
import {historicalRatesReducer} from "./historical-rates-reducer";
import {latestRatesReducer} from "./latest-rates-reducer";
import {supportedSymbolsReducer} from "./supported-symbols-reducer";


export const rootReducer = combineReducers({
    converter: converterReducer,
    historicalRates: historicalRatesReducer,
    latestRates: latestRatesReducer,
    supportedSymbols: supportedSymbolsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;