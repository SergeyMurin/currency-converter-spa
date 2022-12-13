import { combineReducers } from "redux";
import { converterReducer } from "./converter-reducer";
import { historicalRatesReducer } from "./historical-rates-reducer";
import { availableCurrenciesReducer } from "./available-currencies-reducer";

export const rootReducer = combineReducers({
  converter: converterReducer,
  historicalRates: historicalRatesReducer,
  availableCurrencies: availableCurrenciesReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
