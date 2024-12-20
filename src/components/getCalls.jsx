import axios from "axios";

const getService = async () => {
  try {
    const response = await axios.get('http://localhost:8080/services');
    return response.data;
  } catch (error) {
    console.error("Error fetching services:", error);
    throw error;
  }
};
const loginGoogle = () => {
  window.location.href = 'http://localhost:8080/oauth2/authorization/google';
};

export default getService;
