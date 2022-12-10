import React, {useEffect, useState} from "react";
import {useTypedSelector} from "../../hooks/use-typed-selector";
import {useAction} from "../../hooks/use-action";
import {setIntervalForRequest} from "../../App";
import {DateInput} from "./date-input";

export const Rates: React.FC = () => {
    const {loading_status} = useTypedSelector(state => state.historicalRates);
    const {getHistoricalRates} = useAction();
    const initRequests = [getHistoricalRates];


    useEffect(() => {
        setIntervalForRequest(initRequests, 1000);
    }, []);

    return (
        <div className={"rates"}>
            <DateInput/>
            {loading_status ? <b>Loading...</b> : <></>}
        </div>
    )
}