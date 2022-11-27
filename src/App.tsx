import React, {useEffect} from 'react';
import {useAction} from "./hooks/use-action";
import {useTypedSelector} from "./hooks/use-typed-selector";
import Converter from "./components/converter";
import HistoricalRates from "./components/historical-rates";
import LatestRates from "./components/latest-rates";
import SupportedSymbols from "./components/supported-symbols";


const App = () => {
    return (
        <div className="App">
            App
            <Converter/>
            <HistoricalRates/>
            <LatestRates/>
            <SupportedSymbols/>
        </div>
    );
}
export default App;
