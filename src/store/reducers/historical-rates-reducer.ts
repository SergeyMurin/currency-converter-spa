import {
  HistoricalRatesActionType,
  HistoricalRatesActionTypes,
  IHistoricalRatesState,
} from "../../types/historical-rates-types";

const initialState: IHistoricalRatesState = {
  loading_status: null,
  error: null,
  success: null,
  rates: null,
  updated_date: null,
  base_currency_code: null,
  base_currency_name: null,
  amount: null,
};

export const historicalRatesReducer = (
  state = initialState,
  action: HistoricalRatesActionType
) => {
  switch (action.type) {
    case HistoricalRatesActionTypes.GET_HISTORICAL_RATES: {
      return { loading_status: true, error: null, rates: {} };
    }
    case HistoricalRatesActionTypes.GET_HISTORICAL_RATES_SUCCESS: {
      return {
        loading_status: false,
        error: null,
        success: true,
        rates: action.rates,
        updated_date: action.updated_date,
        base_currency_name: action.base_currency_name,
        base_currency_code: action.base_currency_code,
        amount: action.amount,
      };
    }
    case HistoricalRatesActionTypes.GET_HISTORICAL_RATES_ERROR: {
      return { loading_status: false, error: action.payload, rates: {} };
    }
    case HistoricalRatesActionTypes.SET_RATES: {
      return { rates: action.rates };
    }
    default: {
      return state;
    }
  }
};
