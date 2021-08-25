import '../../css/chat.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from 'react';
import Room from "./room";

class ChatRoom extends Component {

    handleClick = (chatroom_id) => {
        this.props.onSelectChatroom(chatroom_id);
    }

    render() {
        let list = <div className="no-content-message">참여하고 있는 공동구매가 없습니다.</div>;
        if (this.props.chatrooms) {
            list = this.props.chatrooms.map(chatroom => <Room chatroom_id={chatroom.chatroom_id} room_name={chatroom.room_name} lastchat={chatroom.lastchat} onClick={this.handleClick}/>);
        }

        return (
            <div className="chatRoom">
                <div className="chatRoomWrapper">
                    <input placeholder="참여한 공동구매 채팅 검색" className="chatRoomInput" />
                    <div className="roomList">
                        {list}
                    </div>
                </div>
            </div>
        )
    }
}

export default ChatRoom
