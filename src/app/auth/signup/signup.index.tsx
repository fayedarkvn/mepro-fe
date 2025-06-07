import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { signupApi } from '@/api/auth.api';
import LinearProgress from '@mui/material/LinearProgress';
import { useState } from 'react';
import { useMessage } from '@/hook/message.hook.tsx';
import { IApiError } from '@/api/api.ts';
import { Loader2 } from 'lucide-react';

export function SignupPage() {
  const { contextHolder, openNotification } = useMessage();
  const [loading, setLoading] = useState(false);
  const gotoLogin = () => {
    window.location.href = '/auth/login';
  };
  const submitSignup = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    const formData = new FormData(event.currentTarget);
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const confirmPassword = formData.get('confirm_password') as string;
    if (password !== confirmPassword) {
      openNotification('The password you entered does not match');
      setLoading(false);
    }
    if (name === '' || email === '' || password === '' || confirmPassword === '') {
      openNotification('Please fill in the information completely');
      setLoading(false);
    }
    else {
      await signupApi({
        name,
        email,
        password,
      })
        .then(() => {
          setLoading(false);
          setLoading(false);
          window.location.href = '/auth/login';
        })
        .catch((error: IApiError) => {
          openNotification(error.message);
          setLoading(false);
        });
    }
  };
  return (
    <>
      {contextHolder}
      {loading && <LinearProgress />}
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="w-full max-w-3xl grid md:grid-cols-2 overflow-hidden">
          <div className="bg-black text-white p-8 flex flex-col items-start justify-center space-y-4">
            <div className="max-w-sm">
              <h1 className="text-2xl font-bold mb-2">Welcome Back!</h1>
              <p className="text-gray-400 mb-4">
                To keep connected with us please login with your your current account
              </p>
              <Button onClick={gotoLogin} variant="outline" className="border-white bg-black text-white hover:text-black hover:bg-white">
                SIGN IN
              </Button>
            </div>
          </div>
          <div className="p-8">
            <div className="max-w-sm mx-auto">
              <h2 className="text-2xl font-bold mb-6">Create Account</h2>
              <form onSubmit={submitSignup} className="space-y-4">
                <Input type="text" name="name" placeholder="Name" />
                <Input type="email" name="email" placeholder="Email" />
                <Input type="password" name="password" placeholder="Password" />
                <Input type="confirm_password" name="confirm_password" placeholder="Confirm Password" />
                <Button type="submit" className="w-full bg-black text-white hover:bg-white-900">
                  {loading && <Loader2 className="animate-spin" />}
                  SIGN UP
                </Button>
              </form>
            </div>
          </div>
        </Card>
      </div>
    </>
  );
}
