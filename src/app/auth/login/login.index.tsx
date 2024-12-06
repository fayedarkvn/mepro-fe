import { useGoogleLogin } from '@react-oauth/google';
import { googleLoginApi, loginApi } from 'src/api/auth.api';
import { useAuth } from 'src/providers/auth.provider';
import { useEffect, useState } from 'react';
import { useMessage } from 'src/hook/message.hook';
import { IUser } from 'src/types/user';
import { IApiError } from 'src/api/api';
import { Button } from 'src/components/ui/button';
import { Card } from 'src/components/ui/card';
import { Input } from 'src/components/ui/input';
import LinearProgress from '@mui/material/LinearProgress';
import { Loader2 } from 'lucide-react';

export function LoginPage() {
  const { login, user, logout } = useAuth();
  const { contextHolder, openNotification } = useMessage();
  // States
  const [loading, setLoading] = useState(false);
  const [oldUsers, setOldUsers] = useState<IUser[]>([]);
  const [reload, setReload] = useState(false);
  const [valueMail, setValueMail] = useState<string>('');
  // function add new data user to localStorage
  const saveUserToLocalStorage = (newUser: IUser) => {
    const storedUsers = JSON.parse(localStorage.getItem('oldUsers') || '[]');
    const isDuplicate = storedUsers.some(
      (user: any) => user.email === newUser.email,
    );
    if (!isDuplicate) {
      storedUsers.push(newUser);
      localStorage.setItem('oldUsers', JSON.stringify(storedUsers));
    }
  };

  // function delete recently users
  const deleteOldUser = (id: number) => {
    const updatedUsers = oldUsers.filter(data => data.id !== id);
    setOldUsers(updatedUsers);
    localStorage.setItem('oldUsers', JSON.stringify(updatedUsers));
    setReload(true);
  };

  // function select recently account
  const selectedAccount = (mail: string) => {
    setValueMail(mail);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const loginFn = () => loginApi({
      username: formData.get('username') as string,
      password: formData.get('password') as string,
    });
    setLoading(true);
    await login(loginFn)
      .then((response) => {
        saveUserToLocalStorage(response.user);
        // kiểm tra xem trong localstorage có link điều hướng từ trang cũ tới không
        const oldLink = localStorage.getItem('oldLink') as string;
        window.location.href = oldLink !== null ? oldLink : '/';
      })
      .catch((error: IApiError) => {
        const description = error.message;
        openNotification(description);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleLogoutClick = () => {
    logout();
  };

  const googleLogin = useGoogleLogin({
    onSuccess: async ({ code }) => {
      const loginFn = async () => googleLoginApi(code);
      await login(loginFn)
        .then((response) => {
          saveUserToLocalStorage(response.user);
          // kiểm tra xem trong localstorage có link điều hướng từ trang cũ tới không
          const oldLink = localStorage.getItem('oldLink') as string;
          window.location.href = oldLink !== null ? oldLink : '/';
        })
        .catch((error: IApiError) => {
          const description = error.message;
          openNotification(description);
        });
    },
    flow: 'auth-code',
  });

  const gotoSignup = () => {
    window.location.href = '/auth/signup';
  };

  // get recently users
  useEffect(() => {
    const users = JSON.parse(localStorage.getItem('oldUsers') || '[]');
    setOldUsers(users);
    setReload(false);
  }, [reload]);

  return (
    <div className="min-w-screen">
      {user !== null
        ? (
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
              <h2 className="text-2xl font-bold text-gray-700 mb-2">Logged in</h2>
              <p className="text-gray-600 mb-4">
                Current user:
                {user.email}
              </p>
              <Button
                onClick={handleLogoutClick}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
              >
                Logout
              </Button>
            </div>
          )
        : (
            <>
              {contextHolder}
              <div className="w-full min-h-screen bg-gray-100">
                {loading && <LinearProgress />}
                <div className="min-h-screen flex items-center justify-center p-4">
                  <Card className="w-full max-w-3xl grid md:grid-cols-2 overflow-hidden animated-height">
                    <div className="bg-black text-white p-8 flex flex-col items-start justify-center space-y-4">
                      <div className="max-w-sm">
                        <h1 className="text-2xl font-bold mb-2">SIGN UP NOW!</h1>
                        <p className="text-gray-400 mb-4">
                          Please register an account to join our community
                        </p>
                        <Button onClick={gotoSignup} variant="outline" className="border-white bg-black text-white hover:text-black hover:bg-white">
                          SIGN UP
                        </Button>
                      </div>
                    </div>
                    <div className="p-8">
                      <div className="max-w-sm mx-auto">
                        <h2 className="text-2xl font-bold mb-6">Welcome to MePro</h2>
                        <div className="flex justify-center gap-4 mb-3">
                          <Button onClick={googleLogin} variant="outline" size="icon" className="rounded-full">
                            <svg
                              width="80px"
                              height="80px"
                              viewBox="-0.5 0 48 48"
                              version="1.1"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <g id="Icons" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                                <g id="Color-" transform="translate(-401.000000, -860.000000)">
                                  <g id="Google" transform="translate(401.000000, 860.000000)">
                                    <path
                                      d="M9.82727273,24 C9.82727273,22.4757333 10.0804318,21.0144 10.5322727,19.6437333 L2.62345455,13.6042667 C1.08206818,16.7338667 0.213636364,20.2602667 0.213636364,24 C0.213636364,27.7365333 1.081,31.2608 2.62025,34.3882667 L10.5247955,28.3370667 C10.0772273,26.9728 9.82727273,25.5168 9.82727273,24"
                                      id="Fill-1"
                                      fill="#FBBC05"
                                    >

                                    </path>
                                    <path
                                      d="M23.7136364,10.1333333 C27.025,10.1333333 30.0159091,11.3066667 32.3659091,13.2266667 L39.2022727,6.4 C35.0363636,2.77333333 29.6954545,0.533333333 23.7136364,0.533333333 C14.4268636,0.533333333 6.44540909,5.84426667 2.62345455,13.6042667 L10.5322727,19.6437333 C12.3545909,14.112 17.5491591,10.1333333 23.7136364,10.1333333"
                                      id="Fill-2"
                                      fill="#EB4335"
                                    >

                                    </path>
                                    <path
                                      d="M23.7136364,37.8666667 C17.5491591,37.8666667 12.3545909,33.888 10.5322727,28.3562667 L2.62345455,34.3946667 C6.44540909,42.1557333 14.4268636,47.4666667 23.7136364,47.4666667 C29.4455,47.4666667 34.9177955,45.4314667 39.0249545,41.6181333 L31.5177727,35.8144 C29.3995682,37.1488 26.7323182,37.8666667 23.7136364,37.8666667"
                                      id="Fill-3"
                                      fill="#34A853"
                                    >

                                    </path>
                                    <path
                                      d="M46.1454545,24 C46.1454545,22.6133333 45.9318182,21.12 45.6113636,19.7333333 L23.7136364,19.7333333 L23.7136364,28.8 L36.3181818,28.8 C35.6879545,31.8912 33.9724545,34.2677333 31.5177727,35.8144 L39.0249545,41.6181333 C43.3393409,37.6138667 46.1454545,31.6490667 46.1454545,24"
                                      id="Fill-4"
                                      fill="#4285F4"
                                    >

                                    </path>
                                  </g>
                                </g>
                              </g>
                            </svg>
                          </Button>
                          <Button onClick={googleLogin} variant="outline" size="icon" className="rounded-full">
                            <svg
                              width="100px"
                              height="100px"
                              viewBox="0 -0.5 48 48"
                              version="1.1"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <g id="Icons" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                                <g id="Color-" transform="translate(-700.000000, -560.000000)" fill="#3E75C3">
                                  <path
                                    d="M723.9985,560 C710.746,560 700,570.787092 700,584.096644 C700,594.740671 706.876,603.77183 716.4145,606.958412 C717.6145,607.179786 718.0525,606.435849 718.0525,605.797328 C718.0525,605.225068 718.0315,603.710086 718.0195,601.699648 C711.343,603.155898 709.9345,598.469394 709.9345,598.469394 C708.844,595.686405 707.2705,594.94548 707.2705,594.94548 C705.091,593.450075 707.4355,593.480194 707.4355,593.480194 C709.843,593.650366 711.1105,595.963499 711.1105,595.963499 C713.2525,599.645538 716.728,598.58234 718.096,597.964902 C718.3135,596.407754 718.9345,595.346062 719.62,594.743683 C714.2905,594.135281 708.688,592.069123 708.688,582.836167 C708.688,580.205279 709.6225,578.054788 711.1585,576.369634 C710.911,575.759726 710.0875,573.311058 711.3925,569.993458 C711.3925,569.993458 713.4085,569.345902 717.9925,572.46321 C719.908,571.928599 721.96,571.662047 724.0015,571.651505 C726.04,571.662047 728.0935,571.928599 730.0105,572.46321 C734.5915,569.345902 736.603,569.993458 736.603,569.993458 C737.9125,573.311058 737.089,575.759726 736.8415,576.369634 C738.3805,578.054788 739.309,580.205279 739.309,582.836167 C739.309,592.091712 733.6975,594.129257 728.3515,594.725612 C729.2125,595.469549 729.9805,596.939353 729.9805,599.18773 C729.9805,602.408949 729.9505,605.006706 729.9505,605.797328 C729.9505,606.441873 730.3825,607.191834 731.6005,606.9554 C741.13,603.762794 748,594.737659 748,584.096644 C748,570.787092 737.254,560 723.9985,560"
                                    id="Github"
                                  >

                                  </path>
                                </g>
                              </g>
                            </svg>
                          </Button>
                        </div>
                        <p className="text-center text-sm text-muted-foreground mb-5">
                          or login with
                        </p>
                        <form onSubmit={handleSubmit} className="space-y-4">
                          <Input
                            onChange={e => setValueMail(e.target.value)}
                            type="email"
                            name="username"
                            value={valueMail}
                            placeholder="Email"
                          />
                          <Input type="password" name="password" placeholder="Password" />
                          <Button type="submit" className="w-full bg-black text-white hover:bg-gray-900">
                            {loading && <Loader2 className="animate-spin" />}
                            LOG IN
                          </Button>
                        </form>
                      </div>
                      {/* Recently Logged In Users */}
                      {oldUsers !== null && oldUsers.length !== 0 && (
                        <>
                          <h4 className="text-blue-500 mt-[30px] mb-[-10px] font-semibold ">
                            Recently Logged
                          </h4>
                          <div className="mt-10 flex gap-4 flex-wrap justify-center">
                            {oldUsers.map(data => (
                              <div
                                key={data.id}
                                className="flex flex-col items-center m-[10px]"
                              >
                                <button
                                  type="button"
                                  className="border-dashed border-[0.5px] border-black rounded-full p-1 inline-flex items-center justify-center text-black hover:text-red-500 hover:border-red-500 absolute ml-[-60px] mt-[-10px]"
                                  onClick={() => deleteOldUser(data.id)}
                                >
                                  <svg
                                    className="h-2 w-2"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    aria-hidden="true"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth="3"
                                      d="M6 18L18 6M6 6l12 12"
                                    />
                                  </svg>
                                </button>
                                <img
                                  src={
                                    data.image === null
                                      ? '/default-avt-user.webp'
                                      : data.imageUrl
                                  }
                                  alt="User 1"
                                  className="w-12 h-12 rounded-full border-[2px] border-blue-500"
                                  onClick={() => selectedAccount(data.email)}
                                />
                                <p
                                  onClick={() => selectedAccount(data.email)}
                                  className="text-base font-semibold text-gray-600 cursor-pointer"
                                >
                                  {data.name}
                                </p>
                                <p className="text-sm text-gray-500 cursor-pointer">
                                  {data.email}
                                </p>
                              </div>
                            ))}
                          </div>
                        </>
                      )}
                    </div>
                  </Card>
                </div>
              </div>
            </>
          )}
    </div>
  );
}
