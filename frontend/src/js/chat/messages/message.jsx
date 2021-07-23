import '../../../css/message.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Message({own}) {
    return (
        <div className={own ? "message own" : "message"}>
            <div className="message">
                <div className="messageTop">
                    <img className="messageImg" src="https://placeimg.com/50/50/any" alt="" />
                    <p className="messageText">메세지</p>
                </div>
                <div className="messageBottom">1시간 전</div>
            </div>
        </div>
    )
}
