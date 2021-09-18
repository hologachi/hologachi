import axios from 'axios';

const CHATROOM_LIST_URL = "http://localhost:8080/chat/list";

class ChatRoomService {
    getChatRoomList(userId) {
        return axios.get(CHATROOM_LIST_URL + "/" + userId);
    }
}

export default new ChatRoomService()