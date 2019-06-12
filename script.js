const callTwichApi = function() {
  let OfflineStreamsData = [];
  let OnlineStreamsData = [];

  const MAINDIV = document.getElementById("main");
  const SPINNER = document.querySelector(".lds-dual-ring");

  const showOnlineChannels = (r) => {
    let cards = "";

    for (let i = 0; i < r.length; i++) {
      let address = "https://www.twitch.tv/" + r[i].stream.channel.display_name;
      cards += `
        <ul class='online flexcontainer m-5' onClick='window.open("${address}", "_blank")'>
          <div class="column1">
            <li>
              <div class='imgContainer'><img class='profileImg' src='${
                r[i].stream.channel.logo
              }'></div>
            </li>
          </div>
          <div class="column2">
            <li class="border-bottom">
              <div class='linkContainer'><a>${
                r[i].stream.channel.display_name
              }</a></div>
            </li>
            <li><strong>Viewers:</strong> ${r[i].stream.viewers.toLocaleString(
              undefined,
              {
                minimumFractionDigits: 0
              }
            )}</li>
            <li><strong>Currently streaming:</strong> <i>${
              r[i].stream.game
            }</i></li>
          </div>
        </ul>
      `;
    }
    MAINDIV.insertAdjacentHTML("beforeend", cards);
  };

  const showOfflineChannles = (r) => {
    let cards = "";

    for (let i = 0; i < r.length; i++) {
      let address = "https://www.twitch.tv/" + r[i].display_name;
      cards += `
        <ul class='offline flexcontainer' onClick='window.open("${address}", "_blank")'>
            <div class="column1">
              <li>
                <div class='imgContainer'><img class='profileImg' src='${
                  r[i].logo
                }'></div>
              </li>
            </div>
            <div class="column2">
              <li>
                <div class='linkContainer'><a>${r[i].display_name}</a></div>
              </li>
            </div>
          </ul>
        `;
    }
    MAINDIV.insertAdjacentHTML("beforeend", cards);
  };

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

  const URL = "https://wind-bow.glitch.me/twitch-api/";

  const CHANNELS = [
    "ESL_SC2",
    "OgamingSC2",
    "cretetion",
    "freecodecamp",
    "storbeck",
    "habathcx",
    "RobotCaleb",
    "noobs2ninjas"
  ];

  let apiCallsPromises = [];

  for (let i = 0; i < CHANNELS.length; i++) {
    apiCallsPromises.push(apiCall(CHANNELS[i], URL));
  }

  Promise.all(apiCallsPromises)
    .then(() => {
      SPINNER.classList.add("hide");
      showOnlineChannels(OnlineStreamsData);
      showOfflineChannles(OfflineStreamsData);
    })
    .catch((e) => {
      console.log(e + "Something wrong happened retreiving the data");
    });
};

callTwichApi();
