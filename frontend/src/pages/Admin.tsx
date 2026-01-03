import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiFetch } from "../utils/api";

interface User {
  id: string;
  email: string;
  role: string;
  isActive: boolean;
}

function Admin() {
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUsers();
    // eslint-disable-next-line
  }, []);

  const loadUsers = async () => {
    const res = await apiFetch("/admin/users");

    // 🔐 Backend decides admin access
    if (res.status === 401 || res.status === 403) {
      navigate("/dashboard");
      return;
    }

    const data = await res.json();
    setUsers(data);
    setLoading(false);
  };

  const toggleUser = async (id: string, isActive: boolean) => {
    await apiFetch(
      `/admin/users/${id}/${isActive ? "deactivate" : "activate"}`,
      { method: "PATCH" }
    );

    loadUsers();
  };

  if (loading) return <p>Loading users...</p>;

  return (
    <div style={{ padding: 30 }}>
      <h2>Admin Panel</h2>

      <table border={1} cellPadding={10}>
        <thead>
          <tr>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td>{u.email}</td>
              <td>{u.role}</td>
              <td>{u.isActive ? "Active" : "Inactive"}</td>
              <td>
                <button onClick={() => toggleUser(u.id, u.isActive)}>
                  {u.isActive ? "Deactivate" : "Activate"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Admin;
