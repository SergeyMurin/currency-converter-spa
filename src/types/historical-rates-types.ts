export interface IHistoricalRatesState {
    loading_status: false| null;
    error: null | string;
    success: boolean| null;
    timestamp: number| null;
    historical: boolean| null;
    base: string| null;
    date: string| null;
    rates: {}| null;
}

export enum HistoricalRatesActionTypes {
    GET_HISTORICAL_RATES = "GET_HISTORICAL_RATES",
    GET_HISTORICAL_RATES_SUCCESS = "GET_HISTORICAL_RATES_SUCCESS",
    GET_HISTORICAL_RATES_ERROR = "GET_HISTORICAL_RATES_ERROR",
}


interface IGetHistoricalRatesAction {
    type: HistoricalRatesActionTypes.GET_HISTORICAL_RATES;
}

interface IGetHistoricalRatesSuccessAction {
    type: HistoricalRatesActionTypes.GET_HISTORICAL_RATES_SUCCESS;
    payload: any[];
}

interface IGetHistoricalRatesErrorAction {
    type: HistoricalRatesActionTypes.GET_HISTORICAL_RATES_ERROR;
    payload: string;
}

export type HistoricalRatesActionType =
    IGetHistoricalRatesAction |
    IGetHistoricalRatesSuccessAction |
    IGetHistoricalRatesErrorAction;