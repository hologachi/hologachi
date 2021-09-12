import React, { Component, useRef } from 'react';
import ChatRoom from "./chatRoom";
import ChatMessage from "./chatMessage";
import '../../css/chat.css';
import 'bootstrap/dist/css/bootstrap.min.css';
//chat
import ChatRoomService from '../services/ChatRoomService';

import { io } from "socket.io-client";

const URL = "http://localhost:3001";
const socket = io(URL, { autoConnect: false });

// 소켓 관련 이벤트 발생 시 로그 출력
socket.onAny((event, ...args) => {
    console.log(event, args);
});
// 새로운 메세지 수신
socket.on('new-message', (newMessage) => { 

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
    
});

// socket.on("connect_error", (err) => { // 소켓 커넥션 오류 발생 핸들러
//     if (err.message === "invalid username") {
        
//     }
// });

class ChatList extends Component {

    constructor(props) {
        super(props);

        this. state = {
            userId: window.sessionStorage.getItem('userId'),
            nickname: window.sessionStorage.getItem('nickname'),
            chatrooms: null,
            focus_chatroom: 0,
            chatMessageList: []
        }
        this.child = React.createRef();
    }

    componentDidMount() { 
        this.loadChatrooms();
    }

    loadChatrooms = () => {
        // 참여하고 있는 채팅방 id 목록 가져오기 
        ChatRoomService.getChatRoomList(this.state.userId).then((res) => {
            this.setState(
                { chatrooms: res.data }
            );
            // console.log(this.state.chatrooms);
            
            if (this.state.chatrooms != null) {
                this.setState(
                    { chatMessageList: this.state.chatrooms.map(
                        (chatroom) => <ChatMessage ref={this.child} chatroomId={chatroom.chatroomId} onSendMessage={this.handleSendMessage} /> )}
                );
                
            }
        })
    }

    handleChatroomSelect = (chatroomId) => {
        this.setState({focus_chatroom : chatroomId}); // 선택한 채팅방 열기

        if(!socket.active) {
            this.onUsernameSelection(this.state.nickname); // 소켓 연결
        }

        socket.emit('join-room', { chatroomId: chatroomId }); // 채팅방 참가
        console.log("You joined room:", chatroomId);

        // this.child.current.updateChatMessage();
    }

    onUsernameSelection = (username) => { // 사용자 이름 설정 및 소켓 연결
        socket.auth = { username };
        socket.connect();
    }

    handleSendMessage = (param) => { // 메세지 전송
        console.log("You send message :", param);
        socket.emit('new-message', 
            { chatroomId: this.state.focus_chatroom, message: param.message, date: param.date, sender: param.sender });
    }

    handleReceiveMessage = (args) => {
        this.child.current.updateChatMessage();
    }

    componentWillUnmount() {
        socket.off("connect_error"); // 소켓 연결 끊기
        console.log("소켓 연결 끊기");
    };

    render() {
        
        return (
            <div className="chat">
                
                <div className="chatList">
                    <ChatRoom chatrooms={this.state.chatrooms} onSelectChatroom={this.handleChatroomSelect} />
                    
                    {this.state.chatMessageList[this.state.focus_chatroom-1]}
                </div>
                
            </div>
        )
    }
}

export default ChatList;