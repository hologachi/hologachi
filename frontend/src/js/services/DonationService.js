import axios from 'axios';

const DONATION_URL = "http://localhost:8080/donation";

const headers = {
    'Content-Type': 'application/json',
    'Authorization': 'JWT fefege...'
  }
class DonationService {

    getMyDonation(userId) {
        let data = {userId: userId};
        return axios.post(DONATION_URL + "/my", data);
    }

    applyDonation(userId, data) {
        return axios.post(DONATION_URL + "/apply/" + userId, data);
    }

    getDonationSites() {
        return axios.get(DONATION_URL + "/list");
    }
}

export default new DonationService()