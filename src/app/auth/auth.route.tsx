import { Route, Routes } from 'react-router-dom';
import { NotFound } from '../not-found';
import { AuthLayout } from './auth.layout';
import { LoginPage } from './login/login.index';
import { SignupPage } from './signup/signup.index';

export function AuthRoutes() {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path="login" element={<LoginPage/>} />
        <Route path="signup" element={<SignupPage />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default AuthRoutes;
