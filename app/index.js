import document from "document";
import * as messaging from "messaging";
import { vibration } from "haptics";
import { OutagesUI } from "./ui";

const btn = document.getElementById("btn");
const eventName = "triggerEvent";

let ui = new OutagesUI();

ui.updateUI("disconnected");

let container = document.getElementById("container");
let currentIndex = container.value;
container.value = 0;

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
    ui.updateUI("loading");
    sendEventIfReady(eventName)
}

messaging.peerSocket.onmessage = function (evt) {
    console.log(JSON.stringify(evt.data));
    ui.updateUI("loaded", evt.data);
    vibration.start("confirmation-max");
}

messaging.peerSocket.onerror = function (err) {
    ui.updateUI("error");
}