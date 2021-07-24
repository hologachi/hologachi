import '../../css/chat.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Room from "./room";

export default function ChatRoom() {
    return (
        <div className="chatRoom">
            <div className="chatRoomWrapper">
                <input placeholder="참여한 공동구매 채팅 검색" className="chatRoomInput" />
                <Room />
            </div>
        </div>
    )
}
