import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";


function Dashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
  <Layout>
    <h2>Dashboard</h2>
    <p style={{ marginTop: 10 }}>You are logged in 🎉</p>

    <div style={{ marginTop: 30 }}>
      <button onClick={logout}>Logout</button>
    </div>

    <div style={{ marginTop: 20 }}>
      <a href="/admin">Go to Admin Panel</a>
    </div>
  </Layout>
);

}

export default Dashboard;
