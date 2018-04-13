const URL = 'https://wind-bow.glitch.me/twitch-api/'
const CHANNELS = ['tsm_myth', 'FreeCodeCamp', 'shroud', 'OgamingSC2', 'cretetion', 'storbeck', 'habathcx', 'RobotCaleb', 'noobs2ninjas']
//const CALLS = ['users/', 'streams/']

let usersData = []
let streamsData = []

for (let i = 0; i < CHANNELS.length; i++ ) {
  fetch(URL + 'users/' + CHANNELS[i])
    .then(function(response) {
      return response.json();
    })
    .then(function(response) {
      console.log('Request successful', usersData.push(response));
    })
    .catch(function(error) {
      console.log('Request failed', error)
  });

  fetch(URL + 'streams/' + CHANNELS[i])
    .then(function(response) {
      return response.json();
    })
    .then(function(response) {
      console.log('Request successful', streamsData.push(response));
    })
    .catch(function(error) {
      console.log('Request failed', error)
  });
}