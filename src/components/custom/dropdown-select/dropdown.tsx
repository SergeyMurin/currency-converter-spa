import React from "react";
import "./dropdown-select.css";
import {DropdownItem} from "./dropdown-item";

export const Dropdown: React.FC = () => {
    return (
        <div className={"dropdown"}>
            <DropdownItem/>
        </div>
    )
}