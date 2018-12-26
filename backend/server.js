const express = require('express');
const app = express();

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
    console.log(socket.id)
    socket.on('SEND_MESSAGE', function(data) {
        console.log(data)
        io.emit('MESSAGE', data)
    });
    
});
