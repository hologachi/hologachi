import React, { Component } from 'react';
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

// 소켓 연결 확인
socket.on('connect', () => {
    console.log(`You connected with id: ${socket.id}`)
})

class ChatList extends Component {

    state = {
        userId: window.sessionStorage.getItem('userId'),
        nickname: window.sessionStorage.getItem('nickname'),
        chatrooms: null,
        focus_chatroom: 0,
        chatMessageList: [],
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

            console.log(this.state.chatrooms);
            
            if (this.state.chatrooms != null) {
                this.setState(
                    { chatMessageList: this.state.chatrooms.map(
                    (chatroom) => <ChatMessage ref={(cd) => this.child = cd} onSendMessage={this.handleSendMessage} /> )}
                );
                
            }
        })

        
    }

    componentDidUpdate() {
        if(socket != null) {
            socket.on("receive-message", (chatroomId, message, sendAt) => {
                // const chatList = document.querySelector("chatMessageTop")
                console.log("receive", chatroomId, message)
                // const param = {
                //     m: message, 
                //     s: sendAt
                // }
                // this.child.receiveMessage(param);
            })
        }
    }

    

    onUsernameSelection = (username) => { // 사용자 이름 설정 및 소켓 연결
        socket.auth = { username };
        socket.connect();
    }

    handleChatroomSelect = (chatroomId) => {
        this.onUsernameSelection(this.state.nickname);

        socket.emit("join-room", chatroomId);
        console.log("You connected room:", chatroomId);

        this.setState({focus_chatroom : chatroomId});
        // console.log(this.state.chatMessageList);
        // console.log(this.state.focus_chatroom);
    }

    handleSendMessage = (param) => {
        console.log("You got message :", param.m);
        socket.emit("send-message", this.state.focus_chatroom, param.m, param.s);
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