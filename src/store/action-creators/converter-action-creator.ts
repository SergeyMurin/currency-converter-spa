import { Dispatch } from "react";
import {
  ConverterActionType,
  ConverterActionTypes,
} from "../../types/currency-converter-types";
import axios from "axios";

export type ConverterParams = {
  from: string;
  to: string;
  amount: string;
};

export const makeConversion = (params: ConverterParams) => {
  return async (dispatch: Dispatch<ConverterActionType>) => {
    try {
      dispatch({ type: ConverterActionTypes.CONVERT });
      const options = {
        method: "GET",
        url: "https://currency-converter5.p.rapidapi.com/currency/convert",
        params: {
          format: "json",
          from: params.from,
          to: params.to,
          amount: params.amount,
        },
        headers: {
          "X-RapidAPI-Key":
            "a5c686aa77msh0ac3aff31c5b40fp164a17jsn5bdae1f6e7ef",
          "X-RapidAPI-Host": "currency-converter5.p.rapidapi.com",
        },
      };
      const data = await axios
        .request(options)
        .then((response) => response.data);
      dispatch({
        type: ConverterActionTypes.CONVERT_SUCCESS,
        amount: data.amount,
        rates: data.rates,
        base_currency_code: data.base_currency_code,
        base_currency_name: data.base_currency_name,
        updated_date: data.updated_date,
      });
    } catch (error) {
      dispatch({
        type: ConverterActionTypes.CONVERT_ERROR,
        payload: "Error when fetching supported symbols",
      });
    }
  };
};
