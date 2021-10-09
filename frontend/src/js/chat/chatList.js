import '../../css/chat.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import ChatRoom from "./chatRoom";
import ChatMessage from "./chatMessage";

//chat
import ChatRoomService from '../services/ChatRoomService';

const ChatList = () => {

    const [userId, setUserId] = useState(window.sessionStorage.getItem('userId'));
    const [chatrooms, setChatrooms] = useState(null);
    const [focus_chatroom, setFocus_chatroom] = useState(null);

    useEffect(() => {
        if(chatrooms === null) {
            loadChatrooms();
        }
    }, [chatrooms]);

    function loadChatrooms() {
        ChatRoomService.getChatRoomList(userId).then((res) => { // 참여하고 있는 채팅방 id 목록 가져오기 
            const promise = new Promise(() => setChatrooms(res.data));
            // console.log(res.data);
        })
    }

    function handleChatroomSelect(chatroomId) {
        window.open("/chat/" + chatroomId, '_blank', "width=400,height=600,left=200,top=200"); // 채팅방 창 열기
        // console.log(chatroomId);
    }

    function onClickEndDeal(postId, rating) { // 거래 종료
        ChatRoomService.endDeal(userId, postId, rating).then((res) => {
            console.log(userId, postId, rating);
        })
    }

    return (
        <div className="chat">
            <div className="chatList">

                <ChatRoom chatrooms={chatrooms} onSelectChatroom={handleChatroomSelect} onClickEndDeal={onClickEndDeal} chatrooms={chatrooms}/>
                
            </div>
        </div>
    )
}

export default ChatList;