import {
    ConverterActionType,
    ConverterActionTypes,
    IConverterState
} from "../../types/currency-converter-types";

const initialState: IConverterState = {
    loading_status: null,
    error: null,
    success: null,
    query: null,
    info: null,
    date: null,
    result: null,
};

export const converterReducer = (state = initialState, action: ConverterActionType) => {
    switch (action.type) {
        case ConverterActionTypes.CONVERT: {
            return {loading_status: true, error: null};
        }
        case ConverterActionTypes.CONVERT_SUCCESS: {
            return {loading_status: false};
        }
        case ConverterActionTypes.CONVERT_ERROR: {
            return {loading_status: false, error: action.payload};
        }
        default: {
            return state;
        }

    }
}
