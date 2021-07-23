import '../../css/chat.css';
import React from 'react';
import Header from "../main/header";
import Footer from "../main/footer";
import ChatMenu from "./chatMenu";
import ChatBox from "./chatBox";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Chat() {
    return (
        <div className="chat">
            <Header />

            <div className="chatList">
                <ChatMenu />
                <ChatBox />
            </div>
            
            <Footer />
        </div>
    )
}
