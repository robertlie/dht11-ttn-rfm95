/*
Author: Robert Lie (mobilefish.com)

A DHT11 sensor module is connected to the Arduino Uno + HopeRF RFM95 LoRa transceiver module.
The sketch ttn-otaa-dht11.ino is uploaded to the Arduino Uno.
The dht_ttn_mam.js file reads DHT11 sensor data (temperature and humidity) and displays it on the console.

Usage:
1) Enter your appID and accessKey (see https://www.mobilefish.com/developer/iota/iota_quickguide_arduino_rfm95_mam.html for more information)
2) Do not forget to type: npm install
3) You can change the default settings: MODE, SIDEKEY or SECURITYLEVEL
   If you do, make the same changes in mam_receive.js file.
4) Start the app: node dht_ttn_mam.js

More information:
https://www.mobilefish.com/developer/iota/iota_quickguide_arduino_rfm95_mam.html
*/

const ttn = require('ttn');
const moment = require('moment');
const Mam = require('./lib/mam.client.js');
const IOTA = require('iota.lib.js');

const appID = "ENTER_YOUR_APP_ID_HERE";
const accessKey = "ENTER_YOUR_ACCESSKEY_HERE";

const MODE = 'restricted';  // public, private or restricted
const SIDEKEY = 'mysecret'; // Enter only ASCII characters. Used only in restricted mode
const SECURITYLEVEL = 3; // 1, 2 or 3

const iota = new IOTA({ provider: 'https://nodes.testnet.iota.org:443' });

// Initialise MAM State
let mamState = Mam.init(iota, undefined, SECURITYLEVEL);

// Set channel mode
if (MODE == 'restricted') {
    const key = iota.utils.toTrytes(SIDEKEY);
    mamState = Mam.changeMode(mamState, MODE, key);
} else {
    mamState = Mam.changeMode(mamState, MODE);
}

// Publish to tangle
const publish = async function(packet) {
    // Create MAM Payload
    const trytes = iota.utils.toTrytes(JSON.stringify(packet));
    const message = Mam.create(mamState, trytes);

    // Save new mamState
    mamState = message.state;
    console.log('Root: ', message.root);
    console.log('Address: ', message.address);

    // Attach the payload.
    await Mam.attach(message.payload, message.address);

    return message.root;
}

ttn.data(appID, accessKey)
    .then(function (client) {
        client.on("uplink", async function (devID, payload) {
            console.log("Received uplink from ", devID)
            console.log(payload)

            // payload.metadata.time: The timezone is zero UTC offset
            const dateTime = moment(payload.metadata.time).format('DD/MM/YYYY hh:mm:ss');
            const json = {"data": JSON.stringify(payload.payload_fields), "dateTime": dateTime};

            const root = await publish(json);
            console.log(`dateTime: ${json.dateTime}, data: ${json.data}, root: ${root}`);
        })
    })
    .catch(function (error) {
        console.error("Error", error)
        process.exit(1)
    })
