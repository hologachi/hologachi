import '../../css/room.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from 'react';

class Room extends Component {

    click = () => {
        this.props.onClick(this.props.chatroom_id);
        
        console.log(this.props.chatroom_id);
    }

    render() {
        return (
            <div className="roomList">
                <div className="room" key="{this.props.chatroom_id}" onClick={this.click}>
                    <img className="roomImg" src="https://placeimg.com/50/50/any" alt="" />
                    <span className="roomName">{this.props.room_name}</span>
                    <span className="roomLastChat">{this.props.lastchat}</span>
                </div>
            </div>
        )
    }
}

export default Room
