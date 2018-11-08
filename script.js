const callTwichApi = function () {
  let OfflineStreamsData = []
  let OnlineStreamsData = []
  
  const MAINDIV = document.getElementById("main");
  
  const showOnlineChannels = r => {
    for (let i = 0; i < r.length; i++){
      let address = "https://www.twitch.tv/" + r[i].stream.channel.display_name;
  
      // New ES6 Syntax
      MAINDIV.innerHTML +=
      `<ul class='online flexcontainer' onClick='window.open("${address}", "_blank")'>
        <div class="column1">
          <li>
            <div class='imgContainer'><img class='profileImg' src='${r[i].stream.channel.logo}'></div>
          </li>
        </div>
        <div class="column2">
          <li class="border-bottom">
            <div class='linkContainer'><a>${r[i].stream.channel.display_name}</a></div>
          </li>
          <li>Viewers: ${r[i].stream.viewers.toLocaleString(undefined, { minimumFractionDigits: 0})}</li>
          <li>Currently streaming: <i>${r[i].stream.game}</i></li>
        </div>
      </ul>`
    }
  };
  
  const showOfflineChannles = r => {
    for (let i = 0; i < r.length; i++){
      let address = "https://www.twitch.tv/" + r[i].display_name;
  
      MAINDIV.innerHTML += 
        `<ul class='offline flexcontainer' onClick='window.open("${address}", "_blank")'>
          <div class="column1">
            <li>
              <div class='imgContainer'><img class='profileImg' src='${r[i].logo}'></div>
            </li>
          </div>
          <div class="column2">
            <li>
              <div class='linkContainer'><a>${r[i].display_name}</a></div>
            </li>
          </div>
        </ul>`
    }
  }
  
  const apiCall = (channel, url) => {
    return fetch(url + 'streams/' + channel)
    .then(response => response.json())
    .then(response => {
      console.log('Request successful'); 
      if (response.stream !== null) {
        //showOnlineChannels(response);
        OnlineStreamsData.push(response);
      } else {
        return fetch(url + 'users/' + channel)
          .then(response => response.json())
          .then(response => {
            //showOfflineChannles(response);
            OfflineStreamsData.push(response)
          })    
          .catch(error => console.log('Request failed', error));
      }
    })
    .catch(error => console.log('Request failed', error));
  }
  
  const URL = 'https://wind-bow.glitch.me/twitch-api/'
  const CHANNELS = ['tsm_myth', 'FreeCodeCamp', 'shroud', 'OgamingSC2', 'cretetion', 'storbeck', 'habathcx', 'RobotCaleb', 'noobs2ninjas','riotgames','shadbasemurdertv','starladder1','beyondthesummit','ninja','esl_csgo','esltv_cs','imaqtpie','pgl_clean','lirik','lirikk','eleaguetvtest','summit1g','sodapoppin','meclipse','shroud','e3','twitch','dyrus','sgdq','speeddemosarchivesda','gdq','gamesdonequick','nl_kripp','tsm_theoddone','nightblue3','garenatw','Faceit','faceittv','asiagodtonegg3be0','dota2ti','dotati','starladder5','hireztv','dreamhackcs']

  let apiCallsPromises = [];

  for (let i = 0; i < CHANNELS.length; i++ ) {
    apiCallsPromises.push(apiCall(CHANNELS[i],URL));
  }

  Promise.all(apiCallsPromises)
    .then(() => {
      showOnlineChannels(OnlineStreamsData);
      showOfflineChannles(OfflineStreamsData);
    })
    .catch((e) => {
      console.log('Something wrong happened retreiving the data')
    });
};

callTwichApi();
