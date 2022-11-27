import {Dispatch} from "react";
import {HistoricalRatesActionType, HistoricalRatesActionTypes} from "../../types/historical-rates-types";


export const getHistoricalRates = () => {
    return async (dispatch: Dispatch<HistoricalRatesActionType>) => {
        try {
            dispatch({type: HistoricalRatesActionTypes.GET_HISTORICAL_RATES});
            //
            dispatch({type: HistoricalRatesActionTypes.GET_HISTORICAL_RATES_SUCCESS, payload: []})
        } catch (error) {
            dispatch({
                type: HistoricalRatesActionTypes.GET_HISTORICAL_RATES_ERROR,
                payload: "Error when fetching historical rates",
            })
        }
    }
}