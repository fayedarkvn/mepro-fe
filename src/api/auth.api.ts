import { api } from 'src/api/api';
import { IUser } from 'src/types/user';

export interface LoginResponse {
  accessToken: string;
  user: IUser;
}
export interface ILoginCredentials {
  username: string;
  password: string;
}

export const loginApi = async (credentials: ILoginCredentials): Promise<LoginResponse> => {
  const response = await api.post<LoginResponse>('/auth/login', credentials);
  return response.data;
};

export const getMeApi = async (): Promise<IUser> => {
  const response = await api.get<IUser>('/auth/me');
  return response.data;
};
