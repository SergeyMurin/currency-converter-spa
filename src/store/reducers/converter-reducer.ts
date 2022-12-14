import {
  ConverterActionType,
  ConverterActionTypes,
  IConverterState,
} from "../../types/currency-converter-types";

const initialState: IConverterState = {
  loading_status: null,
  error: null,
  success: null,
  amount: null,
  rates: null,
  updated_date: null,
  base_currency_code: null,
  base_currency_name: null,
};

export const converterReducer = (
  state = initialState,
  action: ConverterActionType
) => {
  switch (action.type) {
    case ConverterActionTypes.CONVERT: {
      return { loading_status: true, error: null };
    }
    case ConverterActionTypes.CONVERT_SUCCESS: {
      return {
        loading_status: false,
        success: true,
        amount: action.amount,
        rates: action.rates,
        base_currency_name: action.base_currency_name,
        base_currency_code: action.base_currency_code,
        updated_date: action.updated_date,
      };
    }
    case ConverterActionTypes.CONVERT_ERROR: {
      return { loading_status: false, error: action.payload };
    }
    default: {
      return state;
    }
  }
};
