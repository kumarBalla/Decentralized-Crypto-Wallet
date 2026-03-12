// Permissions.jsx
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  fetchAllUsers,
  updateUserPermission
} from "./store/store"; // import from your store
import "./Permissions.css"; // optional CSS for styling

const Permissions = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Get current user and permissions state from Redux
  const user = useSelector((state) => state.user.user);
  const { users, loading, error } = useSelector((state) => state.permissions);

  // Admin protection and fetch users
  useEffect(() => {
    if (!user) return; // wait until user is loaded
    if (user.role !== "admin") {
      navigate("/"); // redirect non-admin users
    } else {
      dispatch(fetchAllUsers());
    }
  }, [user, navigate, dispatch]);

  if (!user) return <p>Loading user...</p>; // wait until user loads
  if (user.role !== "admin") return null; // redirect handled in useEffect

  return (
    <div className="permissions-page">
      <h2>Permissions Management</h2>

      {loading && <p>Loading users...</p>}
      {error && <p className="error">{error}</p>}

      <table className="permissions-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users?.length > 0 ? (
            users.map((u) => (
              <tr key={u.userId}>
                <td>{u.userId}</td>
                <td>{u.userName}</td>
                <td>{u.email}</td>
                <td>{u.role}</td>
                <td>
                  {u.role !== "admin" && (
                    <button
                      onClick={() =>
                        dispatch(
                          updateUserPermission({ userId: u.userId, role: "admin" })
                        )
                      }
                    >
                      Make Admin
                    </button>
                  )}
                  {u.role !== "user" && (
                    <button
                      onClick={() =>
                        dispatch(
                          updateUserPermission({ userId: u.userId, role: "user" })
                        )
                      }
                    >
                      Make User
                    </button>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5}>No users found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Permissions;
