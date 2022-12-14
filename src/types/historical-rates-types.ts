export interface IHistoricalRatesState {
  loading_status: false | null;
  error: null | string;
  success: boolean | null;
  amount: string | null;
  base_currency_code: string | null;
  base_currency_name: string | null;
  updated_date: string | null;
  rates: object | null;
}

export enum HistoricalRatesActionTypes {
  GET_HISTORICAL_RATES = "GET_HISTORICAL_RATES",
  GET_HISTORICAL_RATES_SUCCESS = "GET_HISTORICAL_RATES_SUCCESS",
  GET_HISTORICAL_RATES_ERROR = "GET_HISTORICAL_RATES_ERROR",
  SET_RATES = "SET_RATES",
}

interface IGetHistoricalRatesAction {
  type: HistoricalRatesActionTypes.GET_HISTORICAL_RATES;
}

interface IGetHistoricalRatesSuccessAction {
  type: HistoricalRatesActionTypes.GET_HISTORICAL_RATES_SUCCESS;
  amount: string;
  base_currency_code: string;
  base_currency_name: string;
  updated_date: string;
  rates: object;
}

interface IGetHistoricalRatesErrorAction {
  type: HistoricalRatesActionTypes.GET_HISTORICAL_RATES_ERROR;
  payload: string;
}

interface ISetRates {
  type: HistoricalRatesActionTypes.SET_RATES;
  rates: object;
}

export type HistoricalRatesActionType =
  | IGetHistoricalRatesAction
  | IGetHistoricalRatesSuccessAction
  | IGetHistoricalRatesErrorAction
  | ISetRates;
