import axios from 'axios';

const CHAT_LIST_URL = "https://localhost:8080";

class ChatService {
    getChatList() {
        return axios.get(CHAT_LIST_URL);
    }
}

export default new ChatService()