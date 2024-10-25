import { useGoogleLogin } from "@react-oauth/google";
import { googleLoginApi, loginApi } from "src/api/auth.api";
import { useAuth } from "src/providers/auth.provider";

export function LoginPage() {
  const { login, user, logout } = useAuth();
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const loginFn = async () => loginApi({
      username: formData.get("username") as string,
      password: formData.get("password") as string
    });
    login(loginFn);
  };

  const handleLogoutClick = () => {
    logout();
  };

  const googleLogin = useGoogleLogin({
    onSuccess: async ({ code }) => {
      const loginFn = async () => googleLoginApi(code);
      login(loginFn);
    },
    flow: "auth-code"
  });

  return (
    <div>
      {
        user ? (
          <>
            <h2>Logged in</h2>
            <p>current user: {user.email}</p>
            <button onClick={handleLogoutClick}>Logout</button>
          </>
        ) : (
          <>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
              <input name="username" type="text" placeholder="Username" />
              <input name="password" type="password" placeholder="Password" />
              <input type="submit" value="login" />
            </form>
          </>
        )
      }
      <div>
        <button onClick={() => googleLogin()}>Login with google</button>
      </div>
    </div>
  );
}
