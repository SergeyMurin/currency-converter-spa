import React from "react";
import { Outlet } from "react-router-dom";
import { NavBar } from "./nav-bar";
import topArrow from "../../assets/icons/svg/top-arrow.svg";
import "./layout.css";

export const Layout: React.FC = () => {
  return (
    <div className={"layout"}>
      <div id={"main"}>
        <a id={"top"}></a>
        <NavBar />
        <Outlet />
      </div>
    </div>
  );
};
