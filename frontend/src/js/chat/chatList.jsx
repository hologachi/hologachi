import React, { Component } from 'react';
import Header from "../main/header";
import Footer from "../main/footer";
import ChatRoom from "./chatRoom";
import ChatMessage from "./chatMessage";
import '../../css/chat.css';
import 'bootstrap/dist/css/bootstrap.min.css';
//chat
import ChatRoomService from '../services/ChatRoomService';
import { io } from "socket.io-client";
const socket = io("http://localhost:3001/chat/list");
// 소켓 연결 확인
socket.on('connect', () => {
    console.log(`You connected with id: ${socket.id}`)
})

class ChatList extends Component {

    constructor(props) {
        super();

        this.state = {
            chatrooms: null,
            focus_chatroom: 0,
            chatMessageList: [],
        }
        
    }
    
    
    componentDidMount() {
        this.loadChatrooms();
    }

    loadChatrooms = () => {
        // 참여하고 있는 채팅방 id 목록 가져오기 
        ChatRoomService.getChatRoomList().then((res) => {
            this.setState(
                { chatrooms: res.data }
            );

            console.log(this.state.chatrooms);
            if (this.state.chatrooms != null) {
                this.setState(
                    { chatMessageList: this.state.chatrooms.map(
                    (chatroom) => <ChatMessage ref={(cd) => this.child = cd} onSendMessage={this.handleSendMessage} chatroom={chatroom} /> )}
                );
                
            }
        })

        
    }

    componentDidUpdate() {
        if(socket != null) {
            socket.on("receive-message", (chatroom_id, message, sendAt) => {
                const chatList = document.querySelector("chatMessageTop")
                console.log("receive", chatroom_id, message)
                const param = {
                    m: message, 
                    s: sendAt
                }
                // this.child.receiveMessage(param);
            })
        }
    }


    handleChatroomSelect = (chatroom_id) => {
        socket.emit("join-room", chatroom_id);
        console.log("You connected room:", chatroom_id);

        this.setState({focus_chatroom : chatroom_id});
        // console.log(this.state.chatMessageList);
        // console.log(this.state.focus_chatroom);
    }

    handleSendMessage = (param) => {
        console.log("You got message :", param.m);
        socket.emit("send-message", this.state.focus_chatroom, param.m, param.s);
    }


    render() {
        

        return (
            <div className="chat">
                <Header />
                
                <div className="chatList">
                    <ChatRoom chatrooms={this.state.chatrooms} onSelectChatroom={this.handleChatroomSelect} />
                    
                    {this.state.chatMessageList[this.state.focus_chatroom-1]}
                    {/* <ChatMessage ref={(cd) => this.child = cd} onSendMessage={this.handleSendMessage} chatroom={this.state.focus_chatroom} /> */}
                </div>
                
                <Footer />
            </div>
        )
    }
}

export default ChatList