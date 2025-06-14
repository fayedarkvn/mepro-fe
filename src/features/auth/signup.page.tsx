import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/hook/auth.hook';
import { Link, useNavigate } from '@tanstack/react-router';
import { notification } from 'antd';
import { Loader2 } from 'lucide-react';

export function SignupPage() {
  const auth = useAuth();
  const navigate = useNavigate();

  const submitSignup = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const dto = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      password: formData.get('password') as string,
      confirmPassword: formData.get('confirm_password') as string,
    };

    if (dto.password !== dto.confirmPassword) {
      return notification.error({
        message: 'The password you entered does not match',
      });
    }
    if (dto.name === '' || dto.email === '' || dto.password === '' || dto.confirmPassword === '') {
      return notification.error({
        message: 'Please fill in the information completely',
      });
    }

    await auth.signupMutation.mutateAsync(dto)
      .catch((error: any) => {
        notification.error({
          message: 'Login failed',
          description: error?.message,
        });
      });

    navigate({
      to: '/dashboard',
    });
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="w-full max-w-3xl grid md:grid-cols-2 overflow-hidden">
          <div className="bg-black text-white p-8 flex flex-col items-start justify-center space-y-4">
            <div className="max-w-sm">
              <h1 className="text-2xl font-bold mb-2">Welcome Back!</h1>
              <p className="text-gray-400 mb-4">
                To keep connected with us please login with your your current account
              </p>
              <Button variant="outline" className="border-white bg-black text-white hover:text-black hover:bg-white" asChild>
                <Link to="/login">
                  SIGN IN
                </Link>
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
                  {auth.signupMutation.isPending && <Loader2 className="animate-spin" />}
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
