import React, {useEffect} from 'react';
import "./app.css";
import Converter from "./components/converter/converter";
import HistoricalRates from "./components/historical-rates";
import AvailableCurrencies from "./components/available-currencies";
import {useAction} from "./hooks/use-action";
import {Route, Routes} from "react-router-dom";
import {ConverterPage} from "./pages/converter-page";
import {RatesPage} from "./pages/rates-page";
import {NotFoundPage} from "./pages/not-found-page";
import {Layout} from "./components/layout/layout";


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
        <>
            <Routes>
                <Route path={"/"} element={<Layout/>}>
                    <Route index element={<ConverterPage/>}/>
                    <Route path={"rates"} element={<RatesPage/>}/>
                    <Route path={"*"} element={<NotFoundPage/>}/>
                </Route>
            </Routes>
            <AvailableCurrencies/>
        </>
    );
}
export default App;
