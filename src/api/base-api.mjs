import HttpClient from "../services/HttpClient.mjs";
import config from "../config/config.mjs";

const HTTP = new HttpClient(config.baseApi.url);

/**
 * @desc
 * @param {Object} payload 
 * @param {Object} headers 
 * @returns 
 */
export const verifyAccount = async (payload, headers = {}) => {

    try {
        const data = await HTTP.postRequest('/auth/verify-email', payload, headers);
        return data;
    } catch (error) {
        console.error('Error verifying account:', error);
        throw error;
    }

}

/**
 * @desc
 * @param {Object} payload 
 * @param {Object} headers 
 * @returns 
 */
export const registerAccount = async (payload, headers = {}) => {

    try {
        const data = await HTTP.postRequest('/auth/register', payload, headers);
        return data;
    } catch (error) {
        console.error('Error registring account:', error);
        throw error;
    }

}

/**
 * @desc
 * @param {Object} payload 
 * @param {Object} headers 
 * @returns 
 */
export const login = async (payload, headers = {}) => {
    try {
        const data = await HTTP.postRequest('/auth/login', payload, headers);
        return data;
    } catch (error) {
        console.error('Error login in:', error);
        throw error;
    }
}

export const apiLogout = async () => {
    try {
        const data = await HTTP.getRequest('/auth/logout');
        return data;
    } catch (error) {
        console.error('Error login out:', error);
        throw error;
    }
};

/**
 * @desc
 * @param {Object} headers 
 * @returns 
 */
export const accountInfo = async (headers = {}) => {
    try {
        const data = await HTTP.getRequest('/auth/account-info', headers);
        return data;
    } catch (error) {
        console.error('Error getting account info:', error);
        throw error;
    }
}

/**
 * @desc
 * @param {Object} headers 
 * @returns 
 */
export const sessionStatus = async (headers = {}) => {
    try {
        const data = await HTTP.getRequest('/auth/session-status', headers);
        console.log('request sessionStatus:', data);
        return data;
    } catch (error) {
        throw error;
    }
};