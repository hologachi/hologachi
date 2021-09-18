import '../../css/room.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from 'react';

class Room extends Component {

    click = () => {
        this.props.onClick(this.props.chatroomId);

        console.log("채팅방 " + this.props.chatroomId + "을 눌렀습니다.");
    }

    render() {
        return (
            <div className="room" key={this.props.chatroomId} onClick={this.click}>
                <img className="roomImg" src="https://placeimg.com/50/50/any" alt="" />
                <span className="roomName">{this.props.roomName}</span>
                <span className="roomLastChat">{this.props.lastchat}</span>
            </div>
        )
    }
}

export default Room
