import { Dispatch } from "react";
import {
  AvailableCurrenciesActionType,
  AvailableCurrenciesActionTypes,
} from "../../types/available-currencies-types";
import axios from "axios";

export const orderObject = (obj: any): object => {
  return Object.keys(obj)
    .sort()
    .reduce((accumulator: any, key: any) => {
      accumulator[key] = obj[key];
      return accumulator;
    }, {});
};

export const getAvailableCurrencies = () => {
  return async (dispatch: Dispatch<AvailableCurrenciesActionType>) => {
    try {
      dispatch({
        type: AvailableCurrenciesActionTypes.GET_AVAILABLE_CURRENCIES,
      });
      const options = {
        method: "GET",
        url: "https://currency-converter5.p.rapidapi.com/currency/list",
        headers: {
          "X-RapidAPI-Key":
            "a5c686aa77msh0ac3aff31c5b40fp164a17jsn5bdae1f6e7ef",
          "X-RapidAPI-Host": "currency-converter5.p.rapidapi.com",
        },
      };
      const data = await axios
        .request(options)
        .then((response) => response.data);
      const ordered: object = orderObject(data.currencies);
      dispatch({
        type: AvailableCurrenciesActionTypes.GET_AVAILABLE_CURRENCIES_SUCCESS,
        currencies: ordered,
      });
    } catch (error) {
      dispatch({
        type: AvailableCurrenciesActionTypes.GET_AVAILABLE_CURRENCIES_ERROR,
        payload: "Error when fetching latest rates",
      });
    }
  };
};
