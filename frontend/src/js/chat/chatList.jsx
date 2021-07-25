import '../../css/chat.css';
import React, { Component } from 'react';
import Header from "../main/header";
import Footer from "../main/footer";
import ChatRoom from "./chatRoom";
import ChatMessage from "./chatMessage";
import ChatMessageCover from "./chatMessageCover";
import 'bootstrap/dist/css/bootstrap.min.css';

class ChatList extends Component {
    constructor(props) {
        super(props);
        this.state = {isChatRoomClicked: false};
        this.handleChatRoomClicked = this.handleChatRoomClicked.bind(this);
    }

    handleChatRoomClicked = () => {
        this.setState({isChatRoomClicked: true});
    }

    render() {
        const isChatRoomClicked = this.state.isChatRoomClicked;

        let chatmessage = null;

        if(isChatRoomClicked) {
            chatmessage = <ChatMessage />;
        } else {
            chatmessage = <ChatMessageCover />
        }

        return (
            <div className="chat">
                <Header />
                
                <div className="chatList">
                    <ChatRoom parentsFunc={this.handleChatRoomClicked}/>
                    {chatmessage}
                </div>
                <Footer />
            </div>
        )
    }
}

export default ChatList