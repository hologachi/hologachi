import axios from 'axios';

const MUSER_SEARCH_URL = "http://localhost:8080/admin/mUser";

class AdminService {

    getAllUsers() {
        return axios.get(MUSER_SEARCH_URL);
    }

    searchTheUsers() {
        return axios.post(MUSER_SEARCH_URL);
    }
}

export default new AdminService()