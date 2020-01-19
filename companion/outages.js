// export function OutagesAPI(){};

// OutagesAPI.prototype.numberOfOutages = function(){
//   let self = this;
//   return new Promise(function(resolve, reject){
//     let url = "https://www.consumersenergy.com/OutageMap/OutageMap/GetOutageCount?callback=getData";

//     fetch(url).then(function(response){
//       return response.json();
//     }).then(function(json){
//       console.log("GOT THE INFO!");
//     }).catch(function(error){
//       reject(error);
//     });
//   });
// }




// function loadData() {
//     let url = "https://www.consumersenergy.com/OutageMap/OutageMap/GetOutageCount?callback=getData";
//     let updateTimeUrl = "https://www.consumersenergy.com/OutageMap/OutageMap/getLastMapUpdateTime?callback=getData"
//     fetch(url).then(response =>
//         response.json().then(data => ({
//             data: data,
//             status: response.status
//         })).then(res => {
//             console.log(res.data.OutageCount);
//             document.getElementById("demotext").text = res.data.OutageCount;
//         }));
// };
// loadData();
// setInterval(loadData, 3000);


// function getOutages(evt){
//   let eventName = evt.data.eventName;
//   let outageUrl = 'https://www.consumersenergy.com/OutageMap/OutageMap/GetOutageCount';
//   let updatedUrl = 'https://www.consumersenergy.com/OutageMap/OutageMap/getLastMapUpdateTime';

//   fetch(outageUrl, {
//     method: "GET",
//     mode: "no-cors"
//   }).then(function(response){
//     return response.json();
//   }).then(function(myJSON){
//     console.log(myJSON);
//     messaging.peerSocket.send(myJSON);
//   }).catch(function(error){
//     console.log(error);
//   });
// }