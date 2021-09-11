const httpServer = require("http").createServer(); // Node.js HTTP 서버 생성
const { Server } = require("socket.io"); // socket.io 서버 생성
const { instrument } = require('@socket.io/admin-ui') //socket 연결상태 확인 (https://admin.socket.io/ 접속)

const io = new Server(httpServer, { // Node.js에 socket.io 서버 연결
    cors: {
        origin: ["http://localhost:3000", "https://admin.socket.io"],
        credentials: true
    },
});

instrument(io, {
    auth: false
    // auth: {
    //   type: "basic",
    //   username: "admin",
    //   password: "$2b$10$q.srgwSsIfgaoDz9gYkmeulGAgf1osqoMmY1oUDdZBAM45Dd4Mo.u"
    // },
});
  
httpServer.listen(3001); // 채팅서버 포트: 3001

io.use((socket, next) => {
    const username = socket.handshake.auth.username;
    if (!username) {
      return next(new Error("invalid username"));
    }
    socket.username = username;
    next();
});

io.on("connection", (socket) => {
    const users = [];
    for (let [id, socket] of io.of("/").sockets) {
        users.push({
            userID: id,
            username: socket.username,
        });
    }
    socket.emit("users", users);
        // ...
});

io.use((socket, next) => {
    const username = socket.handshake.auth.username;
    if (!username) {
        return next(new Error("invalid username"));
    }
    socket.username = username;
    next();
});

socket.on("connect_error", (err) => { // 소켓 커넥션 오류 발생 핸들러
    if (err.message === "invalid username") {
        
    }
});


const chatIo = io.of('/chat/list')
chatIo.on("connection", socket => {
    console.log(socket.id)

    socket.on("join-room", (chatroom_id) => {
        socket.join(chatroom_id)
    })

    socket.on("send-message", (chatroom_id, message, sendAt) => {
        console.log("send ", message, sendAt)

        socket.to(chatroom_id).emit("receive-message", chatroom_id, message, sendAt)
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
