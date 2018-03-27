var express = require('express'),
    app = express(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server);

server.listen(3000);

app.get('/',function(req, res){
	res.sendFile(__dirname + '/polylines.html');
});

//serialport
var SerialPort = require('serialport');
var portName = 'com3';
var Readline = SerialPort.parsers.Readline;
var myPort = new SerialPort(portName,{
	baudRate: 115200,
    dataBits: 8,
    parity: 'none',
    stopBits: 1,
    flowControl: false
}, function(err) {
  if (err){
    console.log('error: ', err.message);
    port.close();
}});
var parser = new Readline({delimiter: '\r\n'});

myPort.pipe(parser);
parser.on('data', function(data){
	console.log('data received: ', data);
    io.sockets.emit('new message', data);;
});

io.sockets.on('connection', function(){
    
});
