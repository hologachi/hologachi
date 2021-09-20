import axios from 'axios';

const CHAT_LIST_URL = "http://localhost:8080/chat";

class ChatRoomService {
    getChatRoomList(userId) {
        return axios.get(CHAT_LIST_URL + "/list/" + userId);
    }

    endDeal(userId, postId, rating) {
        return axios.post(CHAT_LIST_URL + "/endDeal", {userId: userId, postId: postId, rating: rating});
    }
}

export default new ChatRoomService()