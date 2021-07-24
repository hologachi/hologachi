import '../../css/chat.css';
import React from 'react';
import Header from "../main/header";
import Footer from "../main/footer";
import ChatRoom from "./chatRoom";
import ChatMessage from "./chatMessage";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function ChatList() {
    return (
        <div className="chat">
            <Header />
            
            <div className="chatList">
                <ChatRoom />
                <ChatMessage />
            </div>
            
            <Footer />
        </div>
    )
}
