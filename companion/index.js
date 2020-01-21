import * as messaging from "messaging";
import { me } from "companion";
import { OutagesAPI } from "./outages";

if (me.permissions.granted("access_internet")) {
    console.log("We're allowed to access the internet :)");
} else {
    console.log("No internet for us ;_;");
}

messaging.peerSocket.onopen = () => {
    console.log("Companion Socket Open");
};

messaging.peerSocket.onclose = () => {
    console.log("Companion Socket Closed");
};

messaging.peerSocket.addEventListener("message", (evt) => {
    if (evt.data) {
        let outagesApi = new OutagesAPI();
        outagesApi.currentOutages();
    }
});