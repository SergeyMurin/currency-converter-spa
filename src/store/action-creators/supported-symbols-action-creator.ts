import {Dispatch} from "react";
import {SupportedSymbolsActionType, SupportedSymbolsActionTypes} from "../../types/supported-symbols-types";


export const getSupportedSymbols = () => {
    return async (dispatch: Dispatch<SupportedSymbolsActionType>) => {
        try {
            dispatch({type: SupportedSymbolsActionTypes.GET_SUPPORTED_SYMBOLS});
            //
            dispatch({type: SupportedSymbolsActionTypes.GET_SUPPORTED_SYMBOLS_SUCCESS, payload: []})
        } catch (error) {
            dispatch({
                type: SupportedSymbolsActionTypes.GET_SUPPORTED_SYMBOLS_ERROR,
                payload: "Error when fetching latest rates",
            })
        }
    }
}