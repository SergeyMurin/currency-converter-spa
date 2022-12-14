import {
  IAvailableCurrenciesState,
  AvailableCurrenciesActionType,
  AvailableCurrenciesActionTypes,
} from "../../types/available-currencies-types";

const initialState: IAvailableCurrenciesState = {
  loading_status: null,
  error: null,
  success: null,
  currencies: null,
};

export const availableCurrenciesReducer = (
  state = initialState,
  action: AvailableCurrenciesActionType
) => {
  switch (action.type) {
    case AvailableCurrenciesActionTypes.GET_AVAILABLE_CURRENCIES: {
      return { loading_status: true, error: null, success: null, symbols: {} };
    }
    case AvailableCurrenciesActionTypes.GET_AVAILABLE_CURRENCIES_SUCCESS: {
      return {
        loading_status: false,
        error: null,
        success: true,
        symbols: action.currencies,
      };
    }
    case AvailableCurrenciesActionTypes.GET_AVAILABLE_CURRENCIES_ERROR: {
      return {
        loading_status: false,
        error: action.payload,
        success: false,
        symbols: {},
      };
    }
    default: {
      return state;
    }
  }
};
