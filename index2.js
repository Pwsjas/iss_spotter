const { nextISSTimesForMyLocation } = require('./iss_promised');

nextISSTimesForMyLocation()
  .then((passTimes) => {
    for (let flyover of passTimes) {
      const date = new Date(0);
      date.setUTCSeconds(flyover.risetime);
      console.log(`Next pass on ${date} for ${flyover.duration} seconds!`);
    }
  }).catch((error) => {
    console.log("It didn't work: ", error.message);
  });