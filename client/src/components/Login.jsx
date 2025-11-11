import { Link } from "react-router";
import useAuthValue from "../Hooks/useAuthValue";

const Login = () => {
  const { userSignIn } = useAuthValue();
  const handleLogin = (e) => {
    e.preventDefault();
    const { email, password } = Object.fromEntries(
      new FormData(e.target).entries()
    );
    userSignIn(email, password)
      .then((res) => {
        fetch(`${import.meta.env.VITE_API_URL}/users/${email}`, {
          method: "PATCH",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            lastSignInTime: res.user?.metadata?.lastSignInTime,
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            if (data?.modifiedCount) alert("Success");
          });
        console.log(res.user);
      })
      .catch((err) => {
        console.log(err);
        alert("failed");
      });
  };
  return (
    <div className="card bg-base-100 w-full mx-auto mt-3 max-w-sm shrink-0 shadow-2xl">
      <form onSubmit={handleLogin} className="card-body">
        <fieldset className="fieldset">
          <label className="label">Email</label>
          <input
            required
            name="email"
            type="email"
            className="input"
            placeholder="Email"
          />
          <label className="label">Password</label>
          <input
            required
            name="password"
            type="password"
            className="input"
            placeholder="Password"
          />
          <div>
            <button type="button" className="link link-hover">
              Forgot password?
            </button>
          </div>
          <button className="btn btn-neutral mt-4">Login</button>
        </fieldset>
      </form>
      <p>
        Create New{" "}
        <Link to="/signUp" className="link">
          sign up
        </Link>
      </p>
    </div>
  );
};

export default Login;
