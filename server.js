const express = require('express');
const http = require('http');
const {Server} =require('socket.io');
const SerialPort = require('serialport');
const Readline = require('@serialport/parser-readline');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const port = new SerialPort('COM3', {baudRate: 115200});
const parser = port.pipe(new Readline({delimiter: '\n'}));

app.use(express.static('public'));

parser.on('data', data => {
    console.log('Dato recibido:', data);
    io.emit('serial-data', data);
});