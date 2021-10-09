import '../../css/chat.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect, useRef } from 'react';
import Message from './message';

import { io } from "socket.io-client";

const URL = "http://localhost:3001";

const ChatMessage = () => {

    const [chatroomId, setChatroomId] = useState(window.location.pathname.slice(6));
    const [messages, setMessages] = useState(null);
    const userId = sessionStorage.getItem("userId");

    const socket = useRef();

    useEffect(() => {
        function updateChatMessage() {

            let temp = localStorage.getItem(chatroomId);
            
            if(temp !== null) {
                setMessages(JSON.parse(temp));
            } else {
                setMessages([]);
            }
            // console.log(temp);
            // console.log("메세지 로드" + messages);
    
        }
        if (messages === null) {
            updateChatMessage();
        }
    }, [messages]);

    useEffect(() => {
        socket.current = io(URL, { autoConnect: false });
    
        function onUsernameSelection(username) { // 사용자 이름 설정 및 소켓 연결
            socket.current.auth = { username };
            socket.current.connect();
        }

        if(socket.current.connected === false) {
            console.log("socket.connected", socket.connected);
            onUsernameSelection(sessionStorage.getItem("nickname")); // 소켓 연결
            socket.current.emit('join-room', { chatroomId: chatroomId }); // 채팅방 참가
        }

        socket.current.on('new-message', (newMessage) => { // 새로운 메세지 수신

            console.log("receive", newMessage);
            
            if(localStorage.getItem(newMessage.chatroomId) === null) { // 1. 채팅방 첫 메세지인 경우
        
                let newChat = new Array();
                newChat.push(newMessage);
                // console.log("이전 기록이 없는 경우: " + newChat);
        
                localStorage.setItem(newMessage.chatroomId, JSON.stringify(newChat));
        
            } else { // 2. 첫 메세지가 아닌 경우
        
                let updateChats = JSON.parse(localStorage.getItem(newMessage.chatroomId));
                updateChats.push(newMessage);
                // console.log("이전 기록이 있는 경우: " + updateChats);
        
                localStorage.setItem(newMessage.chatroomId, JSON.stringify(updateChats));
            }
            // 메세지 화면 업데이트
            // updateChatMessage();
            setMessages(messages => [ ...messages, newMessage ]);
            
        });

        socket.current.onAny((event, ...args) => { // 소켓 관련 이벤트 발생 시 로그 출력
            console.log(event, args);
        });

        // return () => {
        //     socket.off("connect_error"); // 소켓 연결 끊기
        //     console.log("소켓 연결 끊기");
        // };

    }, [socket]);

    
    function onClickSend() { // 메세지 전송
    
        let message = document.getElementById("messageInput").value;

        if(message !== '') { // 빈 메세지가 아니라면 전송
            const param = { // 메세지 데이터
                message: message, 
                date: Date.now(),
                sender: sessionStorage.getItem('nickname'), 
                senderId: sessionStorage.getItem('userId'),
                img: sessionStorage.getItem('image')
            }

            console.log("You send message :", param);
            socket.current.emit('new-message', 
                { chatroomId: chatroomId, message: param.message, date: param.date, sender: param.sender, senderId: param.senderId, img:param.img });
    
            document.getElementById("messageInput").value = null; // 메세지 창 clear
        }
        
    }

    return (
        <div className="chat">
        <div className="chatList">
        <div className="chatMessage">
            <div className="chatMessageWrapper">
            <div className="chatMessageTop">
                { messages && messages.length > -1 ? 
                    (messages.map((m, i) => <div><Message key={i} sendAt={m.date} message={m.message} sender={m.sender} userId={userId} img={m.img} senderId={m.senderId}/></div>))
                    : (<p>이전에 나눈 메세지가 없습니다.</p>)
                }
            </div>
            <div className="chatMessageBottom">
                <textarea className="chatMessageInput" id="messageInput" placeholder="메세지 작성..." onKeyPress={e => e.key === 'Enter' ? onClickSend(e) : null}></textarea>
                <button className="chatSubmitButton" onClick={onClickSend}>전송</button>
            </div>
            </div>
        </div>
        </div>
        </div>
    )
}

export default ChatMessage;

