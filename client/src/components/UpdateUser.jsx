import axios from "axios";
import { use } from "react";
import { useLoaderData } from "react-router";
import { UserContext } from "../Provider/UserProvider";

const UpdateUser = () => {
  const user = useLoaderData();
  const { setUsers } = use(UserContext);
  const handleUpdate = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const userData = { name, email };
    const { data } = await axios.put(
      `http://localhost:5000/users/${user?._id}`,
      userData
    );
    if (data.modifiedCount) {
      console.log(data);
      alert("Success");
      setUsers((prev) =>
        prev.map((person) =>
          person._id === user?._id ? { _id: user?._id, ...userData } : person
        )
      );
    }
  };
  return (
    <div>
      <form onSubmit={handleUpdate}>
        <input defaultValue={user?.name} name="name" type="text" />
        <br />
        <input defaultValue={user?.email} name="email" type="email" />
        <br />
        <input value="Update User" type="submit" />
        <br />
      </form>
    </div>
  );
};

export default UpdateUser;
