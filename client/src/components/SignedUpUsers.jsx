import axios from "axios";
import { useState } from "react";
import { useLoaderData } from "react-router";

const SignedUpUsers = () => {
  const loadedUsers = useLoaderData();
  const [users, setUsers] = useState(loadedUsers);
  return (
    <div>
      <h2 className="text-center font-semibold">
        Total Users: {users?.length}
      </h2>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Serial</th>
              <th>Name</th>
              <th>Email</th>
              <th>Created</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user, i) => (
              <tr key={user?._id}>
                <th>{i + 1}</th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img src={user?.photo} alt={user?.name} />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{user?.name}</div>
                      <div className="text-sm opacity-50">{user?.address}</div>
                    </div>
                  </div>
                </td>
                <td>
                  <a href={`mailto:${user?.email}`} target="_blank">
                    {user?.email}
                  </a>
                  <br />
                  <span className="badge badge-ghost badge-sm">
                    {user?.phone}
                  </span>
                </td>
                <td>
                  {new Date(user?.creationTime).toLocaleTimeString("en-US")},{" "}
                  <br /> ({new Date(user?.creationTime).toLocaleDateString()})
                </td>
                <th>
                  <button className="btn btn-ghost btn-xs">V</button>
                  <button className="btn btn-ghost btn-xs">E</button>
                  <button
                    onClick={async () => {
                      const { data } = await axios.delete(
                        `${import.meta.env.VITE_API_URL}/users/${user?._id}`
                      );

                      if (data.deletedCount) {
                        alert("Success");
                        setUsers((prev) =>
                          prev.filter((u) => u._id !== user?._id)
                        );
                      }
                    }}
                    className="btn btn-ghost btn-xs"
                  >
                    X
                  </button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SignedUpUsers;
