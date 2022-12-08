import React, {useEffect} from 'react';
import "./app.css";
import Converter from "./components/converter/converter";
import HistoricalRates from "./components/historical-rates";
import AvailableCurrencies from "./components/available-currencies";
import {useAction} from "./hooks/use-action";
import {CurrencySelect} from "./components/converter/currency-select/currency-select";
import {CurrencyInput} from "./components/converter/currency-input/currency-input";


const App = () => {
    const {getAvailableCurrencies} = useAction();
    const {getHistoricalRates} = useAction();
    const initRequests = [getAvailableCurrencies, getHistoricalRates];
    useEffect(() => {
        let requestIndex = 0;
        const interval = 1000;
        const timer = setInterval(async () => {
            await initRequests[requestIndex]();
            if (requestIndex === initRequests.length - 1) {
                clearInterval(timer);
            }
            requestIndex++;
        }, interval)
    }, []);
    return (
        <div className="App">
            App
            <Converter/>
            <HistoricalRates/>
            <AvailableCurrencies/>

        </div>
    );
}
export default App;
