// index.js
const { nextISSTimesForMyLocation } = require('./iss');
// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }

//   console.log('It worked! Returned IP:' , ip);
//   fetchCoordsByIP(ip, (error, coords) => {
//     if (error) {
//       console.log("It didn't work!" , error);
//       return;
//     }
//     console.log('It worked! Returned Coords:' , coords);

//     fetchISSFlyOverTimes(coords, (error, location) => {
//       if (error) {
//         console.log("It didn't work!" , error);
//         return;
//       }
//       console.log('It worked! Returned flyover times:', location);

//     });
//   });
// });

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  // success, print out the deets!
  for (let flyover of passTimes) {
    const date = new Date(0);
    date.setUTCSeconds(flyover.risetime);
    console.log(`Next pass on ${date} for ${flyover.duration} seconds!`);
  }
});