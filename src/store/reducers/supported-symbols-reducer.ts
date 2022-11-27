import {
    ISupportedSymbolsState,
    SupportedSymbolsActionType,
    SupportedSymbolsActionTypes
} from "../../types/supported-symbols-types";

const initialState: ISupportedSymbolsState = {
    loading_status: null,
    error: null,
    success: null,
    symbols: null
}

export const supportedSymbolsReducer = (state = initialState, action: SupportedSymbolsActionType) => {
    switch (action.type) {
        case SupportedSymbolsActionTypes.GET_SUPPORTED_SYMBOLS: {
            return {loading_status: true, error: null, success: null, symbols: {}};
        }
        case SupportedSymbolsActionTypes.GET_SUPPORTED_SYMBOLS_SUCCESS: {
            return {loading_status: false, error: null, success: true, symbols: action.symbols};
        }
        case SupportedSymbolsActionTypes.GET_SUPPORTED_SYMBOLS_ERROR: {
            return {loading_status: false, error: action.payload, success: false, symbols: {}};
        }
        default: {
            return state;
        }
    }
}
