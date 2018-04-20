
//const CALLS = ['users/', 'streams/']

let usersData = []
let streamsData = []

const MAINDIV = document.getElementById("main");

function callTwichAPI () {
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
          MAINDIV.innerHTML +=
          "<ul><li>" 
          + "<img class='profileImg' src='" + response.stream.channel.logo + "'>" + "<li>"
          + "<a href='https://www.twitch.tv/" + response.stream.channel.display_name + "'>" + response.stream.channel.display_name + "</a><li>"
          + "Viewers: " + response.stream.viewers + "<li>"
          + "Currently streaming: " + response.stream.game + ""
          + "</lu>";
          streamsData.push(response);
        } else {
          fetch(URL + 'users/' + CHANNELS[i])
            .then(function(response) {
              return response.json();
            })
            .then(function(response) {
              console.log('Request successful', response.display_name);
                MAINDIV.innerHTML +=
                "<ul><li>" 
                + "<img class='profileImg' src='" + response.logo + "'>" + "<li>"
                + "<a href='https://www.twitch.tv/" + response.display_name + "'>" + response.display_name + "</a></li>"
                + "</lu>";
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
}

callTwichAPI();