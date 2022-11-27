import {Dispatch} from "react";
import {CurrencyConverterActionType, CurrencyConverterActionTypes} from "../../types/currency-converter-types";

export const getSupportedSymbols = () => {
    return async (dispatch: Dispatch<CurrencyConverterActionType>) => {
        try {
            dispatch({type:CurrencyConverterActionTypes.GET_SUPPORTED_SYMBOLS});

            //
        } catch (error) {
            dispatch({
                type: CurrencyConverterActionTypes.GET_SUPPORTED_SYMBOLS_ERROR,
                payload: "Error when fetching supported symbols",
            })
        }
    }
}