var ip = "127.0.0.1";
var port = "3000";
var express = require('express');
var app = express();
var path = require('path');
var http = require("http").createServer(app);
var io = require("socket.io").listen(http);
var SerialPort = require("serialport").SerialPort;

http.listen(parseInt(port), ip);

// Handle Serial Data
var serialPort = new SerialPort("COM5", {
    baudrate: 115200,
});

serialPort.on("open", function () {
    console.log('Serial port is open');
});

serialPort.on('data', function (data) {
    console.log('data received: ' + data);
    var date = new Date().getTime();
    jData = JSON.parse(data);
    console.log(jData);
    io.sockets.emit('ultra', date, jData.ultra);
    io.sockets.emit('current', date, jData.current);
    io.sockets.emit('gyro', date, jData.gyro);
    io.sockets.emit('pressure', date, jData.pressure);
});

// Serve the app.
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.use(express.static(__dirname + '/'));