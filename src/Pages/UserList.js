import React, { useContext, useEffect } from "react";
import UserContext from "../store/user/User-Context";

const UserList = () => {
  const UserCtx = useContext(UserContext);
  const { fetchUsers, users } = UserCtx;

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return (
    <table className="table">
      <thead>
        <tr>
          <th>Serial</th>
          <th>Image</th>
          <th>Name</th>
        </tr>
      </thead>
      <tbody>
        {users &&
          users.map((user, idx) => (
            <tr key={idx}>
              <td>{idx}</td>
              <td>
                <img
                  src={process.env.REACT_APP_BASE_URL + "/" + user.image}
                  alt={user.username}
                />
              </td>
              <td>{user.username}</td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};

export default UserList;
