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
container.value = 1;

btn.addEventListener("click", function () {
    vibration.start("bump");
    sendEventIfReady(eventName);
});

messaging.peerSocket.onopen = function (eventName) {
    ui.updateUI("loading");
    sendEventIfReady(eventName)
}

messaging.peerSocket.onmessage = function (evt) {
    // vibration.start("confirmation-max");
    ui.updateUI("loaded", evt.data);
    ui.updateOutageList(evt.data);
    // console.log(JSON.stringify(evt.data));
}

messaging.peerSocket.onerror = function (err) {
    ui.updateUI("error");
}

function sendEventIfReady(eventName) {
    if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
        messaging.peerSocket.send({ eventName: eventName });
    }
}