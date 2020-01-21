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
    this.outages.text = "Outages: " + outageInfo[0]["OutageCount"];
    this.incidents.text = "Incidents: " + outageInfo[0]["IncidentCount"];
    this.updated.text = outageInfo[1]["UpdateTime"];
    this.total.text = outageInfo[0]["CustomerCount"];
    this.percent.text = outageInfo[0]["PctOut"] + "%";
}