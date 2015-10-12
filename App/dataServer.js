var SerialPort = require("serialport").SerialPort
var serialPort = new SerialPort("COM5", {
    baudrate: 115200,
});

var nodestatic = require("node-static"),
    http = require('http'),
    staticServer = new nodestatic.Server("."),
    io = require("socket.io").listen(staticServer),
    fs = require("fs"),
    sys = require("util"),
    exec = require("child_process").exec,
    child;

serialPort.on("open", function () {
    console.log('Serial port is open');
    serialPort.on('data', function (data) {
        console.log('data received: ' + data);
    });
});

// Setup node http server
var server = http.createServer(
    // Our main server function
    function (request, response) {
        // Grab the URL requested by the client and parse any query options
        var url = require('url').parse(request.url, true);
        var pathfile = url.pathname;
        var query = url.query;
        // Print requested file to terminal
        console.log('Request from ' + request.connection.remoteAddress + ' for: ' + pathfile);

        // Serve file using node-static			
        staticServer.serve(request, response, function (err, result) {
            if (err) {
                // Log the error
                sys.error("Error serving " + request.url + " - " + err.message);

                // Respond to the client
                response.writeHead(err.status, err.headers);
                response.end('Error 404 - file not found');
                return;
            }
            return;
        })
    });

io.sockets.on('connection', function (socket) {
    setInterval(function () {
        // You must send time (X axis) and a temperature value (Y axis) 
        var date = new Date().getTime();
        var temp = parseFloat(24) / 1000;
        socket.emit('temperatureUpdate', date, temp);
    }, 1000);
});

server.listen(8000);
// Log message
console.log('Server running at http://localhost:8000');