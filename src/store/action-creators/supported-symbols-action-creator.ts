import {Dispatch} from "react";
import {SupportedSymbolsActionType, SupportedSymbolsActionTypes} from "../../types/supported-symbols-types";
import axios from "axios";


export const getSupportedSymbols = () => {
    return async (dispatch: Dispatch<SupportedSymbolsActionType>) => {
        try {
            dispatch({type: SupportedSymbolsActionTypes.GET_SUPPORTED_SYMBOLS});
            const options = {
                method: 'GET',
                url: 'https://fixer-fixer-currency-v1.p.rapidapi.com/symbols',
                headers: {
                    'X-RapidAPI-Key': 'a5c686aa77msh0ac3aff31c5b40fp164a17jsn5bdae1f6e7ef',
                    'X-RapidAPI-Host': 'fixer-fixer-currency-v1.p.rapidapi.com'
                }
            };
            const data = await axios.request(options).then((response) => response.data);
            dispatch({type: SupportedSymbolsActionTypes.GET_SUPPORTED_SYMBOLS_SUCCESS, symbols: data.symbols});
        } catch (error) {
            dispatch({
                type: SupportedSymbolsActionTypes.GET_SUPPORTED_SYMBOLS_ERROR,
                payload: "Error when fetching latest rates",
            })
        }
    }
}