const httpServer = require("http").createServer(); // Node.js HTTP 서버 생성
const { Server } = require("socket.io"); // socket.io 서버 생성
const { instrument } = require('@socket.io/admin-ui') //socket 연결상태 확인 (https://admin.socket.io/ 접속)

httpServer.listen(3001); // 채팅서버 포트: 3001

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

io.on("connection", (socket) => {
    console.log('new client(socket) connected: ' + socket.id);

    // 소켓에 연결되어있는 사용자 출력
    const users = [];
    for (let [id, socket] of io.of("/").sockets) {
        users.push({
            userID: id,
            username: socket.username,
        });
    }
    socket.emit("users", users);

    // 채팅방 조인
    socket.on('join-room', (args) => {
        socket.join(args.chatroomId);
        // console.log("alert: " + socket.id + " 채팅방 " + args.chatroomId + "에 입장");
    });

    // 메세지 전달
    socket.on('new-message', (args) => {
        // console.log("alert: 메세지 전달" + args.chatroomId + "에 " + args.message + "라고 보냄.");
        io.to(args.chatroomId).emit('new-message', args);
    });

    // socket.on('disconnect', () => {
    //     ACTIVE_CHATROOMS.forEach(c => {
    //         let index = c.sockets.indexOf(socket.id);
    //         if (index != (-1)) {
    //             c.sockets.splice(index, 1); 
    //             c.participants--;
    //             io.emit('channel', c);
    //         }
    //     });
    // });

    // socket.on("connect_error", (err) => { // 소켓 커넥션 오류 발생 핸들러
    //     if (err.message === "invalid username") {
            
    //     }
    // });

});
