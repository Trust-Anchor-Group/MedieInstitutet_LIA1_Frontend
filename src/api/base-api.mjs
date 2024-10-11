import HttpClient from "../services/HttpClient.mjs";
import config from "../config/config.mjs";

const HTTP = new HttpClient(config.baseApi.url);

export const verifyAccount = async (payload, headers = {}) => {

    try {
        const response = await HTTP.postRequest('/auth/verify-email', payload, headers);
        return await response.json();
    } catch (error) {
        console.error('Error verifying account:', error);
        throw error;
    }

}