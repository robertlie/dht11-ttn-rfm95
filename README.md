# Send DHT11 sensor data using the Arduino Uno, HopeRF RFM95 LoRa transceiver and The Things Network to IOTA Tangle using Masked Authenticated Messaging (MAM)

This is a tutorial how to send DHT11 sensor data using the Arduino Uno, HopeRF RFM95 LoRa transceiver and The Things Network to IOTA Tangle using Masked Authenticated Messaging (MAM).

## Requirements

All hardware requirements and how to wire the DHT11 sensor module to the Arduino Uno and HopeRF RFM95 LoRa transceiver is explained in:  
[https://www.mobilefish.com/developer/iota/iota\_quickguide\_arduino\_rfm95\_mam.html][1]

![alt text](https://www.mobilefish.com/images/developer/arduino_uno_rfm95_dht11.jpg "DHT11 sensor module connected to the Arduino Uno and HopeRF RFM95 LoRa transceiver")

## Documents

More information about The Things Network and The Things Gateway:  
[https://www.thethingsnetwork.org][2]<br/>
[https://www.thethingsnetwork.org/docs/gateways/gateway][3]<br/>

## Features

The project consists of one Arduino sketch and 2 NodeJS files.

- ttn-otaa-dht11.ino: This sketch is uploaded to the Arduino Uno which reads the DHT11 sensor data and sends it to a LoRa Gateway (e.g. The Things Gateway). If the Gateway is connected to The Things Network server, this data can be seen in The Things Network console.

- dht\_ttn\_mam.js: This NodeJS file reads the DHT11 sensor data from The Things Network server. This data is processed and published to the Tangle using MAM.

- mam\_receive.js: Extract the stored data from the Tangle using MAM and display the data.

## Installation

```
npm install
```

## Usage

How to use the scripts see:
[https://www.mobilefish.com/developer/iota/iota\_quickguide\_arduino\_rfm95\_mam.html][1]

[1]: https://www.mobilefish.com/developer/iota/iota\_quickguide\_arduino\_rfm95\_mam.html "Mobilefish.com"
[2]: https://www.thethingsnetwork.org/ "The Things Network"
[3]: https://www.thethingsnetwork.org/docs/gateways/gateway "The Things Gateway"
