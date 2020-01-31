import document from "document";

export function OutagesUI() {
    this.outages = document.getElementById("OutageCount");
    this.incidents = document.getElementById("IncidentCount");
    this.updated = document.getElementById("UpdateTime");
    this.total = document.getElementById("CustomerCount");
    this.percent = document.getElementById("PercentOut");
}

OutagesUI.prototype.updateUI = function (state, outageInfo) {
    if (state === "loaded") {
        this.updateOutageInfo(outageInfo);
    } else {
        if (state === "loading") {
            this.outages.text = "Loading info...";
        } else if (state === "disconnected") {
            this.outages.text = "Connect to phone..."
        } else if (state === "error") {
            this.outages.text = "Something terrible happened.";
        }
    }
}

OutagesUI.prototype.updateOutageInfo = function (outageInfo) {
    this.outages.text = "Outages: " + parseInt(outageInfo[0]["OutageCount"]).toLocaleString();
    this.incidents.text = "Incidents: " + parseInt(outageInfo[0]["IncidentCount"]).toLocaleString();
    this.updated.text = outageInfo[1]["UpdateTime"];
    this.total.text = parseInt(outageInfo[0]["CustomerCount"]).toLocaleString();
    this.percent.text = outageInfo[0]["PctOut"] + "%";
}

OutagesUI.prototype.updateOutageList = function (outageInfo) {

    let VTList = document.getElementById("my-list");
    let NUM_ELEMS = 100;

    VTList.delegate = {
        getTileInfo: function (index) {
            return {
                type: "my-pool",
                value: "County",
                index: index
            };
        },
        configureTile: function (tile, info) {
            if (info.type == "my-pool") {
                tile.getElementById("text").text = `${info.value} ${info.index}`;
                let touch = tile.getElementById("touch-me");
                touch.onclick = evt => {
                    console.log(`touched: ${info.index}`);
                };
            }
        }
    };
    // VTList.length must be set AFTER VTList.delegate
    VTList.length = NUM_ELEMS;
}