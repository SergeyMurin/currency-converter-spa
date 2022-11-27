export interface ILatestRatesState {
    loading_status: false| null;
    error: null | string;
    success: boolean| null;
    timestamp: number| null;
    base: string| null;
    date: string| null;
    rates: {}| null;
}

export enum LatestRatesActionTypes {
    GET_LATEST_RATES = "GET_LATEST_RATES",
    GET_LATEST_RATES_SUCCESS = "GET_LATEST_RATES_SUCCESS",
    GET_LATEST_RATES_ERROR = "GET_LATEST_RATES_ERROR",
}

interface IGetLatestRatesAction {
    type: LatestRatesActionTypes.GET_LATEST_RATES;
}

interface IGetLatestRatesSuccessAction {
    type: LatestRatesActionTypes.GET_LATEST_RATES_SUCCESS;
    payload: any[];
}

interface IGetLatestRatesErrorAction {
    type: LatestRatesActionTypes.GET_LATEST_RATES_ERROR;
    payload: string;
}

export type LatestRatesActionType =
    IGetLatestRatesAction |
    IGetLatestRatesSuccessAction |
    IGetLatestRatesErrorAction;