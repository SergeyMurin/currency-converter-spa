import {Dispatch} from "react";
import {HistoricalRatesActionType, HistoricalRatesActionTypes} from "../../types/historical-rates-types";
import axios from "axios";

export type RatesParams = {
    from: string,
    amount: string,
    to: string,
    date: string,
}

export const getHistoricalRates = (params: RatesParams) => {
    return async (dispatch: Dispatch<HistoricalRatesActionType>) => {
        try {
            dispatch({type: HistoricalRatesActionTypes.GET_HISTORICAL_RATES});

            const options = {
                method: 'GET',
                url: `https://currency-converter5.p.rapidapi.com/currency/historical/${params.date}`,
                params: {from: params.from, amount: params.amount, format: 'json', to: params.to},
                headers: {
                    'X-RapidAPI-Key': 'a5c686aa77msh0ac3aff31c5b40fp164a17jsn5bdae1f6e7ef',
                    'X-RapidAPI-Host': 'currency-converter5.p.rapidapi.com'
                }
            };
            const data = await axios.request(options).then(response => response.data);
            dispatch({
                type: HistoricalRatesActionTypes.GET_HISTORICAL_RATES_SUCCESS,
                amount: data.amount,
                rates: data.rates,
                base_currency_code: data.base_currency_code,
                base_currency_name: data.base_currency_name,
                updated_date: data.updated_date,
            });

        } catch (error) {
            dispatch({
                type: HistoricalRatesActionTypes.GET_HISTORICAL_RATES_ERROR,
                payload: "Error when fetching historical rates",
            })
        }
    }
}

export const setRates = (rates: {}) => {
    return (dispatch: Dispatch<HistoricalRatesActionType>) => {
        try {
            dispatch({type: HistoricalRatesActionTypes.SET_RATES, rates: rates})
        } catch (error) {
            console.error(error);
        }
    }
}