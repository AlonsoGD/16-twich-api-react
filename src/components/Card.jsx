import React from "react";
import "./Card.css";

const Card = (props) => {
  return (
    <a href={props.twichLink}>
      <ul className={`${props.status} flexcontainer`}>
        <div className="column1">
          <li>
            <div className="imgContainer">
              <img
                className="profileImg"
                src={props.logo}
                alt="Streamer Avatar"
              />
            </div>
          </li>
        </div>
        <div className="column2">
          <li className="border-bottom">
            <div className="linkContainer">{props.streamName}</div>
          </li>
          {props.status === "offline" ? (
            ""
          ) : (
            <>
              <li>
                <strong>Viewers: </strong>
                {props.viewers.toLocaleString(undefined, {
                  minimumFractionDigits: 0
                })}
              </li>
              <li>
                <strong>Currently streaming: </strong>
                <i>{props.game}</i>
              </li>
            </>
          )}
        </div>
      </ul>
    </a>
  );
};

export default Card;
