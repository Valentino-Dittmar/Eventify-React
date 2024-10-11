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

const getCalls = {
  getService
};

export default getCalls;