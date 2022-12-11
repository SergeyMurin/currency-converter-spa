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
    const initRequests = [getAvailableCurrencies];

    useEffect(() => {
        setIntervalForRequest(initRequests, 1000);
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


export const setIntervalForRequest = (requests: { (): void }[], interval: number) => {
    let requestIndex = 0;
    const timer = setInterval(async () => {
        await requests[requestIndex]();
        if (requestIndex === requests.length - 1) {
            clearInterval(timer);
        }
        requestIndex++;
    }, interval)
}