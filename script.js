
//const CALLS = ['users/', 'streams/']

let usersData = []
let streamsData = []

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
  for (let i = 1; i < DOM_OBJECT.cimage.length; i++) {
    DOM_OBJECT.cimage[0].src = usersData[0].logo;
    DOM_OBJECT.ctitle[0].innerHTML = usersData[0].display_name;
    DOM_OBJECT.cstatus[0].innerHTML = streamsData[0].stream._id;
    DOM_OBJECT.cviewers[0].innerHTML = streamsData[0].stream.viewers;
    DOM_OBJECT.cgame[0].innerHTML = streamsData[0].stream.game; 
  }
}
function main () {
  callTwichAPI();
  
}


main();
