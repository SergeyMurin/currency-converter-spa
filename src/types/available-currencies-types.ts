export interface IAvailableCurrenciesState {
  loading_status: boolean | null;
  error: string | null;
  success: boolean | null;
  currencies: object | null;
}

export enum AvailableCurrenciesActionTypes {
  GET_AVAILABLE_CURRENCIES = "GET_AVAILABLE_CURRENCIES",
  GET_AVAILABLE_CURRENCIES_SUCCESS = "GET_AVAILABLE_CURRENCIES_SUCCESS",
  GET_AVAILABLE_CURRENCIES_ERROR = "GET_AVAILABLE_CURRENCIES_ERROR",
}

interface IGetAvailableCurrenciesAction {
  type: AvailableCurrenciesActionTypes.GET_AVAILABLE_CURRENCIES;
}

interface IGetAvailableCurrenciesSuccessAction {
  type: AvailableCurrenciesActionTypes.GET_AVAILABLE_CURRENCIES_SUCCESS;
  currencies: object;
}

interface IGetAvailableCurrenciesErrorAction {
  type: AvailableCurrenciesActionTypes.GET_AVAILABLE_CURRENCIES_ERROR;
  payload: string;
}

export type AvailableCurrenciesActionType =
  | IGetAvailableCurrenciesAction
  | IGetAvailableCurrenciesSuccessAction
  | IGetAvailableCurrenciesErrorAction;
