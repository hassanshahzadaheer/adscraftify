// Import the axios library
import axios  from "axios";

// Create an instance of axios with a base URL
const axiosClient = axios.create({
    // Use the VITE_API_BASE_URL from the environment variables
    baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`,

});

// Log the base URL for debugging
console.log("Base URL:", axiosClient.defaults.baseURL);
// Add an interceptor to the request
axiosClient.interceptors.request.use((config) => {
    // Retrieve the token from localStorage
    const token = localStorage.getItem("token");

    // If a token is found, add it to the Authorization header
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    // Return the modified configuration
    return config;
});

// Add an interceptor to the response
axiosClient.interceptors.response.use(
    // On fulfilled response
    (response) => {
        return response;
    },
    // On rejected response
    (error) => {
        const { response } = error;

        // Check if the response status is 401 (Unauthorized)
        if (response && response.status === 401) {
            // remove access token
            localStorage.removeItem("ACCESS_TOKEN");
            console.log("Unauthorized access. Redirecting to login.");
        }

        // Return the rejected response
        return Promise.reject(error);
    }
);

// Export the configured axios instance
export default axiosClient;
