import React from "react";
import {DropdownInput} from "./dropdown-input";
import {Dropdown} from "./dropdown";


export const DropdownSelect: React.FC = () => {
    return (
        <div className={"dropdown__select"}>
            <DropdownInput/>
            <Dropdown/>
        </div>
    );
}