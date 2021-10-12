import axios from 'axios';

const BRAND_EVENT_URL = "http://localhost:8080/brandEvent";

class BrandEventService {
    getBrandEvent() {
        return axios.get(BRAND_EVENT_URL);
    }
}

export default new BrandEventService()