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

    // let outagesByCounty =
    //     fetch('https://www.consumersenergy.com/svcs/arcgispublic/rest/services/CEOutageMap/MapServer/3/query?f=json&outFields=CUSTOMER_COUNT,OUTAGE_COUNT&returnGeometry=false&where=1%3D1', {
    //         method: "GET",
    //         mode: "cors"
    //     }).then(function (response) {
    //         return response.json();
    //     }).catch(function (error) {
    //         console.log(error);
    //     });

    let combinedData = { "outagesRequest": {}, "updatedRequest": {} };
    Promise.all([outagesRequest, updatedRequest]).then(function (values) {
        messaging.peerSocket.send(values);
        return combinedData;
    });
}
