import document from "document";
import * as messaging from "messaging";
import { vibration } from "haptics";

const btn = document.getElementById("btn");
const eventName = "triggerEvent";

var outages = document.getElementById("OutageCount");
var incidents = document.getElementById("IncidentCount");
var updated = document.getElementById("UpdateTime");

document.addEventListener("load", function () {
  sendEventIfReady(eventName);
});

btn.addEventListener("click", function () {
  vibration.start("bump");
  sendEventIfReady(eventName);
});

function sendEventIfReady(eventName) {
  if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
    messaging.peerSocket.send({ eventName: eventName });
  }
}

messaging.peerSocket.onopen = function (eventName) {
  outages.text = "Loading info...";
  sendEventIfReady(eventName)
}

messaging.peerSocket.onmessage = function (evt) {
  // Log the returned info
  // console.log(JSON.stringify(evt.data));

  //Write to the display
  outages.text = "Outages: " + evt.data[0]["OutageCount"];
  incidents.text = "Incidents: " + evt.data[0]["IncidentCount"];
  updated.text = evt.data[1]["UpdateTime"];

  vibration.start("confirmation-max");
}