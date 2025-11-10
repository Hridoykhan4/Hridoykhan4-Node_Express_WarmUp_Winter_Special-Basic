import { use, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router";
import { UserContext } from "../Provider/UserProvider";
const Users = ({ userPromise }) => {
  const loadedUsers = use(userPromise);
  // const [users, setUsers] = useState(() => loadedUsers || []);
  const { setUsers, users } = use(UserContext);
  useEffect(() => {
    setUsers(loadedUsers);
  }, [setUsers, loadedUsers]);
  const handleAddUser = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const userInfo = {
      name,
      email,
    };

    const { data } = await axios.post("http://localhost:5000/users", userInfo);
    setUsers([...users, data]);
  };

  const handleUserDelete = (id) => {
    fetch(`http://localhost:5000/users/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.deletedCount) {
          alert("Removed");
          setUsers(users.filter((user) => user._id !== id));
        }
      });
  };

  return (
    <div>
      <h2>Users: {users?.length}</h2>
      <form onSubmit={handleAddUser}>
        <input name="name" type="text" />
        <br />
        <input name="email" type="email" />
        <br />
        <input type="submit" value="Add User" />
        <br />
      </form>
      {users?.map((user) => (
        <li key={user?._id}>
          {user?.name}: {user?.email}{" "}
          <Link to={`/users/${user?._id}`} style={{ marginLeft: "10px" }}>
            Details
          </Link>
          <Link
            to={`/users/update/${user?._id}`}
            style={{ marginLeft: "10px" }}
          >
            Update
          </Link>
          <button
            onClick={() => handleUserDelete(user?._id)}
            style={{ marginLeft: "10px" }}
          >
            X
          </button>
        </li>
      ))}
    </div>
  );
};

export default Users;
