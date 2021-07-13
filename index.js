const express = require('express');
const app = express();
const http = require('http');
require('dotenv').config()
const PORT = process.env.PORT || 8080;
const cors = require('cors');
const server = http.createServer(app);
const io = require('socket.io')(http);

io.listen(server);

app.use(cors());

io.on('connection', (socket) => {
  console.log('client connected');
  socket.on('hello',(data)=>{
    console.log(data)
  })
  socket.emit('www',{data:'ddddddddddddddddddd'})
});
server.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}`);
});