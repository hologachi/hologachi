import '../../css/chat.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import Message from './message';

const ChatMessage = (props) => {

    const checkMessageOwn = (sender) => {
        if(sessionStorage.getItem('nickname') === sender) {
            return true;
        } else { 
            return false; 
        }
    }

    return (
        <div className="chatMessageTop">
            { (props.messages.length == 0) && <p>이전에 나눈 메세지가 없습니다.</p>} 
            { props.messages && props.messages.map((message, i) => <div key={i}><Message own={checkMessageOwn(message.sender)} sendAt={message.date} message={message.message} sender={message.sender} /></div>)}
            
        </div>
    )
}

export default ChatMessage;

