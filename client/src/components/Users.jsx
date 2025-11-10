import { use } from "react";
import axios from "axios";
import { useState } from "react";
const Users = ({ userPromise }) => {
  const loadedUsers = use(userPromise);
  const [users, setUsers] = useState(() => loadedUsers || []);
  const handleAddUser = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const userInfo = {
      name,
      email,
    };

    const { data } = await axios.post(
      "http://localhost:5000/users",
      userInfo
    );
    console.log(data);
  };
  return (
    <div>
      <form onSubmit={handleAddUser}>
        <input name="name" type="text" />
        <br />
        <input name="email" type="email" />
        <br />
        <input type="submit" value="Add User" />
        <br />
      </form>
      {users?.map((user) => (
        <li key={user?.id}>
          {user?.id}: {user?.name}: {user?.email}
        </li>
      ))}
    </div>
  );
};

export default Users;
