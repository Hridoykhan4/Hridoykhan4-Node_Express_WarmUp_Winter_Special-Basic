import { Link } from "react-router";
import useAuthValue from "../Hooks/useAuthValue";

const SignUp = () => {
  const { createNewUser, updateUserProfile, user } = useAuthValue();
  const handleRegister = (e) => {
    e.preventDefault();
    const { email, password, name, photo, phone, address } = Object.fromEntries(
      new FormData(e.target).entries()
    );

    const userProfile = {
      name,
      photo,
      phone,
      address,
      email,
    };

    if (!phone.startsWith("01")) return alert("Invalid phone");

    createNewUser(email, password)
      .then((res) => {
        updateUserProfile(name, photo).then(() => {
          console.log(res.user);
          userProfile.creationTime = res.user?.metadata?.creationTime;
          //   Save info to the database

          fetch(`${import.meta.env.VITE_API_URL}/users`, {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(userProfile),
          })
            .then((res) => res.json())
            .then((data) => console.log(data));

          console.log("Success");
          e.target.reset();
        });
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="card bg-base-100 w-full mx-auto mt-3 max-w-sm shrink-0 shadow-2xl">
      <div className="card-body">
        <form onSubmit={handleRegister} className="fieldset">
          <label className="label">Name</label>
          <input name="name" type="text" className="input" placeholder="Name" />
          <label className="label">PhotoURL</label>
          <input
            name="photo"
            type="url"
            required
            className="input"
            placeholder="Photo"
          />
          <label className="label">Phone</label>
          <input
            name="phone"
            required
            type="tel"
            className="input"
            placeholder="Phone"
          />
          <label className="label">Address</label>
          <input
            name="address"
            required
            type="text"
            className="input"
            placeholder="Address"
          />
          <label className="label">Email</label>
          <input
            name="email"
            type="email"
            className="input"
            required
            placeholder="Email"
          />
          <label className="label">Password</label>
          <input
            name="password"
            required
            type="password"
            className="input"
            placeholder="Password"
          />
          <button className="btn btn-neutral mt-4">Register</button>
        </form>
      </div>
      <p>
        Already have{" "}
        <Link to="/login" className="link">
          login
        </Link>
      </p>
    </div>
  );
};

export default SignUp;
