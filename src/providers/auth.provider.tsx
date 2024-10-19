import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createContext, ReactNode, useContext } from 'react';
import { LOCAL_STORAGE_KEY } from 'src/constants/local-storage.constant';
import { IUser } from 'src/types/user';
import { getMeApi, ILoginCredentials, loginApi } from '../api/auth.api';

interface AuthContextType {
  user: IUser | null;
  isLoading: boolean;
  login: (credentials: ILoginCredentials) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

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
    mutationFn: async (credentials: ILoginCredentials) => {
      const data = await loginApi(credentials);
      return data;
    },
    onSuccess: (data) => {
      localStorage.setItem(LOCAL_STORAGE_KEY.ACCESS_TOKEN, data.accessToken);
      queryClient.setQueryData(['auth', 'user'], data.user);
    },
  });

  const logoutMutation = useMutation({
    mutationFn: async () => {
      return Promise.resolve();
    },
    onSuccess: () => {
      localStorage.removeItem(LOCAL_STORAGE_KEY.ACCESS_TOKEN);
      queryClient.setQueryData(['auth', 'user'], null);
    },
  });

  const loginUser = async (credentials: ILoginCredentials) => {
    await loginMutation.mutateAsync(credentials);
  };

  const logoutUser = async () => {
    await logoutMutation.mutateAsync();
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
