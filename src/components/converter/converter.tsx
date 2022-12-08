import React, {useEffect} from 'react';
import {useTypedSelector} from "../../hooks/use-typed-selector";
import {useAction} from "../../hooks/use-action";

const Converter: React.FC = () => {
    const {loading_status} = useTypedSelector(state => state.converter);
    const {makeConversion} = useAction();

    return (
        <div className={"converter"}>
            converter {loading_status ? <b>Loading...</b> : <></>}
        </div>
    );
};

export default Converter;