const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Route = require('./routes/MyRouter');
const path = require('path');
 

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});



app.set('io', io); // Make `io` globally accessible

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use('/', Route);

app.use('/Events', express.static(path.join(__dirname, 'Events')));
app.use('/Gallery', express.static(path.join(__dirname, 'Gallery')))

mongoose
  .connect('mongodb+srv://vks7633a:42QMW3lvS9Tev70f@cluster0.otls6.mongodb.net/blooddonation')
  .then(() => {
    console.log('Connection established');
  })
  .catch((err) => {
    console.error(err);
  });

app.get('/', (req, res) => {
  res.send('Server still running...');
});

app.get('/', (req, res) => {
  res.send('Welcome to the server!');
});

server.listen(3001, () => {
  console.log('Server is running at port 3001');
});

module.exports = { app, io };
