import { useLoaderData } from "react-router";

const UserDetails = () => {
  const user = useLoaderData();
  const { _id, name, email } = user;
  return (
    <div>
      <h2>Details of {name}</h2>
      <p>
        Id: {_id}, email: {email}
      </p>
    </div>
  );
};

export default UserDetails;
