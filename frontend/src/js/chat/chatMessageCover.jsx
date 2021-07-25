import '../../css/chat.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from 'react';

class ChatMessageCover extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="chatMessageCover">
                <p>채팅방을 눌러보세요</p>
            </div>
        )
    }
}

export default ChatMessageCover

