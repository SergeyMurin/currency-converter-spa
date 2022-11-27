import {Dispatch} from "react";
import {ConverterActionType, ConverterActionTypes} from "../../types/currency-converter-types";

export const makeConversion = () => {
    return async (dispatch: Dispatch<ConverterActionType>) => {
        try {
            dispatch({type: ConverterActionTypes.CONVERT});
            //
            dispatch({type: ConverterActionTypes.CONVERT_SUCCESS, payload: []});
        } catch (error) {
            dispatch({
                type: ConverterActionTypes.CONVERT_ERROR,
                payload: "Error when fetching supported symbols",
            })
        }
    }
}