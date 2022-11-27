import {
    CurrencyConverterActionType,
    CurrencyConverterActionTypes,
    ICurrencyConverterState
} from "../../types/currency-converter-types";

const initialState: ICurrencyConverterState = {
    loading_status: false,
    historical_rates: [],
    rates: [],
    supported_symbols: [],
    error: null,
};

export const currencyConverterReducer = (state = initialState, action: CurrencyConverterActionType) => {
    switch (action.type) {
        case CurrencyConverterActionTypes.CURRENCY_CONVERT: {
            return {loading_status: true, error: null};
        }
        case CurrencyConverterActionTypes.CURRENCY_CONVERT_SUCCESS: {
            return {loading_status: false};
        }
        case CurrencyConverterActionTypes.CURRENCY_CONVERT_ERROR: {
            return {loading_status: false, error: action.payload};
        }

        case CurrencyConverterActionTypes.GET_RATES: {
            return {loading_status: true, error: null, rates: []};
        }
        case CurrencyConverterActionTypes.GET_RATES_SUCCESS: {
            return {loading_status: false, rates: action.payload};
        }
        case CurrencyConverterActionTypes.GET_RATES_ERROR: {
            return {loading_status: false, error: action.payload, rates: []};
        }

        case CurrencyConverterActionTypes.GET_HISTORICAL_RATES: {
            return {loading_status: true, error: null, historical_rates: []};
        }
        case CurrencyConverterActionTypes.GET_HISTORICAL_RATES_SUCCESS: {
            return {loading_status: false, error: null, historical_rates: action.payload};
        }
        case CurrencyConverterActionTypes.GET_HISTORICAL_RATES_ERROR: {
            return {loading_status: false, error: action.payload, historical_rates: []};
        }

        case CurrencyConverterActionTypes.GET_SUPPORTED_SYMBOLS:{
            return {loading_status: true, error: null, supported_symbols:[]};
        }
        case CurrencyConverterActionTypes.GET_SUPPORTED_SYMBOLS_SUCCESS:{
            return {loading_status: false, error: null, supported_symbols: action.payload};
        }
        case CurrencyConverterActionTypes.GET_SUPPORTED_SYMBOLS_ERROR:{
            return {loading_status: false, error: action.payload, supported_symbols: []};
        }

        default: {
            return state;
        }

    }
}
