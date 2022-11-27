import {combineReducers} from "redux";
import {currencyConverterReducer} from "./currency-converter-reducer";


export const rootReducer = combineReducers({
    currencyConverter: currencyConverterReducer,
});

export type RootState = ReturnType<typeof rootReducer>;