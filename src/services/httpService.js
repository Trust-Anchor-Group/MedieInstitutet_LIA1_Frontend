import axios from 'axios';

class httpService {
    constructor(){
        this.apiUrl = 'http://localhost:5001/api/v1/auth';
    }

    async registerUser(userData){
        try{
            const response = await axios.post(`${this.apiUrl}/register`, userData);
            return response.data;
        } catch(error) {
            throw error;
        }
    }
}

export default new httpService();