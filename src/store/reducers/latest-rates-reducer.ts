import {ILatestRatesState, LatestRatesActionType, LatestRatesActionTypes,} from "../../types/latest-rates-types";


const initialState: ILatestRatesState = {
    loading_status: null,
    error: null,
    success: null,
    timestamp: null,
    base: null,
    date: null,
    rates: null,
}

export const latestRatesReducer = (state = initialState, action: LatestRatesActionType) => {
    switch (action.type) {

        case LatestRatesActionTypes.GET_LATEST_RATES: {
            return {loading_status: true, error: null, rates: []};
        }
        case LatestRatesActionTypes.GET_LATEST_RATES_SUCCESS: {
            return {loading_status: false, rates: action.payload};
        }
        case LatestRatesActionTypes.GET_LATEST_RATES_ERROR: {
            return {loading_status: false, error: action.payload, rates: []};
        }
        default: {
            return state;
        }
    }
}