let usersData = []
let streamsData = []

const MAINDIV = document.getElementById("main");

const showOnlineChannels = function (r) {
  let address = "https://www.twitch.tv/" + r.stream.channel.display_name;
  MAINDIV.innerHTML +=
  "<ul class='online'><li onClick='window.open(\"" + address + "\", \"_blank\")'>"
    + "<div class='imgContainer'><img class='profileImg' src='" 
      + r.stream.channel.logo + "'></div>" + "<div class='linkContainer'><a href='" + address + "'>" + r.stream.channel.display_name 
    + "</a></div></li>" 
    + "<li>" + "Viewers: " + r.stream.viewers + "</li>" 
    + "<li>" + "Currently streaming: " + r.stream.game + "</li>"
  + "</lu>";
};

const showOfflineChannles = function (r) {
  let address = "https://www.twitch.tv/" + r.display_name;
  MAINDIV.innerHTML +=
  "<ul class='offline'><li onClick='window.open(\"" + address + "\", \"_blank\")'>"
    + "<div class='imgContainer'><img class='profileImg' src='" 
      + r.logo + "'></div>" + "<div class='linkContainer'><a href='" + address + "'>" + r.display_name 
    + "</a></div></li>" 
  + "</lu>";
}

const callTwichApi = function () {
  const URL = 'https://wind-bow.glitch.me/twitch-api/'
  const CHANNELS = ['tsm_myth', 'FreeCodeCamp', 'shroud', 'OgamingSC2', 'cretetion', 'storbeck', 'habathcx', 'RobotCaleb', 'noobs2ninjas']

  for (let i = 0; i < CHANNELS.length; i++ ) {
    fetch(URL + 'streams/' + CHANNELS[i])
      .then(function(response) {
        return response.json();
      })
      .then(function(response) {
        console.log('Request successful'); 
        if (response.stream !== null) {
          showOnlineChannels(response);
          streamsData.push(response);
        } else {
          fetch(URL + 'users/' + CHANNELS[i])
            .then(function(response) {
              return response.json();
            })
            .then(function(response) {
              showOfflineChannles(response);
              usersData.push(response)
            })    
            .catch(function(error) {
              console.log('Request failed', error)
            });
        }
      })
      .catch(function(error) {
        console.log('Request failed', error)
    });
  }
};

callTwichApi();