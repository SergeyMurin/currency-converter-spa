import {
    HistoricalRatesActionType,
    HistoricalRatesActionTypes,
    IHistoricalRatesState
} from "../../types/historical-rates-types";

const initialState: IHistoricalRatesState = {
    loading_status: null,
    error: null,
    success: null,
    timestamp: null,
    historical: null,
    base: null,
    date: null,
    rates: null,
}

export const historicalRatesReducer = (state = initialState, action: HistoricalRatesActionType) => {
    switch (action.type) {
        case HistoricalRatesActionTypes.GET_HISTORICAL_RATES: {
            return {loading_status: true, error: null, historical_rates: []};
        }
        case HistoricalRatesActionTypes.GET_HISTORICAL_RATES_SUCCESS: {
            return {loading_status: false, error: null, historical_rates: action.payload};
        }
        case HistoricalRatesActionTypes.GET_HISTORICAL_RATES_ERROR: {
            return {loading_status: false, error: action.payload, historical_rates: []};
        }
        default: {
            return state;
        }
    }
}