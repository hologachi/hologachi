import '../../css/chat.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from 'react';
import Message from './message';

class ChatMessage extends Component {

    state = {
        messages : []
    }

    onClickSend = () => {
        const message = document.getElementById("messageInput").value
        console.log("가져온 메세지", message)
        this.props.onSendMessage(message)

        document.getElementById("messageInput").value = ''
    }

    receiveMessage = (input) => {
        import('./message').then(({message})=>{
            const {messages} = this.state;
            const position = messages.length +1;
            const newMessage = <Message key={position} sendAt={input.s} message={input.m} />
            this.setState({messages:[...messages,newMessage]})
        })
    }
    

    render() {
        // let cover = <div className="chatMessageCover">채팅방을 눌러보세요.</div>;

        // let message = <div className="no-content-message">대화를 시작해보세요</div>;
        // if (this.props.chatrooms) {
        //     message = this.props.chatrooms.map(chatroom => <Room chatroom_id={chatroom.chatroom_id} room_name={chatroom.room_name} lastchat={chatroom.lastchat} onClick={this.handleClick}/>);
        // }
        const {messages} = this.state;

        return (
            <div className="chatMessage">
                <div className="chatMessageWrapper">
                    <div className="chatMessageTop">
                        {messages}
                        {/* <Message sendAt={this.props.sendAt} message={this.props.message}/>
                        <Message own={true} sendAt={this.props.sendAt} message={this.props.message}/> */}
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

