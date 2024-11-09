import { useGoogleLogin } from "@react-oauth/google";
import { googleLoginApi, loginApi } from "src/api/auth.api";
import { useAuth } from "src/providers/auth.provider";
import { Button, Input } from "antd";
import { useEffect, useState } from "react";
import { useMessage } from "src/hook/message.hook";
import { IUser } from "src/types/user";
import { IApiError } from "src/api/api";

export function LoginPage() {
  const { login, user, logout } = useAuth();
  const { contextHolder, openNotification } = useMessage();
  //States
  const [loading, setLoading] = useState(false);
  const [oldUsers, setOldUsers] = useState<IUser[]>([]);
  const [reload, setReload] = useState(false);
  const [valueMail, setValueMail] = useState<string>();
  // function add new data user to localStorage
  const saveUserToLocalStorage = (newUser: IUser) => {
    const storedUsers = JSON.parse(localStorage.getItem("oldUsers") || "[]");
    const isDuplicate = storedUsers.some(
      (user: any) => user.email === newUser.email
    );
    if (!isDuplicate) {
      storedUsers.push(newUser);
      localStorage.setItem("oldUsers", JSON.stringify(storedUsers));
    }
  };

  //function delete recently users
  const deleteOldUser = (id: number) => {
    const updatedUsers = oldUsers.filter((data) => data.id !== id);
    setOldUsers(updatedUsers);
    localStorage.setItem("oldUsers", JSON.stringify(updatedUsers));
    setReload(true);
  };

  //function select recently account
  const selectedAccount = (mail: string) => {
    setValueMail(mail);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const loginFn = () => loginApi({
      username: formData.get("username") as string,
      password: formData.get("password") as string,
    });
    setLoading(true);
    await login(loginFn)
      .then((response) => {
        saveUserToLocalStorage(response.user);
        // kiểm tra xem trong localstorage có link điều hướng từ trang cũ tới không
        const oldLink = localStorage.getItem("oldLink") as string;
        window.location.href = oldLink !== null ? oldLink : "/";
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
          const oldLink = localStorage.getItem("oldLink") as string;
          window.location.href = oldLink !== null ? oldLink : "/";
        })
        .catch((error: IApiError) => {
          const description = error.message;
          openNotification(description);
        });
    },
    flow: "auth-code",
  });

  //get recently users
  useEffect(() => {
    const users = JSON.parse(localStorage.getItem("oldUsers") || "[]");
    setOldUsers(users);
    setReload(false);
  }, [reload]);

  return (
    <div>
      {user ? (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
          <h2 className="text-2xl font-bold text-gray-700 mb-2">Logged in</h2>
          <p className="text-gray-600 mb-4">Current user: {user.email}</p>
          <button
            onClick={handleLogoutClick}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
          >
            Logout
          </button>
        </div>
      ) : (
        <>
          {contextHolder}
          <div className="flex flex-col lg:flex-row min-h-screen bg-gray-100">
            {/* Left Section */}
            <div className="lg:w-1/2 lg:min-h-screen bg-[url('/thumb-login.svg')] bg-cover bg-center text-white flex flex-col items-center justify-center p-10 h-[250px]">
              <div className="text-center lg:text-left max-w-xs p-4 rounded"></div>
            </div>

            {/* Right Section */}
            <div className="lg:w-1/2 w-full flex flex-col items-center justify-center p-4 sm:p-10">
              <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8 w-full max-w-md">
                <h2 className="text-gray-600 text-center">
                  Welcome to{" "}
                  <span className="text-blue-600 font-bold">MEPRO</span>
                </h2>
                <h1 className="text-3xl font-bold text-center mt-2 text-black">
                  Sign in
                </h1>
                <form onSubmit={handleSubmit} className="mt-8 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <Input
                      name="username"
                      size="large"
                      placeholder="example@fayedark.com"
                      value={valueMail}
                    />
                  </div>
                  <div className="mt-[20px]">
                    <label className="block text-sm font-medium text-gray-700">
                      Password
                    </label>
                    <Input.Password
                      name="password"
                      size="large"
                      placeholder="password"
                    />
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <a href="#" className="text-blue-500 hover:underline">
                      Forgot Password
                    </a>
                    <Button
                      type="default"
                      htmlType="submit"
                      className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
                      loading={loading}
                    >
                      Sign in
                    </Button>
                  </div>
                </form>
                <div className="flex justify-center gap-3 mt-6 text-gray-500">
                  {" "}
                  - OR -{" "}
                </div>
                <div className="flex justify-center gap-3 mt-6">
                  <Button
                    onClick={() => googleLogin()}
                    variant="outlined"
                    className="flex items-center justify-center px-5 py-2"
                  >
                    <img
                      src="/google-icon.svg"
                      alt="Google"
                      className="w-4 h-4"
                    />
                    Sign in with Google
                  </Button>
                </div>
              </div>

              {/* Recently Logged In Users */}
              {oldUsers !== null && oldUsers.length !== 0 && (
                <>
                  <h4 className="text-blue-500 mt-[30px] mb-[-10px] font-semibold ">
                    Recently Logged
                  </h4>
                  <div className="mt-10 flex gap-4 flex-wrap justify-center">
                    {oldUsers.map((data, index) => (
                      <div
                        key={index}
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
                              ? "/default-avt-user.webp"
                              : data.image
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
          </div>
        </>
      )}
    </div>
  );
}
