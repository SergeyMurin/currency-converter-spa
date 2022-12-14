export interface IConverterState {
  loading_status: boolean | null;
  error: string | null;
  success: boolean | null;
  amount: string | null;
  base_currency_code: string | null;
  base_currency_name: string | null;
  updated_date: string | null;
  rates: object | null;
}

export interface IRate {
  currency_name: string | null;
  rate: string | null;
  rate_for_amount: string;
}

export enum ConverterActionTypes {
  CONVERT = "CONVERT",
  CONVERT_SUCCESS = "CONVERT_SUCCESS",
  CONVERT_ERROR = "CONVERT_ERROR",
}

interface IConvertAction {
  type: ConverterActionTypes.CONVERT;
}

interface IConvertSuccessAction {
  type: ConverterActionTypes.CONVERT_SUCCESS;
  amount: string;
  base_currency_code: string;
  base_currency_name: string;
  updated_date: string;
  rates: object;
}

interface IConvertErrorAction {
  type: ConverterActionTypes.CONVERT_ERROR;
  payload: string;
}

export type ConverterActionType =
  | IConvertAction
  | IConvertSuccessAction
  | IConvertErrorAction;
