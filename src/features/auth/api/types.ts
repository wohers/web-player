export interface IRegisterOrLoginResponse {
  data: {
    token: string;
    user: {
      id: number;
      email: string;
      first_name: string;
      second_name: string;
      is_staff: boolean;
    };
  };
}

export interface IGetMeResponse {
  data: {
    user: {
      id: number;
      email: string;
      first_name: string;
      second_name: string;
      is_staff: boolean;
    };
  };
}

export interface IRegisterRequest {
  id: number;
  email: string;
  first_name: string;
  second_name: string;
  password: string;
}

export interface ILoginRequest {
  email: string;
  password: string;
}
