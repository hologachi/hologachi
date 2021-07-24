import '../../css/room.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from 'react'
import ChatRoomService from '../services/ChatRoomService'

class Room extends Component {
    constructor(props) {
        super(props)

        this.state = {
                chatrooms: []
        }
    }

    componentDidMount(){
        ChatRoomService.getChatRoomList().then((res) => {
            this.setState({ chatrooms: res.data});
            console.log('연결');
            console.log(res.data);
        });
    }

    render() {
        return (
            <div className="roomList">
                {this.state.chatrooms.map(
                    chatroom => 
                    <div className="room">
                        <img className="roomImg" src="https://placeimg.com/50/50/any" alt="" />
                        <span className="roomName">{chatroom.room_name}</span>
                        <span className="roomLastChat">{chatroom.lastchat}</span>
                    </div>
                )}
            </div>
        )
    }
}

export default Room
