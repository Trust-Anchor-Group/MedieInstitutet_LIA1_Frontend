export default class HttpClient {

    constructor(url) {
        this.url = url;
    }

    /**
     * @param {*} additionalHeaders - Additional headers to be added to the request
     * @returns - The headers to be used in the request
     */
    setHeaders(additionalHeaders = {}) {
        const headers = {
            'Content-Type': 'application/json'
        }

        return { ...headers, ...additionalHeaders }
    }

    /**
     * @param {*} endpoint - The endpoint to send the request to 
     * @param {*} payload - The payload to be sent in the request
     * @param {*} additionalHeaders - Additional headers to be added to the request 
     * @returns 
     */
    async postRequest(endpoint, payload, additionalHeaders = {}) {

        const headers = this.setHeaders(additionalHeaders);

        try {

            const response = await fetch(`${this.url}${endpoint}`, {
                method: 'POST',
                credentials: 'include',
                headers,
                body: JSON.stringify(payload)
            });

            const contentType = response.headers.get('content-type');
            const isJson = contentType && contentType.includes('application/json');
            const data = isJson ? await response.json() : await response.text();

            if (!response.ok) {
                throw new Error(data.message || `HTTP error! status: ${response.status}`);
            }

            return data;

        } catch (error) {
            throw error;
        }
    }

    async getRequest(endpoint, additionalHeaders = {}) {

        const headers = this.setHeaders(additionalHeaders);

        try {
            const response = await fetch(`${this.url}${endpoint}`, {
                method: 'GET',
                credentials: 'include',
                headers,
            });

            const contentType = response.headers.get('content-type');
            const isJson = contentType && contentType.includes('application/json');
            const data = isJson ? await response.json() : await response.text();

            if (!response.ok) {
                throw new Error(data.message || `HTTP error! status: ${response.status}`);
            }

            return data;
        } catch (error) {
            throw error;
        }
    };

}