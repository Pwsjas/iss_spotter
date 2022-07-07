const { cookie } = require('request');
const request = require('request');
/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */
const fetchMyIP = function(callback) {
  request('https://api.ipify.org?format=json', (error, response, body) => {
    if (error) {
      callback(error);
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    const IP = JSON.parse(body).ip;
    callback(error, IP);
  });
};

const fetchCoordsByIP = (ip, callback) => {
  request(`https://ipwho.is/${ip}`, (error, response, body) => {
    if (error) {
      callback(error, null);
    }
    const parsedBody = JSON.parse(body);
    if (!parsedBody.success) {
      const msg = `Success status was ${parsedBody.success} when fetching coordinates. Server message says: ${parsedBody.message}`;
      callback(Error(msg), null);
      return;
    }
    const COORDS = {
      latitude: JSON.parse(body).latitude,
      longitude: JSON.parse(body).longitude
    }
    callback(error, COORDS);
  });
};

module.exports = {
  fetchMyIP,
  fetchCoordsByIP
};