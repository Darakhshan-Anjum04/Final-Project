
import axios from 'axios';

// Define API URL based on environment (local or production)
const API_URL = "http://localhost:3000/api";


// Function to register a user
const registerUser = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}/SignUpForm`, userData, {
            headers: {
                'Content-Type': 'application/json',
            },
            timeout: 5000, 
        });
        return response.data;
    } catch (error) {
        if (error.response) {
            // Server responded with a status outside 2xx range
            console.error("Error registering user:", error.response.data);
            throw new Error(`Registration failed: ${error.response.data.message || error.response.statusText}`);
        } else if (error.request) {
            // Request was made but no response was received
            console.error("Error registering user: No response received", error.request);
            throw new Error("Network error: No response from server.");
        } else {
            // Something else happened while setting up the request
            console.error("Error registering user:", error.message);
            throw new Error(`Error: ${error.message}`);
        }
    }
};

// Function to login a user
const loginUser = async (loginData) => {
    try {
        const response = await axios.post(`${API_URL}/Login`, loginData, {
            headers: {
                'Content-Type': 'application/json',
            }
            
        });
        return response.data;
    } catch (error) {
        if (error.response) {
            console.error("Error logging in user:", error.response.data);
            throw new Error(`Login failed: ${error.response.data.message || error.response.statusText}`);
        } else if (error.request) {
            console.error("Error logging in user: No response received", error.request);
            throw new Error("Network error: No response from server.");
        } else {
            console.error("Error logging in user:", error.message);
            throw new Error(`Error: ${error.message}`);
        }
    }
};



// Exporting an object that contains both functions as default
export default { registerUser, loginUser };
