import document from "document";
import * as messaging from "messaging";
import { vibration } from "haptics";

const btn = document.getElementById("btn");
const eventName = "triggerEvent";

let container = document.getElementById("container");
let currentIndex = container.value;
container.value = 0;

let outages = document.getElementById("OutageCount");
let incidents = document.getElementById("IncidentCount");
let updated = document.getElementById("UpdateTime");
let total = document.getElementById("CustomerCount");
let percent = document.getElementById("PercentOut");

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
  console.log(JSON.stringify(evt.data));

  //Write to the display
  outages.text = "Outages: " + evt.data[0]["OutageCount"];
  incidents.text = "Incidents: " + evt.data[0]["IncidentCount"];
  updated.text = evt.data[1]["UpdateTime"];
  total.text = evt.data[0]["CustomerCount"];
  percent.text = evt.data[0]["PctOut"] + "%";

  vibration.start("confirmation-max");
}