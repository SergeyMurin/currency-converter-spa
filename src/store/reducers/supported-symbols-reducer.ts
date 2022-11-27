import {
    ISupportedSymbolsState,
    SupportedSymbolsActionType,
    SupportedSymbolsActionTypes
} from "../../types/supported-symbols-types";

const initialState: ISupportedSymbolsState = {
    loading_status: null,
    error: null,
    success: null,
    result: null
}

export const supportedSymbolsReducer = (state = initialState, action: SupportedSymbolsActionType) => {
    switch (action.type) {
        case SupportedSymbolsActionTypes.GET_SUPPORTED_SYMBOLS: {
            return {loading_status: true, error: null, supported_symbols: []};
        }
        case SupportedSymbolsActionTypes.GET_SUPPORTED_SYMBOLS_SUCCESS: {
            return {loading_status: false, error: null, supported_symbols: action.payload};
        }
        case SupportedSymbolsActionTypes.GET_SUPPORTED_SYMBOLS_ERROR: {
            return {loading_status: false, error: action.payload, supported_symbols: []};
        }
        default: {
            return state;
        }
    }
}
