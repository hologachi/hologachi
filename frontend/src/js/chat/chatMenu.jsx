import '../../css/chat.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Conversation from "./conversations/conversation";

export default function ChatMenu() {
    return (
        <div className="chatMenu">
            <div className="chatMenuWrapper">
                <input placeholder="참여한 공동구매 채팅 검색" className="chatMenuInput" />
                <Conversation />
                <Conversation />
                <Conversation />
                <Conversation />
                <Conversation />
            </div>
        </div>
    )
}
