import '../../css/chat.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import ChatRoom from "./chatRoom";
import ChatMessage from "./chatMessage";
//chat
import ChatRoomService from '../services/ChatRoomService';

import { io } from "socket.io-client";

const URL = "http://localhost:3001";
const socket = io(URL, { autoConnect: false });

socket.onAny((event, ...args) => { // 소켓 관련 이벤트 발생 시 로그 출력
    console.log(event, args);
});

// socket.on("connect_error", (err) => { // 소켓 커넥션 오류 발생 핸들러
//     if (err.message === "invalid username") {
        
//     }
// });

const ChatList = () => {

    const [userId, setUserId] = useState(window.sessionStorage.getItem('userId'));
    const [nickname, setNickname] = useState(window.sessionStorage.getItem('nickname'));
    const [chatrooms, setChatrooms] = useState(null);
    const [focus_chatroom, setFocus_chatroom] = useState(null);
    const [chatMessageList, setChatMessageList] = useState([]);

    const [messages, setMessages] = useState(JSON.parse(localStorage.getItem(focus_chatroom)));

    useEffect(() => {
        if(chatrooms == null) {
            loadChatrooms();
        }
        
        socket.on('new-message', (newMessage) => { // 새로운 메세지 수신

            console.log("receive", newMessage);
            
            if(localStorage.getItem(newMessage.chatroomId) === null) { // 채팅방 첫 메세지인 경우
        
                let newChat = new Array();
                newChat.push(newMessage);
                // console.log("이전 기록이 없는 경우: " + newChat);
        
                localStorage.setItem(newMessage.chatroomId, JSON.stringify(newChat));
        
            } else { // 첫 메세지가 아닌 경우
        
                let updateChats = JSON.parse(localStorage.getItem(newMessage.chatroomId));
                updateChats.push(newMessage);
                // console.log("이전 기록이 있는 경우: " + updateChats);
        
                localStorage.setItem(newMessage.chatroomId, JSON.stringify(updateChats));
            }
            // 메세지 화면 업데이트
            // updateChatMessage();
            setMessages(messages => [ ...messages, newMessage ]);
            
        });

        return () => {
            socket.off("connect_error"); // 소켓 연결 끊기
            console.log("소켓 연결 끊기");
        };

    }, []);

    function loadChatrooms() {
        ChatRoomService.getChatRoomList(userId).then((res) => { // 참여하고 있는 채팅방 id 목록 가져오기 
            setChatrooms(res.data);
            console.log(res.data)
        })
    }

    function handleChatroomSelect(chatroomId) {

        setFocus_chatroom(chatroomId); // 선택한 채팅방 열기
        window.open("/chat/" + chatroomId, '_blank', "width=400,height=600,left=200,top=200"); // 채팅방 창 열기

        updateChatMessage(chatroomId);

        if(!socket.connected) {
            onUsernameSelection(nickname); // 소켓 연결
        }

        socket.emit('join-room', { chatroomId: chatroomId }); // 채팅방 참가

    }

    function updateChatMessage(chatroomId) {

        let temp = localStorage.getItem(chatroomId);
        console.log(focus_chatroom);
        if(temp !== null) {
            setMessages(JSON.parse(temp));
        } else {
            setMessages([]);
        }
        // console.log(temp);
        // console.log("메세지 로드" + messages);

    }

    function onUsernameSelection(username) { // 사용자 이름 설정 및 소켓 연결
        socket.auth = { username };
        socket.connect();
    }

    function onClickSend() { // 메세지 전송

        const param = { // 메세지 데이터
            message: document.getElementById("messageInput").value, 
            date: Date.now(),
            sender: sessionStorage.getItem('nickname')
        }

        if(param.message !== '') { // 빈 메세지가 아니라면 전송 
            console.log("You send message :", param);
            socket.emit('new-message', 
                { chatroomId: focus_chatroom, message: param.message, date: param.date, sender: param.sender });
    
            document.getElementById("messageInput").value = ''; // 메세지 창 clear
        }
        
    }

    function onClickEndDeal(postId, rating) { // 거래 종료
        ChatRoomService.endDeal(userId, postId, rating).then((res) => {
            console.log(userId, postId, rating);
        })
    }

    return (
        <div className="chat">
            <div className="chatList">

                <ChatRoom chatrooms={chatrooms} onSelectChatroom={handleChatroomSelect} onClickEndDeal={onClickEndDeal}/>
                
            </div>
        </div>
    )
}

export default ChatList;