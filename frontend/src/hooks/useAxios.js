import axios from "axios";
import { useSelector } from "react-redux";

const useAxiosInstance = () => {
  const token = useSelector((state) => state.user.accessToken);

  return axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
    withCredentials: true,
  });
};

export default useAxiosInstance;
