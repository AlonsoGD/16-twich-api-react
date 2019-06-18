import React from "react";
import Title from "./Title";
import Legend from "./Legend";
import CardList from "./CardList";
import CHANNELS from "../channels/channels";

class App extends React.Component {
  state = { offlineChannels: null, onlineChannels: null };

  componentDidMount() {
    const URL = "https://wind-bow.glitch.me/twitch-api/";
    let OfflineStreamsData = [];
    let OnlineStreamsData = [];

    const apiCall = (channel, url) => {
      return fetch(url + "streams/" + channel)
        .then((response) => response.json())
        .then((response) => {
          console.log("Request successful");
          if (response.stream !== null) {
            OnlineStreamsData.push(response);
          } else {
            return fetch(url + "users/" + channel)
              .then((response) => response.json())
              .then((response) => {
                OfflineStreamsData.push(response);
              })
              .catch((error) => console.log("Request failed", error));
          }
        })
        .catch((error) => console.log("Request failed", error));
    };

    let apiCallsPromises = [];

    for (let i = 0; i < CHANNELS.length; i++) {
      apiCallsPromises.push(apiCall(CHANNELS[i], URL));
    }

    Promise.all(apiCallsPromises)
      .then(() => {
        this.setState({
          offlineChannels: OfflineStreamsData,
          onlineChannels: OnlineStreamsData
        });
        console.log(this.state.offlineChannels, this.state.onlineChannels);
      })
      .catch((e) => {
        console.log(e + "Something wrong happened retreiving the data");
      });
  }

  render() {
    return (
      <>
        <header>
          <Title />
        </header>
        <div style={{ textAlign: "center" }}>
          <Legend status="Online" />
          <Legend status="Offline" />
        </div>
        <CardList
          onlineChannels={this.state.onlineChannels}
          offlineChannels={this.state.offlineChannels}
        />
      </>
    );
  }
}

export default App;
