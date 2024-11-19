// src/api/base-api.mjs
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
 * @param {Object} payload 
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
 * @param {Object} payload 
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

/**
 * @desc Create a new micro loan contract
 * @param {Object} payload - The contract data
 * @param {number} payload.amount - The loan amount
 * @param {string} payload.currency - Three-letter currency code
 * @param {string} payload.installmentInterval - Payment interval in ISO 8601 duration format
 * @param {number} payload.interestPerInstallment - Interest rate per installment
 * @param {number} payload.installmentAmount - Amount per installment
 * @param {number} payload.debtLimit - Maximum allowed debt
 * @param {number} payload.commissionPercent - Commission percentage
 * @param {Object} payload.roles - Contract role assignments
 * @param {string} payload.roles.creator - Username of contract creator
 * @param {string} payload.roles.lender - Username of lender
 * @param {string} payload.roles.borrower - Username of borrower
 * @param {string} payload.roles.trustProvider - Trust provider identifier
 * @param {Object} headers - Optional additional headers
 * @returns {Promise<Object>} Response containing contract creation status and details
 */
export const createMicroLoan = async (payload, headers = {}) => {
    try {
        console.log('createMicroLoan called with:', payload);
        const response = await HTTP.postRequest('/contracts/microloan', payload, headers);
        console.log('createMicroLoan response:', response);
        return response;
    } catch (error) {
        console.error('Error in createMicroLoan:', error);
        throw new Error(error.message || 'Error creating micro loan contract');
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
 * @desc Sign a contract with a legal identity
 * @param {Object} payload - Contract signing data
 * @param {string} payload.contractId - ID of contract to sign
 * @param {string} payload.legalId - Legal identity to sign with
 * @param {string} payload.role - Role for signing
 * @param {string} payload.keyId - Key ID for signing
 * @param {string} payload.keyPassword - Key password
 * @param {string} payload.accountPassword - Account password
 * @returns {Promise<Object>} Signed contract response
 */
export const signContract = async (payload, headers = {}) => {
    try {
        return await HTTP.postRequest('/contracts/sign', payload, headers);
    } catch (error) {
        throw new Error(error.message || 'Error signing contract');
    }
};