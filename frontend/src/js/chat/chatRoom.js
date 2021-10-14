import '../../css/chat.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import Room from "./room";

const ChatRoom  = (props) => {
    
    const [list, setList] = useState([]);
    const [search, setSearch] = useState(null);
    
    function searchKeyword(event) {
        let keyword = event.target.value;
        setSearch(keyword);
    }
    
    useEffect (() => {
        if (props.chatrooms && props.chatrooms.length > -1) {
            setList(props.chatrooms.filter((data) => {
                if(search == null) {
                    return data;
                } else if(data.roomName.includes(search.toLowerCase())){
                    return data;
                }
            }).map((chatroom, i) => { 
                return(<Room key={i} chatroomId={chatroom.chatroomId} roomName={chatroom.roomName} createAt={chatroom.createAt}
                    users={chatroom.users} postId={chatroom.postId} onClick={handleClick} endDeal={handleEndDeal}/>)
                })
            );
        } else {
            setList(<div className="no-content-message">참여하고 있는 공동구매가 없습니다.</div>);
        }
        
    }, [props.chatrooms, search]);

    function handleClick(chatroomId) {
        props.onSelectChatroom(chatroomId);
    }

    function handleEndDeal(postId, rating){
        props.onClickEndDeal(postId, rating);
    }
    
    return (
        <div className="chatRoom">
            <div className="chatRoomWrapper">

                <input placeholder="참여한 공동구매 채팅 검색" className="chatRoomInput" onChange={(e) => searchKeyword(e)} />
                
                <div className="roomList">
                    {list}
                </div>

            </div>
        </div>
    );
}

export default ChatRoom;
