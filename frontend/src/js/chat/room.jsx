import '../../css/room.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from 'react';

class Room extends Component {

    click = () => {
        this.props.onClick(this.props.chatroom_id);

        console.log("채팅방 " + this.props.chatroom_id + "을 눌렀습니다.");
    }

    render() {
        return (
            <div className="room" key={this.props.chatroom_id} onClick={this.click}>
                <img className="roomImg" src="https://placeimg.com/50/50/any" alt="" />
                <span className="roomName">{this.props.room_name}</span>
                <span className="roomLastChat">{this.props.lastchat}</span>
            </div>
        )
    }
}

export default Room
