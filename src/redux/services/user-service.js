import platformApi from './platformApi';
import authHeader from "./auth-header";

const getUserDetails = () => {
  return platformApi.get("user", { headers: authHeader() });
};

export default {
  getUserDetails
};
