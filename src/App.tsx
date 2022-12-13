import React, {useEffect} from 'react';
import "./app.css";
import AvailableCurrencies from "./components/available-currencies";
import {useAction} from "./hooks/use-action";
import {Route, Routes} from "react-router-dom";
import {ConverterPage} from "./pages/converter-page";
import {RatesPage} from "./pages/rates-page";
import {NotFoundPage} from "./pages/not-found-page";
import {Layout} from "./components/layout/layout";
import {useTypedSelector} from "./hooks/use-typed-selector";


const App = () => {
    const {getAvailableCurrencies} = useAction();
    const {loading_status}=useTypedSelector(state => state.availableCurrencies)

    useEffect(() => {
        const requestInterval: number = 0;
        let interval = setInterval(() => {
            getAvailableCurrencies();
            clearInterval(interval);
        }, requestInterval);
    }, []);
    return (
        <>
            <Routes>
                <Route path={"/"} element={<Layout/>}>
                    <Route index element={<ConverterPage loading={loading_status}/>}/>
                    <Route path={"rates"} element={<RatesPage/>}/>
                    <Route path={"*"} element={<NotFoundPage/>}/>
                </Route>
            </Routes>
            <AvailableCurrencies/>
        </>
    );
}
export default App;
