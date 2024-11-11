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
        return await HTTP.postRequest('/auth/verify-email', payload, headers);
    } catch (error) {
        throw new Error(error.message || 'Error verifying account');
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
        return await HTTP.postRequest('/auth/register', payload, headers);
    } catch (error) {
        throw new Error(error.message || 'Error registring account');
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
        return await HTTP.postRequest('/auth/login', payload, headers);
    } catch (error) {
        throw new Error(error.message || 'Error signing in');
    }
}

export const apiLogout = async () => {
    try {
        return await HTTP.getRequest('/auth/logout');
    } catch (error) {
        throw new Error(error.message || 'Error signing out');
    }
};

/**
 * @desc
 * @param {Object} headers 
 * @returns 
 */
export const accountInfo = async (headers = {}) => {
    try {
        return await HTTP.getRequest('/auth/account-info', headers);
    } catch (error) {
        throw new Error(error.message || 'Error retrieving account info');
    }
}

/**
 * @desc
 * @param {Object} headers 
 * @returns 
 */
export const sessionStatus = async (headers = {}) => {
    try {
        return await HTTP.getRequest('/auth/session-status', headers);
    } catch (error) {
        throw new Error(error.message || 'Error verifying session status');
    }
};

/**
 * @desc
 * @param {Object} headers 
 * @returns 
 */
export const refreshToken = async (headers = {}) => {
    try {
        return HTTP.getRequest('/auth/refresh', headers);
    } catch (error) {
        throw new Error(error.message || 'Error refreshing access token');
    }
};

/**
 * @desc
 * @param {Object} headers 
 * @returns 
 */
export const getIds = async (headers = {}) => {
    try {
        return await HTTP.getRequest('/auth/ids');
    } catch (error) {
        throw new Error(error.message || 'Error fetching IDs');
    }
}

/**
 * @desc
 * @param {Object} headers 
 * @returns 
 */
export const getIdAttr = async (headers = {}) => {
    try {
        return await HTTP.getRequest('/auth/id-req-attr');
    } catch (error) {
        throw new Error(error.message || 'Error fetching ID attributes');
    }
}

/**
 * @desc
 * @param {Object} headers 
 * @returns 
 */
export const getAlgorithms = async (headers = {}) => {
    try {
        return await HTTP.getRequest('/auth/algorithms')
    } catch (error) {
        throw new Error(error.message || 'Error fetching algorithms');
    }
}

/**
 * @desc
 * @param {Object} headers 
 * @returns 
 */
export const registerId = async (payload, headers = {}) => {
    try {
        return await HTTP.postRequest('/auth/id-register', payload);
    } catch (error) {
        throw new Error(error.message || 'Error registering ID');
    }
};

/**
 * @desc
 * @param {Object} headers 
 * @returns 
 */
export const getId = async (payload, headers = {}) => {
    try {
        return await HTTP.postRequest('/auth/id', payload);
    } catch (error) {
        throw new Error(error.message || 'Error fetching ID');
    }
}