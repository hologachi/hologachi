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
const SERVER = "http://127.0.0.1:8088";


class ChatList extends Component {

    // chat
    state = {
        chatrooms: null,
        socket: null,
        chatroom: null
    }
    
    socket;
    
    componentDidMount() {
        this.loadChatrooms();
        this.configureSocket();
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
            if (this.state.chatroom) {
                this.handleChannelSelect(this.state.chatroom.chatroom_id);
            }
        });
        socket.on('channel', channel => {
            
            let channels = this.state.chatrooms;
            channels.forEach(c => {
                if (c.id === channel.id) {
                    c.participants = channel.participants;
                }
            });
            this.setState({ channels });
        });
        socket.on('message', message => {
            
            let channels = this.state.chatrooms
            channels.forEach(c => {
                if (c.id === message.channel_id) {
                    if (!c.messages) {
                        c.messages = [message];
                    } else {
                        c.messages.push(message);
                    }
                }
            });
            this.setState({ channels });
        });
        this.socket = socket;
    }

    handleChatroomSelect = chatroom_id => {
        let channel = this.state.chatrooms.find(c => {
            return c.chatroom_id === chatroom_id;
        });
        this.setState({ channel });
        this.socket.emit('channel-join', chatroom_id, ack => {
        });
    }

    handleSendMessage = (chatroom_id, text) => {
        this.socket.emit('send-message', { chatroom_id, text, senderName: this.socket.id, id: Date.now() });
    }

    render() {
        const isChatRoomClicked = this.state.isChatRoomClicked;

        let chatmessage = null;

        if(isChatRoomClicked) {
            chatmessage = <ChatMessage onSendMessage={this.handleSendMessage} channel={this.state.chatroom} />;
        } else {
            chatmessage = <p>채팅방을 눌러보세요.</p>;
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