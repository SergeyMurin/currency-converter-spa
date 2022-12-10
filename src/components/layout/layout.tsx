import React from "react";
import {Outlet} from "react-router-dom";
import {NavBar} from "./nav-bar";

export const Layout: React.FC = () => {
    return (
        <div className={"layout"}>
            <div id={"main"}>
                <NavBar/>
                <Outlet/>
            </div>
        </div>
    )
}