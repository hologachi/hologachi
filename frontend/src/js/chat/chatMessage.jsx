import '../../css/chat.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Message from './message';

export default function ChatMessage() {
    return (
        <div className="chatMessage">
            <div className="chatMessageWrapper">
                <div className="chatMessageTop">
                    <Message />
                    <Message own={true}/>
                    <Message /> 
                    <Message /> 
                    <Message /> 
                    <Message /> 
                    <Message /> 
                    <Message /> 
                    <Message /> 
                    <Message /> 
                    <Message /> 
                    <Message /> 
                    <Message /> 
                    <Message /> 
                    <Message /> 
                    <Message /> 
                    <Message /> 
                    <Message /> 
                    <Message /> 
                    <Message /> 
                    <Message /> 
                    <Message /> 
                </div>
                <div className="chatMessageBottom">
                    <textarea className="chatMessageInput" placeholder="메세지 작성..."></textarea>
                    <button className="chatSubmitButton">전송</button>
                </div>
            </div>
        </div>
    )
}
