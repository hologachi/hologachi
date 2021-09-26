import '../../css/chat.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import Message from './message';

const ChatMessage = (props) => {

    const [chatroomId, setChatroomId] = useState(window.location.pathname.slice(6));
    const [messages, setMessages] = useState(JSON.parse(localStorage.getItem(chatroomId)));

    useEffect(() => {
        updateChatMessage();
        
    }, []);

    function updateChatMessage() {

        let temp = localStorage.getItem(chatroomId);
        
        if(temp !== null) {
            setMessages(JSON.parse(temp));
        } else {
            setMessages([]);
        }
        // console.log(temp);
        // console.log("메세지 로드" + messages);

    }

    return (
        <div className="chat">
        <div className="chatList">
        <div className="chatMessage">
            <div className="chatMessageWrapper">
            <div className="chatMessageTop">
                {chatroomId}
                { (messages.length == 0) && <p>이전에 나눈 메세지가 없습니다.</p>} 
                { messages && messages.map((m, i) => <div key={i}><Message sendAt={m.date} message={m.message} sender={m.sender} img={m.img} senderId={m.senderId}/></div>)}
            </div>
            <div className="chatMessageBottom">
                <textarea className="chatMessageInput" id="messageInput" placeholder="메세지 작성..." onKeyPress={event => event.key === 'Enter' ? props.onClickSend(event) : null}></textarea>
                <button className="chatSubmitButton" onClick={props.onClickSend}>전송</button>
            </div>
            </div>
        </div>
        </div>
        </div>
    )
}

export default ChatMessage;

