import React from "react";
import Card from "./Card";
import LoadingSpiner from "./LoadingSpinner";

const CardList = (props) => {
  if (!props.onlineChannels && !props.offlineChannels) {
    return <LoadingSpiner />;
  } else {
    console.log(props);
    return <div>Here goes all channels</div>;
  }
};

export default CardList;
