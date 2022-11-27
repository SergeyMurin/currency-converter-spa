export interface ICurrencyConverterState {
    loading_status: boolean;
    rates: any[];
    historical_rates: any[];
    supported_symbols: any[];
    error: string | null;
}

export enum CurrencyConverterActionTypes {
    CURRENCY_CONVERT = "CURRENCY_CONVERT",
    CURRENCY_CONVERT_SUCCESS = "CURRENCY_CONVERT_SUCCESS",
    CURRENCY_CONVERT_ERROR = "CURRENCY_CONVERT_ERROR",

    GET_RATES = "GET_RATES",
    GET_RATES_SUCCESS = "GET_RATES_SUCCESS",
    GET_RATES_ERROR = "GET_RATES_ERROR",

    GET_HISTORICAL_RATES = "GET_HISTORICAL_RATES",
    GET_HISTORICAL_RATES_SUCCESS = "GET_HISTORICAL_RATES_SUCCESS",
    GET_HISTORICAL_RATES_ERROR = "GET_HISTORICAL_RATES_ERROR",

    GET_SUPPORTED_SYMBOLS = "GET_SUPPORTED_SYMBOLS",
    GET_SUPPORTED_SYMBOLS_SUCCESS = "GET_SUPPORTED_SYMBOLS_SUCCESS",
    GET_SUPPORTED_SYMBOLS_ERROR = "GET_SUPPORTED_SYMBOLS_ERROR",


}

interface ICurrencyConvertAction {
    type: CurrencyConverterActionTypes.CURRENCY_CONVERT;
}

interface ICurrencyConvertSuccessAction {
    type: CurrencyConverterActionTypes.CURRENCY_CONVERT_SUCCESS;
    payload: any[];
}

interface ICurrencyConvertErrorAction {
    type: CurrencyConverterActionTypes.CURRENCY_CONVERT_ERROR;
    payload: string;
}


interface IGetRatesAction {
    type: CurrencyConverterActionTypes.GET_RATES;
}

interface IGetRatesSuccessAction {
    type: CurrencyConverterActionTypes.GET_RATES_SUCCESS;
    payload: any[];
}

interface IGetRatesErrorAction {
    type: CurrencyConverterActionTypes.GET_RATES_ERROR;
    payload: string;
}


interface IGetHistoricalRatesAction {
    type: CurrencyConverterActionTypes.GET_HISTORICAL_RATES;
}

interface IGetHistoricalRatesSuccessAction {
    type: CurrencyConverterActionTypes.GET_HISTORICAL_RATES_SUCCESS;
    payload: any[];
}

interface IGetHistoricalRatesErrorAction {
    type: CurrencyConverterActionTypes.GET_HISTORICAL_RATES_ERROR;
    payload: string;
}


interface IGetSupportedSymbolsAction {
    type: CurrencyConverterActionTypes.GET_SUPPORTED_SYMBOLS;
}

interface IGetSupportedSymbolsSuccessAction {
    type: CurrencyConverterActionTypes.GET_SUPPORTED_SYMBOLS_SUCCESS;
    payload: any[];
}

interface IGetSupportedSymbolsErrorAction {
    type: CurrencyConverterActionTypes.GET_SUPPORTED_SYMBOLS_ERROR;
    payload: string;
}


export type CurrencyConverterActionType =
    ICurrencyConvertAction |
    ICurrencyConvertSuccessAction |
    ICurrencyConvertErrorAction |

    IGetRatesAction |
    IGetRatesSuccessAction |
    IGetRatesErrorAction |

    IGetHistoricalRatesAction |
    IGetHistoricalRatesSuccessAction |
    IGetHistoricalRatesErrorAction |

    IGetSupportedSymbolsAction |
    IGetSupportedSymbolsSuccessAction |
    IGetSupportedSymbolsErrorAction;