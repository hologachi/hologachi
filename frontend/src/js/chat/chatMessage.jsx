import '../../css/chat.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from 'react';
import Message from './message';

class ChatMessage extends Component {

    checkMessageOwn = (sender) => {
        if(sessionStorage.getItem('nickname') === sender) {
            return true;
        } else { 
            return false; 
        }
    }

    render() {

        return (
            <div className="chatMessageTop">
                {this.props.messages.map((message, i) => <div key={i}><Message own={this.checkMessageOwn(message.sender)} sendAt={message.date} message={message.message} sender={message.sender} /></div>)}
            </div>
        )
    }
}

export default ChatMessage

