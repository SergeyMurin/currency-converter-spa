import React from 'react';
import Converter from "./components/converter";
import HistoricalRates from "./components/historical-rates";
import AvailableCurrencies from "./components/available-currencies";


const App = () => {
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
