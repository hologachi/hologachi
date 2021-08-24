import axios from 'axios';

const MUSER_URL = "http://localhost:8080/admin/mUser";
const MGB_URL = "http://localhost:8080/admin/mGB";
const MGBPOST_URL = "http://localhost:8080/admin/mGBPost";
const MGBCATEGORY_URL = "http://localhost:8080/admin/mGBCategory";

class AdminService {

    getAllUsers() { // 모든 회원 조회
        return axios.get(MUSER_URL);
    }

    searchTheUsers() { // 회원 검색 
        return axios.post(MUSER_URL);
    }

    getAllGBPosts() { // 모든 공동구매 글 조회
        return axios.get(MGBPOST_URL);
    }

    getAllGBs() { // 모든 공동구매 조회
        return axios.get(MGB_URL);
    }

    getAllCategories() { // 모든 카테고리 조회
        return axios.get(MGBCATEGORY_URL);
    }

    createCategory(category) { // 카테고리 추가
        console.log(category);
        return axios.post(MGBCATEGORY_URL + '/add', category);
    }

    deleteCategory(id2) { // 카테고리 하나 삭제
        console.log(id2);
        return axios.get(MGBCATEGORY_URL + '/delete/' + id2);
    }
    deleteCategories(id2s) { // 카테고리 여러개 삭제
        return axios.post(MGBCATEGORY_URL + '/delete', id2s);
    }
    
}

export default new AdminService()