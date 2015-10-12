var express = require('express');
var app = express();
var path = require('path');
var http = require( "http" ).createServer( app );
var io = require("socket.io").listen(http);
var SerialPort = require("serialport").SerialPort;

http.listen(3000, "127.0.0.1");

//Handle Serial Data
var serialPort = new SerialPort("COM2", {
    baudrate: 115200,
});

serialPort.on("open", function () {
    console.log('Serial port is open');

});

serialPort.on('data', function (data) {
    console.log('data received: ' + data);
    console.log('float data: ' + parseFloat(data));
    var date = new Date().getTime();
    io.sockets.emit('packet', date, parseFloat(data));
});

//Serve the app.
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.use(express.static(__dirname + '/'));

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});
