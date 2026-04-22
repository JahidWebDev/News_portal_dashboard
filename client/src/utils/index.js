import { jwtDecode } from "jwt-decode";

const decode_token = (token) => {
  if (token) {
    try {
      const decoded_token = jwtDecode(token);

      // expire check
      const exp = new Date(decoded_token.exp * 1000);

      if (new Date() > exp) {
        localStorage.removeItem("token");
        return null;
      } else {
        return decoded_token;
      }
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
      return null;
    }
  } else {
    return null;
  }
};

export default decode_token;