
//const CALLS = ['users/', 'streams/']

let usersData = []
let streamsData = []

const MAINDIV = document.getElementById("main");

function showInfo () {
  for (let i = 1; i < streamsData.length; i++) {
    if (streamsData[i].stream !== null) {
      MAINDIV.innerHTML += 
        "<ul><li>" 
        + usersData[i].logo + "<li>"
        + usersData[i].display_name + "<li>"
        + streamsData[i].stream._id + "<li>"
        + streamsData[i].stream.viewers + "<li>"
        + streamsData[i].stream.game + ""
        + "</lu>";
        console.log("TST");
    } 
  }
}

function callTwichAPI () {
  const URL = 'https://wind-bow.glitch.me/twitch-api/'
  const CHANNELS = ['tsm_myth', 'FreeCodeCamp', 'shroud', 'OgamingSC2', 'cretetion', 'storbeck', 'habathcx', 'RobotCaleb', 'noobs2ninjas']

  for (let i = 0; i < CHANNELS.length; i++ ) {
    fetch(URL + 'users/' + CHANNELS[i])
      .then(function(response) {
        return response.json();
      })
      .then(function(response) {
        console.log('Request successful', response.display_name);
          MAINDIV.innerHTML +=
          "<ul><li>" 
          + response.logo + "<li>"
          + response.display_name
          + "</lu>";
        usersData.push(response)
      })
      

      .catch(function(error) {
        console.log('Request failed', error)
    });

    fetch(URL + 'streams/' + CHANNELS[i])
      .then(function(response) {
        return response.json();
      })
      .then(function(response) {
        console.log('Request successful'); 
        if (response.stream !== null) {
          MAINDIV.innerHTML +=
          "<ul><li>" 
          + response.stream._id + "<li>"
          + response.stream.viewers + "<li>"
          + response.stream.game + ""
          + "</lu>";
          streamsData.push(response);
        }
      })
      .catch(function(error) {
        console.log('Request failed', error)
    });
  }
}

callTwichAPI();