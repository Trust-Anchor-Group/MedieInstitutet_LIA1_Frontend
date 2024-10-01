class HttpService {
    async registerUser(userData){
        try {
          const response = await fetch('http://localhost:5001/api/v1/auth/register',{
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
            }
          );

          if(!response.ok){
            const errorData = await response.json();
            throw new Error(
              `Registration failed: ${errorData.message || response.statusText}`
            );
          }

          return await response.json();
        } catch (error) {
            throw error;
        }
    }

}

export default new HttpService();

