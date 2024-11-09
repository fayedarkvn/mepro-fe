import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createContext, ReactNode, useContext } from 'react';
import { LOCAL_STORAGE_KEY } from 'src/constants/local-storage.constant';
import { IUser } from 'src/types/user';
import { getMeApi, LoginResponse } from '../api/auth.api';

type LoginFn = () => Promise<LoginResponse>;
type LogoutFn = () => Promise<any>;
export interface IAuthContext {
  user: IUser | null;
  isLoading: boolean;
  login: (loginFn: LoginFn) => Promise<LoginResponse>;
  logout: (logoutFn?: LogoutFn) => Promise<any>;
}

const AuthContext = createContext<IAuthContext | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode; }) => {
  const queryClient = useQueryClient();

  const { data: user, isLoading } = useQuery<IUser | null>({
    queryKey: ['auth', 'user'],
    queryFn: async () => {
      const storedToken = localStorage.getItem(LOCAL_STORAGE_KEY.ACCESS_TOKEN);
      if (!storedToken) return null;
      const data = await getMeApi();
      return data;
    },
    initialData: null,
  });

  const loginMutation = useMutation({
    mutationFn: async (loginFn: LoginFn) => loginFn(),
    onSuccess: (data) => {
      localStorage.setItem(LOCAL_STORAGE_KEY.ACCESS_TOKEN, data.accessToken);
      queryClient.setQueryData(['auth', 'user'], data.user);
    },
  });

  const logoutMutation = useMutation({
    mutationFn: async (logoutFn: LogoutFn) => logoutFn(),
    onSuccess: () => {
      localStorage.removeItem(LOCAL_STORAGE_KEY.ACCESS_TOKEN);
      queryClient.setQueryData(['auth', 'user'], null);
    },
  });

  const loginUser = async (loginFn: LoginFn) => {
    return await loginMutation.mutateAsync(loginFn);
  };

  const logoutUser = async (logoutFn: LogoutFn = () => Promise.resolve(null)) => {
    return await logoutMutation.mutateAsync(logoutFn);
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login: loginUser, logout: logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
