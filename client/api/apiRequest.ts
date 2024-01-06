import axios from "axios";
import {
  loginStart,
  loginSuccess,
  loginFailure,
  registerStart,
  registerSuccess,
  registerFailure,
  logoutStart,
  logoutSuccess,
  logoutFailure,
} from '../components/auth/authSlice';
import { Users } from "@/model/Model";

const setRefreshTokenInCookies = (refreshToken: string) => {
  const existingRefreshToken = getRefreshTokenFromCookies();
  console.log("existingRefreshToken: ",existingRefreshToken);
  if (existingRefreshToken) {
    deleteRefreshTokenFromCookies();
  }
  document.cookie = `refreshToken=${refreshToken}; path=/`;
};

const getRefreshTokenFromCookies = () => {
  const cookies = document.cookie.split("; ");
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].split("=");
    if (cookie[0] === "refreshToken") {
      return cookie[1];
    }
  }
  return null;
};

const deleteRefreshTokenFromCookies = () => {
  document.cookie = "refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
};

export const loginUser = async (user: any, dispatch : any, navigate : any) => {
  dispatch(loginStart());
  try {
    const res = await axios.post("http://localhost:8000/v1/auth/login", user);
    console.log('refresh token in client : ',res.data.refreshToken);
    const refreshToken = res.data.refreshToken;
    setRefreshTokenInCookies(refreshToken);
    dispatch(loginSuccess(res.data));
    navigate.push("/dashboard");
  } catch (err) {
    dispatch(loginFailure());
  }
};

export const registerUser = async (user : any, dispatch : any, navigate : any) => {
  dispatch(registerStart());
  try {
    await axios.post("http://localhost:8000/v1/auth/register", user);
    dispatch(registerSuccess());
    navigate.push("/sign-in");
  } catch (err) {
    dispatch(registerFailure());
  }
};

//get all user
// export const getUsers = async (accessToken, dispatch, axiosJWT) => {
//   dispatch(getUsersStart());
//   try {
//     const res = await axiosJWT.get("http://localhost:8000/user", {
//       headers: {
//         authorization: `Bearer ${accessToken}`,
//       },
//     });
//     console.log(res.data);
//     dispatch(getUsersSuccess(res.data));
//   } catch (err) {
//     dispatch(getUsersFailure());
//   }
// };

// export const deleteUser = async (accessToken, dispatch, id, axiosJWT) => {
//   dispatch(deleteUsersStart());
//   try {
//     const res = await axiosJWT.delete(
//       `http://localhost:8000/user/delete/${id}`,
//       {
//         headers: {
//           authorization: `Bearer ${accessToken}`,
//         },
//       }
//     );
//     dispatch(deleteUserSuccess(res.data));
//   } catch (err) {
//     dispatch(deleteUserFailure(err.response.data));
//   }
// };

export const logoutUser = async (dispatch : any,id : any, navigate: any, accessToken: any, axiosJWT: any) => {
  dispatch(logoutStart());
  try {
    await axiosJWT.post("http://localhost:8000/v1/auth/logout", id, {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    });  
    dispatch(logoutSuccess());
    navigate.push("/sign-in");
  } catch (err) {
    dispatch(logoutFailure());
  }
};
