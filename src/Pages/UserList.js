import React, { useContext, useEffect } from "react";
import Spinner from "../components/Spinner";
import UserContext from "../store/user/User-Context";

const UserList = () => {
  const UserCtx = useContext(UserContext);
  const { fetchUsers, users, loading, token } = UserCtx;

  useEffect(() => {
    if (token) {
      fetchUsers(token);
    }
  }, [fetchUsers, token]);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
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
                  <td>{idx + 1}</td>
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
      )}
    </>
  );
};

export default UserList;
