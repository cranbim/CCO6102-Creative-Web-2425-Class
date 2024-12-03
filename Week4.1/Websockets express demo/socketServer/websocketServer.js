//setup express for static web servinf
const express=require('express')
const app=express()
const path=require('path')
const PORT=3000

app.listen(PORT, ()=>{
  console.log('listening on port for HTTP',PORT)
})

app.use(express.static('public'))

require('dotenv').config()
console.log(process.env.NONEOFYOURBUSINESS)

//setup websocket listener
const WebSocket = require('ws')
const wss = new WebSocket.Server({ port: 8011 },()=>{
  console.log('listening on port for WS',8011)
})

//when an incoming connection is received
wss.on('connection', ws => {
  console.log((new Date()) + "connection opened");
  ws.send(JSON.stringify('Server says Hi!'));

  //wehn a message is received over websockets...
  ws.on('message', message => {
    console.log(`Received message`);
    let msg=JSON.parse(message);
    console.log(msg);
    let msgJ=JSON.stringify(msg);
    wss.clients.forEach(function each(client) {
      // if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(msgJ);
      // }
    });
  })

  
  ws.on('close', function(reasonCode, description) {
    console.log((new Date()) + 'Client  disconnected.');
  });
})

