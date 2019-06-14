import React from "react";
import "./Legend.css";

const Legend = (props) => {
  let colorClass = props.status === "Online" ? "online" : "offline";

  return (
    <>
      <span className={`legend ${colorClass}`} />
      <span>{props.status}</span>
    </>
  );
};

export default Legend;
