import * as messaging from "messaging";
import { me } from "companion";
import { OutagesAPI } from "./outages";
import { settingsStorage } from "settings";

let outagesApi = new OutagesAPI();

if (me.permissions.granted("access_internet")) {
    console.log("We're allowed to access the internet :)");
} else {
    console.log("No internet for us ;_;");
}

messaging.peerSocket.onopen = () => {
    console.log("Companion Socket Open");
    // restoreSettings();
};

messaging.peerSocket.onclose = () => {
    console.log("Companion Socket Closed");
};

messaging.peerSocket.addEventListener("message", (evt) => {
    if (evt.data) {
        outagesApi.currentOutages();
        // outagesApi.outagesByCounty();
    }
});

// settingsStorage.onchange = evt => {
//     let data = {
//         key: evt.key,
//         newValue: evt.newValue
//     };
//     sendVal(data);
// };

// // Restore any previously saved settings and send to the device
// function restoreSettings() {
//     for (let index = 0; index < settingsStorage.length; index++) {
//         let key = settingsStorage.key(index);
//         if (key) {
//             let data = {
//                 key: key,
//                 newValue: settingsStorage.getItem(key)
//             };
//             sendVal(data);
//         }
//     }
// }

// // Send data to device using Messaging API
// function sendVal(data) {
//     if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
//         messaging.peerSocket.send(data);
//     }
// }
