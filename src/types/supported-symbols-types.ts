export interface ISupportedSymbolsState {
    loading_status: boolean | null;
    error: string | null;
    success: boolean | null;
    symbols: {} | null;
}

export enum SupportedSymbolsActionTypes {
    GET_SUPPORTED_SYMBOLS = "GET_SUPPORTED_SYMBOLS",
    GET_SUPPORTED_SYMBOLS_SUCCESS = "GET_SUPPORTED_SYMBOLS_SUCCESS",
    GET_SUPPORTED_SYMBOLS_ERROR = "GET_SUPPORTED_SYMBOLS_ERROR",
}

interface IGetSupportedSymbolsAction {
    type: SupportedSymbolsActionTypes.GET_SUPPORTED_SYMBOLS;
}

interface IGetSupportedSymbolsSuccessAction {
    type: SupportedSymbolsActionTypes.GET_SUPPORTED_SYMBOLS_SUCCESS;
    symbols: {}
}

interface IGetSupportedSymbolsErrorAction {
    type: SupportedSymbolsActionTypes.GET_SUPPORTED_SYMBOLS_ERROR;
    payload: string;
}

export type SupportedSymbolsActionType =
    IGetSupportedSymbolsAction |
    IGetSupportedSymbolsSuccessAction |
    IGetSupportedSymbolsErrorAction;