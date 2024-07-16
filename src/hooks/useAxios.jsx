import axios from "axios";

const useAxios = () => {
  const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_SERVER_URL,
  });
  return axiosInstance;
};

export default useAxios;
