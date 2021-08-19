import axios from 'axios';

const MUSER_SEARCH_URL = "http://localhost:8080/admin/mUser";
const MGB_SEARCH_URL = "http://localhost:8080/admin/mGB";
const MGBPOST_SEARCH_URL = "http://localhost:8080/admin/mGBPost";
const MGBCATEGORY_SEARCH_URL = "http://localhost:8080/admin/mGBCategory";

class AdminService {

    getAllUsers() { // 모든 회원 조회
        return axios.get(MUSER_SEARCH_URL);
    }

    searchTheUsers() { // 회원 검색 
        return axios.post(MUSER_SEARCH_URL);
    }

    getAllGBPosts() { // 모든 공동구매 글 조회
        return axios.get(MGBPOST_SEARCH_URL);
    }

    getAllGBs() { // 모든 공동구매 조회
        return axios.get(MGB_SEARCH_URL);
    }

    getAllCategories() { // 모든 카테고리 조회
        return axios.get(MGBCATEGORY_SEARCH_URL);
    }
}

export default new AdminService()