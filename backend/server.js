const express = require('express');
const app = express();
var os = require('os');

app.set('views', __dirname + '/');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
app.get('/',(req,res)=>{
    res.render('index.html');
})
const server = app.listen(8000, function() {
    console.log('server running on port 8000');
});


const io = require('socket.io')(server);

io.on('connection', function(socket) {
    
    function log() {
        var array = ['Message from server:'];
        array.push.apply(array, arguments);
        
        socket.emit('log', array.toString().replace(","," "));
    }

    socket.on('message', function(message) {
        log('Client said: ', message);
        // for a real app, would be room-only (not broadcast)
        socket.broadcast.emit('message', message);
    });

    socket.on('SEND_MESSAGE', function(data) {
        log(data)
        io.emit('MESSAGE', data)
    });

    //invoke communication when use same socket
    socket.on('create or join',(room)=>{
        var clientsInRoom = io.sockets.adapter.rooms[room];
        var numClients = clientsInRoom ? Object.keys(clientsInRoom.sockets).length : 0;
        log('Room ' + room + ' now has ' + numClients + ' client(s)');

        if (numClients === 0) {
            socket.join(room);
            log('Client ID ' + socket.id + ' created room ' + room);
            socket.emit('created', room, socket.id);
      
          } else if (numClients === 1) {
            log('Client ID ' + socket.id + ' joined room ' + room);
            io.sockets.in(room).emit('join', room);
            socket.join(room);
            socket.emit('joined', room, socket.id);
            io.sockets.in(room).emit('ready');
          } else { // max two clients
            socket.emit('full', room);
        }

    })
    socket.on('ipaddr', (room)=>{
        var ifaces = os.networkInterfaces();
        for (var dev in ifaces) {
          //search ethernet
          ifaces[dev].forEach(function(details) {
            if (details.family === 'IPv4' && details.address !== '127.0.0.1') {
              io.sockets.to(room).emit('ipaddr', details.address);
            }
          });
        }
    });
    socket.on('bye',()=>{
        console.log('received bye')
    });
    socket.on('call',(localStream)=>{
        console.log(localStream);
        // Get local media stream tracks.
        // const videoTracks = localStream.getVideoTracks();
        // const audioTracks = localStream.getAudioTracks();
        // if (videoTracks.length > 0) {
        //     trace(`Using video device: ${videoTracks[0].label}.`);
        // }
        // if (audioTracks.length > 0) {
        //     trace(`Using audio device: ${audioTracks[0].label}.`);
        // }
        
        // const servers = null;  // Allows for RTC server configuration.
        
        // // Create peer connections and add behavior.
        // localPeerConnection = new RTCPeerConnection(servers);
        // trace('Created local peer connection object localPeerConnection.');
        
        // localPeerConnection.addEventListener('icecandidate', handleConnection);
        // localPeerConnection.addEventListener(
        //     'iceconnectionstatechange', handleConnectionChange);
        
        // remotePeerConnection = new RTCPeerConnection(servers);
        // trace('Created remote peer connection object remotePeerConnection.');
        
        // remotePeerConnection.addEventListener('icecandidate', handleConnection);
        // remotePeerConnection.addEventListener(
        //     'iceconnectionstatechange', handleConnectionChange);
        // remotePeerConnection.addEventListener('addstream', gotRemoteMediaStream);
        
        // // Add local stream to connection and create offer to connect.
        // localPeerConnection.addStream(localStream);
        // trace('Added local stream to localPeerConnection.');
        
        // trace('localPeerConnection createOffer start.');
        // localPeerConnection.createOffer(offerOptions)
        //     .then(createdOffer).catch(setSessionDescriptionError);
      
    })
    
});
