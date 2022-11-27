import React, {useEffect} from 'react';
import {useTypedSelector} from "../hooks/use-typed-selector";
import {useAction} from "../hooks/use-action";

const SupportedSymbols: React.FC = () => {
    const {loading_status} = useTypedSelector(state => state.supportedSymbols);
    const {getSupportedSymbols} = useAction();
    useEffect(() => {
        getSupportedSymbols();
    }, []);
    return (
        <div className={"supported-symbols"}>
            supported symbols {loading_status ? <b>Loading...</b> : <></>}
        </div>
    );
};

export default SupportedSymbols;