import '../../css/login.css';
import React, { Component } from 'react';
import Header from "../main/header";
import Footer from "../main/footer";
import 'bootstrap/dist/css/bootstrap.min.css';

class login extends Component {

    render() {
        let chatmessage = null;

        if(this.state.focus_chatroom) {
            chatmessage = <ChatMessage onSendMessage={this.handleSendMessage} channel={this.state.focus_chatroom} />;
        } else {
            chatmessage =  <div className="chatMessageCover">채팅방을 눌러보세요.</div>;
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

export default login