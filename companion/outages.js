import * as messaging from "messaging";

export function OutagesAPI() { };

OutagesAPI.prototype.currentOutages = function () {

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

    let outagesCounties =
        fetch('https://www.consumersenergy.com/svcs/arcgispublic/rest/services/CEOutageMap/MapServer/3/query?f=json&outFields=COUNTY_NAME,OUTAGE_COUNT&returnGeometry=false&where=1%3D1', {
            method: "GET",
            mode: "cors"
        }).then(function (response) {
            return response.json();
        }).then(function (result) {
            let data = result["features"];
            let counties = [];

            data.forEach((county) => {
                let d = {
                    "name": county["attributes"]["COUNTY_NAME"],
                    "count": county["attributes"]["OUTAGE_COUNT"]
                }
                if (d["count"] != 0)
                    counties.push(d);
            });
            // Sort outages
            counties.sort((a, b) => {
                if (a["count"] === b["count"]) {
                    var x = a["name"].toLowerCase(), y = b["name"].toLowerCase();
                    return x < y ? -1 : x > y ? 1 : 0;
                }
                return (b["count"] - a["count"]);
            });
            // console.log(counties);
            // messaging.peerSocket.send(counties);
            return counties;
        }).catch(function (error) {
            console.log(error);
        });


    let combinedData = {
        "outagesRequest": {}, "updatedRequest": {}, "outagesCounties": {}
    };
    Promise.all([outagesRequest, updatedRequest, outagesCounties]).then(function (values) {
        messaging.peerSocket.send(values);
        return combinedData;
    });
}