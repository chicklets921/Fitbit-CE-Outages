import * as messaging from "messaging";
import { me } from "companion";

if (me.permissions.granted("access_internet")) {
  console.log("We're allowed to access the internet :)");
} else {
  console.log("No internet for us ;_;");
}

messaging.peerSocket.addEventListener("message", (evt) => {
  if (evt.data) {
    getOutages();
  }
});

function getOutages() {
  let outagesRequest =
    fetch('https://www.consumersenergy.com/OutageMap/OutageMap/GetOutageCount', {
      method: "GET",
      mode: "cors"
    }).then(function (response) {
      return response.json();
    }).catch(function (error) {
      console.log(error);
    });

  let updatedRequest =
    fetch('https://www.consumersenergy.com/OutageMap/OutageMap/getLastMapUpdateTime', {
      method: "GET",
      mode: "cors"
    }).then(function (response) {
      return response.json();
    }).catch(function (error) {
      console.log(error);
    });

  let combinedData = { "outagesRequest": {}, "updatedRequest": {} };
  Promise.all([outagesRequest, updatedRequest]).then(function (values) {
    messaging.peerSocket.send(values);
    return combinedData;
  });
}