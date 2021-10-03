import axios from 'axios';

const DONATION_URL = "http://localhost:8080/donation";

class DonationService {
    getMyDonation(userId) {
        return axios.post(DONATION_URL + "/my", {userId: userId});
    }

    applyDonation(userId, data) {
        return axios.post(DONATION_URL + "/apply/" + userId, data);
    }

    getDonationSites() {
        return axios.get(DONATION_URL + "/list");
    }
}

export default new DonationService()