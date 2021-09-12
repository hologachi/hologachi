import '../../css/chat.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from 'react';
import Room from './chatRoom';
import Message from './message';

class ChatMessage extends Component {

    state = {
        messages : [],
        localData : []
    }

    updateChatMessage = () => {

        let temp = localStorage.getItem(this.props.chatroomId);
        if(temp !== null) {
            temp = JSON.parse(temp);
            this.setState({
                localData: temp
            });
            console.log("가져온 localData", temp);
            const newMessage = temp.map(data => 
                <Message own={this.checkMessageOwn(data.sender)} sendAt={data.date} message={data.message} />);
            this.setState({messages: newMessage});
        }

    }

    checkMessageOwn = (sender) => {
        if(sessionStorage.getItem('nickname') === sender) {
            return true;
        } else { 
            return false; 
        }
    }

    onClickSend = () => { // 메세지 전송

        const param = { // 메세지 데이터
            message: document.getElementById("messageInput").value, 
            date: Date.now(),
            sender: sessionStorage.getItem('nickname')
        }

        if(param.message !== '') { // 빈 메세지가 아니라면
            this.props.onSendMessage(param); // 메세지 전송
    
            document.getElementById("messageInput").value = ''; // 메세지 창 clear
        }
        
    }

    render() {

        return (
            <div className="chatMessage">
                <div className="chatMessageWrapper">
                    <div className="chatMessageTop">
                        {this.state.messages}
                    </div>
                    <div className="chatMessageBottom">
                        <textarea className="chatMessageInput" id="messageInput" placeholder="메세지 작성..."></textarea>
                        <button className="chatSubmitButton" onClick={this.onClickSend}>전송</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default ChatMessage

