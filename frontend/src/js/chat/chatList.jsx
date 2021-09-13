import '../../css/chat.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component, useEffect } from 'react';
import ChatRoom from "./chatRoom";
import ChatMessage from "./chatMessage";
//chat
import ChatRoomService from '../services/ChatRoomService';

import { io } from "socket.io-client";

const URL = "http://localhost:3001";
const socket = io(URL, { autoConnect: false });

socket.onAny((event, ...args) => { // 소켓 관련 이벤트 발생 시 로그 출력
    console.log(event, args);
});

socket.on('new-message', (newMessage) => { // 새로운 메세지 수신

    console.log("receive", newMessage);
    
    if(localStorage.getItem(newMessage.chatroomId) === null) { // 채팅방 첫 메세지인 경우

        let newChat = new Array();
        newChat.push(newMessage);
        console.log("이전 기록이 없는 경우: " + newChat);

        localStorage.setItem(newMessage.chatroomId, JSON.stringify(newChat));

    } else { // 첫 메세지가 아닌 경우

        let updateChats = JSON.parse(localStorage.getItem(newMessage.chatroomId));
        updateChats.push(newMessage);
        console.log("이전 기록이 있는 경우: " + updateChats);

        localStorage.setItem(newMessage.chatroomId, JSON.stringify(updateChats));
    }
    // 메세지 화면 업데이트
    
});

// socket.on("connect_error", (err) => { // 소켓 커넥션 오류 발생 핸들러
//     if (err.message === "invalid username") {
        
//     }
// });

class ChatList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            userId: window.sessionStorage.getItem('userId'),
            nickname: window.sessionStorage.getItem('nickname'),
            chatrooms: null,
            focus_chatroom: null,
            chatMessageList: [],
        }
        const messages = JSON.parse(localStorage.getItem(this.state.focus_chatroom));
        this.updateChatMessage = this.updateChatMessage.bind(this);
    }

    componentDidMount() { 
        this.loadChatrooms();
    }

    componentWillUnmount() {
        socket.off("connect_error"); // 소켓 연결 끊기
        console.log("소켓 연결 끊기");
    };

    loadChatrooms = () => {
        ChatRoomService.getChatRoomList(this.state.userId).then((res) => { // 참여하고 있는 채팅방 id 목록 가져오기 
            this.setState(
                { chatrooms: res.data }
            );
        })
    }

    handleChatroomSelect = (chatroomId) => {

        this.setState({focus_chatroom : chatroomId}); // 선택한 채팅방 열기
        this.updateChatMessage(chatroomId);

        if(!socket.connected) {
            this.onUsernameSelection(this.state.nickname); // 소켓 연결
        }

        socket.emit('join-room', { chatroomId: chatroomId }); // 채팅방 참가

    }

    updateChatMessage = (chatroomId) => {

        let temp = localStorage.getItem(chatroomId);
        console.log(this.state.focus_chatroom);
        if(temp !== null) {
            this.setState(
                { messages: JSON.parse(temp) }
            );
        } else {
            this.setState(
                { messages: [] }
            ); 
        }
        console.log(temp);
        console.log("메세지 로드" + this.state.messages);

    }

    onUsernameSelection = (username) => { // 사용자 이름 설정 및 소켓 연결
        socket.auth = { username };
        socket.connect();
    }

    onClickSend = () => { // 메세지 전송

        const param = { // 메세지 데이터
            message: document.getElementById("messageInput").value, 
            date: Date.now(),
            sender: sessionStorage.getItem('nickname')
        }

        if(param.message !== '') { // 빈 메세지가 아니라면 전송 
            console.log("You send message :", param);
            socket.emit('new-message', 
                { chatroomId: this.state.focus_chatroom, message: param.message, date: param.date, sender: param.sender });
    
            document.getElementById("messageInput").value = ''; // 메세지 창 clear
        }
        
    }

    render() {
        
        return (
            <div className="chat">
                <div className="chatList">

                    <ChatRoom chatrooms={this.state.chatrooms} onSelectChatroom={this.handleChatroomSelect} />
                    
                    <div className="chatMessage">
                    { this.state.focus_chatroom && 
                        <div className="chatMessageWrapper">
                            
                            <ChatMessage messages={this.state.messages} />

                            <div className="chatMessageBottom">
                                <textarea className="chatMessageInput" id="messageInput" placeholder="메세지 작성..."></textarea>
                                <button className="chatSubmitButton" onClick={this.onClickSend}>전송</button>
                            </div>

                        </div>}
                    </div>
                    
                </div>
            </div>
        )
    }
}

export default ChatList;