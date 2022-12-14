import React from "react";
import "./loader.css";

type Props = {
  className?: string;
};
export const Loader: React.FC<Props> = ({ className }) => {
  return (
    <div id={"loader-container"} className={`${className}`}>
      <div id={"loader"} className={`lds-ellipsis`}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};
