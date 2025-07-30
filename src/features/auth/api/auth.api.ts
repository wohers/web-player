import { baseFetch } from "../../../shared/api/client";
import { API_ENDPOINTS } from "../../../shared/api/endpoints";
import type {
  IGetMeResponse,
  ILoginRequest,
  IRegisterOrLoginResponse,
  IRegisterRequest,
} from "./types";

export const authApi = {
  register: (data: IRegisterRequest): Promise<IRegisterOrLoginResponse> => {
    return baseFetch<IRegisterOrLoginResponse>(
      API_ENDPOINTS.AUTH.SIGNIN,
      "POST",
      data
    );
  },
  login: (data: ILoginRequest): Promise<IRegisterOrLoginResponse> => {
    return baseFetch<IRegisterOrLoginResponse>(
      API_ENDPOINTS.AUTH.LOGIN,
      "POST",
      data
    );
  },
  me: (): Promise<IGetMeResponse> => {
    return baseFetch<IGetMeResponse>(API_ENDPOINTS.AUTH.ME, "GET", null, true);
  },
  logout: () => {
    return baseFetch(API_ENDPOINTS.AUTH.LOGOUT, "POST", null, true);
  },
};
