import { getMeApi } from "src/api/auth.api";
import { useAuth } from "src/providers/auth.provider";

export function LoginPage() {
  const { login, user, logout } = useAuth();
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    login({
      username: formData.get('username') as string,
      password: formData.get('password') as string,
    });
  };

  const handleLogoutClick = () => {
    logout();
  };

  const handleGetMeTestClick = async () => {
    const response = await getMeApi();
    console.log(response);
  };

  return (
    <div>
      {
        user ? (
          <>
            <h2>Logged in</h2>
            <p>current user: {user?.username}</p>
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
        <button onClick={handleGetMeTestClick}>Fetch test</button>
      </div>
    </div>
  );
}
