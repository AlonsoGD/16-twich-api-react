
//const CALLS = ['users/', 'streams/']

let usersData = []
let streamsData = []

const MAINDIV = document.getElementById("main");

const DOM_OBJECT = {
  cimage: document.getElementsByClassName("cimage"),
  ctitle: document.getElementsByClassName("ctitle"),
  clink: document.getElementsByClassName("clink"),
  cstatus: document.getElementsByClassName("cstatus"),
  cviewers: document.getElementsByClassName("cviewers"),
  cgame: document.getElementsByClassName("cgame")
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
        console.log('Request successful');
        usersData.push(response)
        showInfo();
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
        streamsData.push(response);
      })
      .catch(function(error) {
        console.log('Request failed', error)
    });
  }
}

function showInfo () {
  for (let i = 1; i < 5; i++) {
    if (streamsData[i].stream !== null) {
      MAINDIV.innerHTML += 
        "<div>" 
        + usersData[i].logo + " "
        + usersData[i].display_name + " "
        + streamsData[i].stream._id + " "
        + streamsData[i].stream.viewers + " "
        + streamsData[i].stream.game + " "
        + "</div>";
    }
    // DOM_OBJECT.ctitle[i].textContent = usersData[i].display_name;
    // DOM_OBJECT.cstatus[i].innerHTML = streamsData[i].stream._id;
    // DOM_OBJECT.cviewers[i].innerHTML = streamsData[i].stream.viewers;
    // DOM_OBJECT.cgame[i].innerHTML = streamsData[i].stream.game; 
  }
}
function main () {
  callTwichAPI();
  
}


main();
