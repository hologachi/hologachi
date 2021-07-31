import '../../css/chat.css';
import React, { Component } from 'react';
import Header from "../main/header";
import Footer from "../main/footer";
import ChatRoom from "./chatRoom";
import ChatMessage from "./chatMessage";
import 'bootstrap/dist/css/bootstrap.min.css';
//chat
import ChatRoomService from '../services/ChatRoomService';

import socketClient from "socket.io-client";
const SERVER = "http://localhost:3001";
const socket = null;

class ChatList extends Component {

    state = {
        chatrooms: null,
        socket: null,
        focus_chatroom: null,
        new_message: null
    }
    
    componentDidMount() {
        this.loadChatrooms();
        this.configureSocket();
    }

    componentDidUpdate() {
        if(this.state.new_message) {
            socket.on('message', (new_message) => {
                console.log(new_message);
                this.receivemessage(new_message);
            });
        };
    }

    
    loadChatrooms = () => {
        // 참여하고 있는 채팅방 id 목록 가져오기 
        ChatRoomService.getChatRoomList().then((res) => {
            this.setState({ chatrooms: res.data });
        })
    }

    configureSocket = () => {
        var socket = socketClient(SERVER);

        socket.on('connection', () => {
            if (this.state.focus_chatroom) {
                this.handleChannelSelect(this.state.focus_chatroom.chatroom_id);
            }
        });

        this.socket = socket;
    }

    receivemessage = (message) => {
        this.setState({
            new_message:[...this.state.new_message,message]
        })
    }

    handleChatroomSelect = (chatroom_id) => {
        console.log(this.chatroom_id);
        if(chatroom_id) {
            socket.emit('join', this.chatroom_id);
        }
    }

    handleSendMessage = (chatroom_id, text) => {
        this.socket.emit('send', { chatroom_id, text, senderName: this.socket.id, id: Date.now() });
    }


    render() {
        let chatmessage = null;

        if(this.state.focus_chatroom) {
            chatmessage = <ChatMessage onSendMessage={this.handleSendMessage} channel={this.state.focus_chatroom} />;
        } else {
            chatmessage = <div className="chatMessageCover">채팅방을 눌러보세요.</div>;
        }

        return (
            <div className="chat">
                <Header />
                
                <div className="chatList">
                    <ChatRoom chatrooms={this.state.chatrooms} onSelectChatroom={this.handleChatroomSelect} />
                    {chatmessage}
                </div>
                <Footer />
            </div>
        )
    }
}

export default ChatList