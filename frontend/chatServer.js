var app = require('express')();
var http = require('http').createServer(app);
const PORT = 3001;
var io = require('socket.io')(http);

var ACTIVE_CHATROOMS = [];

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
})


http.listen(PORT, () => {
    console.log(`listening on *:${PORT}`);
});

io.on('connection', (socket) => { 
    console.log('new client(socket) connected');
    
    socket.on('join', function (chatroom_id) {
        socket.join(this.chatroom_id, () => {
            console.log("채팅방 " + this.chatroom_id + "에 입장");
        });
    });

    socket.on('send', messageobject=>{
        console.log(messageobject.name);
        console.log(messageobject.body);
        io.to(messageobject.name).emit("message",messageobject.body);
    });

    socket.on('disconnect', () => {
        ACTIVE_CHATROOMS.forEach(c => {
            let index = c.sockets.indexOf(socket.id);
            if (index != (-1)) {
                c.sockets.splice(index, 1);
                c.participants--;
                io.emit('channel', c);
            }
        });
    });

});
