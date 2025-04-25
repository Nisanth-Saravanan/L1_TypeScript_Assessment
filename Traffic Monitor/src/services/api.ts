import axios from "axios";

const API_URL = "http://localhost:5000/TrafficReports";

export const getReports = async () => axios.get(API_URL);

export const fetchReports = async () => {
  try {
    const response = await getReports();
    return response.data;
  } catch (error) {
    console.error("Error fetching report:", error);
    throw error;
  }
};

export const createReport = async (report: any) => {
  try {
    const response = await axios.post(API_URL, report);
    return response.data;
  } catch (error) {
    console.error("Error creating report:", error);
    throw error;
  }
};

export const updateReport = async (id: number, report: any) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, report);
    return response.data;
  } catch (error) {
    console.error("Error updating report:", error);
    throw error;
  }
};

export const deleteReport = async (id: number) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting report:", error);
    throw error;
  }
};
