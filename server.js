const express = require('express');
const app = express();


const http = require('http').createServer(app);
var io = require('socket.io')(http);

const PORT = process.env.PORT || 3100


app.use(express.static(__dirname + '/'));

app.get('/' , (req,res)=>{
    res.sendFile(__dirname + '/frontend/src/index.html')
})


http.listen(PORT , ()=>{
    console.log(`Listing on PORT ${PORT}`)
})

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('message' ,(msg)=>{
        socket.broadcast.emit('message' , msg) ;
    })
});

