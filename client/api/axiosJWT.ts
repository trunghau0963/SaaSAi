
import axios from 'axios';
import { jwtDecode } from "jwt-decode";

const setRefreshTokenInCookies = (refreshToken: string) => {
  document.cookie = `refreshToken=${refreshToken}; path=/`;
};

const refreshToken = async () => {
    try {
      const res = await axios.post("http://localhost:8000/v1/auth/refresh", {
        withCredentials: true,
      });
      // const res = await axios.post("http://localhost:8000/v1/auth/refresh", user);
      console.log('refresh token is : ',res.data);
      const refreshToken = res.data.refreshToken;
      setRefreshTokenInCookies(refreshToken);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

export const createAxios = (user : any, dispatch: any, stateSuccess : any) => {
    const newInstance = axios.create();
    newInstance.interceptors.request.use(
        async (config) => {
          //de biet het han dung jwt-decode
          //giai ma
          let date = new Date();
          const decodeToken: any = jwtDecode(user?.accessToken);
          console.log('exp',decodeToken.exp);
          //giai ma cai exp
          if (decodeToken.exp < date.getTime() / 1000) {
            const data = await refreshToken();
            const refreshUser = {
              ...user,
              accessToken: data.accessToken,
              refreshToken: data.refreshToken,
            };
            console.log('refreshUser: ',refreshUser);
            dispatch(stateSuccess(refreshUser));
            config.headers["authorization"] = "Bearer " + data.accessToken;
          }
          return config;
        },
        (err) => {
          return Promise.reject(err);
        }
      );
      return newInstance;
}

