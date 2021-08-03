const { instrument } = require('@socket.io/admin-ui')
const io  = require('socket.io')(3000, {
    cors: {
        origin: ["http://localhost:8080", "https://admin.socket.io"],
    },
})

const chatIo = io.of('/chat/list')
chatIo.on("connection", socket => {
    console.log(socket.id)

    socket.on("join-room", () => {

    })

    socket.on("send-message", (chatroom_id, message) => {
        if(chatroom_id === '') {
            socket.broadcast.emit('reveive-message', message)
        } else {
            socket.to(chatroom_id).emit('reveive-message', message)
        }
        
        console.log(message)
    })

    socket.on("", () => {
        
    })
})

instrument(io, { auth: false })

// var app = require('express')();
// var http = require('http').createServer(app);
// const PORT = 3001;
// var io = require('socket.io')(http);

// var ACTIVE_CHATROOMS = [];

// app.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     next();
// })


// http.listen(PORT, () => {
//     console.log(`listening on *:${PORT}`);
// });

// io.on('connection', (socket) => { 
//     console.log('new client(socket) connected');
    
//     socket.on('join', function (chatroom_id) {
//         socket.join(this.chatroom_id, () => {
//             console.log("채팅방 " + this.chatroom_id + "에 입장");
//         });
//     });

//     socket.on('send', messageobject=>{
//         console.log(messageobject.name);
//         console.log(messageobject.body);
//         io.to(messageobject.name).emit("message",messageobject.body);
//     });

//     socket.on('disconnect', () => {
//         ACTIVE_CHATROOMS.forEach(c => {
//             let index = c.sockets.indexOf(socket.id);
//             if (index != (-1)) {
//                 c.sockets.splice(index, 1);
//                 c.participants--;
//                 io.emit('channel', c);
//             }
//         });
//     });

// });
