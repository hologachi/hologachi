import '../../css/chat.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Message from './messages/message';

export default function ChatBox() {
    return (
        <div className="chatBox">
            <div className="chatBoxWrapper">
                <div className="chatBoxTop">
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
                <div className="chatBoxBottom">
                    <textarea className="chatMessageInput" placeholder="메세지 작성..."></textarea>
                    <button className="chatSubmitButton">전송</button>
                </div>
            </div>
        </div>
    )
}
