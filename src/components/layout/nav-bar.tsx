import React from "react";
import {NavLink} from "react-router-dom";
import Converter from "../converter/converter";

export const NavBar: React.FC = () => {
    return (
        <div className={"nav-bar"}>
            <NavLink className={({isActive}) => "nav-link" + (isActive ? "__active" : "")} to={"/"}
                     replace={true}>Converter</NavLink>
            <NavLink className={({isActive}) => "nav-link" + (isActive ? "__active" : "")} to={"rates"}
                     replace={true}>Rates</NavLink>
        </div>
    )
}