import {Dispatch} from "react";
import {LatestRatesActionType, LatestRatesActionTypes} from "../../types/latest-rates-types";


export const getLatestRates = () => {
    return async (dispatch: Dispatch<LatestRatesActionType>) => {
        try {
            dispatch({type: LatestRatesActionTypes.GET_LATEST_RATES});
            //
            dispatch({type: LatestRatesActionTypes.GET_LATEST_RATES_SUCCESS, payload: []})
        } catch (error) {
            dispatch({
                type: LatestRatesActionTypes.GET_LATEST_RATES_ERROR,
                payload: "Error when fetching latest rates",
            })
        }
    }
}