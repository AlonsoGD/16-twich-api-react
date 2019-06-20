import React from "react";
import Card from "./Card";
import LoadingSpiner from "./LoadingSpinner";
import "./CardList.css";

const CardList = (props) => {
  if (!props.onlineChannels && !props.offlineChannels) {
    return <LoadingSpiner />;
  } else {
    const offlineCards = props.offlineChannels.map((elem) => {
      return (
        <Card
          key={elem._id}
          status="offline"
          streamName={elem.display_name}
          logo={elem.logo}
          twichLink={"https://www.twitch.tv/" + elem.display_name}
          bio={elem.bio}
        />
      );
    });

    const onlineCards = props.onlineChannels.map((elem) => {
      return (
        <Card
          key={elem.stream._id}
          status="online"
          streamName={elem.stream.channel.display_name}
          logo={elem.stream.channel.logo}
          twichLink={
            "https://www.twitch.tv/" + elem.stream.channel.display_name
          }
          viewers={elem.stream.viewers}
          game={elem.stream.game}
        />
      );
    });
    return (
      <div className="cardList">
        {onlineCards}
        {offlineCards}
      </div>
    );
  }
};

export default CardList;
