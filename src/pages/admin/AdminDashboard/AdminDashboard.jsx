import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchStats } from "../../../services/adminService";
import Loader from "../../../components/Loader/Loader";
import PageTransition from "../../../components/PageTransition/PageTransition";
import formatPrice from "../../../utils/formatPrice";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchStats();
        console.log("Admin stats received:", data);
        setStats(data);
      } catch (err) {
        console.error("Error loading admin stats:", err);
        setError(
          err.response?.data?.message || err.message || "Failed to load stats",
        );
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) return <Loader label="Loading dashboard" />;

  if (error) {
    return (
      <PageTransition>
        <div className="admin-dashboard">
          <h2>Admin Dashboard</h2>
          <div
            className="error-message"
            style={{
              padding: "20px",
              background: "#fee",
              color: "#c33",
              borderRadius: "8px",
            }}
          >
            <p>
              <strong>Error:</strong> {error}
            </p>
            <p>Make sure you are logged in as an admin user.</p>
            <p>Admin credentials: admin@ecommerce.com / admin123</p>
          </div>
        </div>
      </PageTransition>
    );
  }

  if (!stats) {
    return (
      <PageTransition>
        <div className="admin-dashboard">
          <h2>Admin Dashboard</h2>
          <p>No stats available</p>
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <div className="admin-dashboard">
        <h2>Admin dashboard</h2>
        <div className="admin-dashboard-stats">
          <div className="admin-dashboard-card">
            <p>Total orders</p>
            <h3>{stats.totalOrders}</h3>
          </div>
          <div className="admin-dashboard-card">
            <p>Total revenue</p>
            <h3>{formatPrice(stats.totalRevenue)}</h3>
          </div>
          <div className="admin-dashboard-card">
            <p>Today revenue</p>
            <h3>{formatPrice(stats.todayRevenue)}</h3>
          </div>
        </div>
        <div className="admin-dashboard-links">
          <Link to="/admin/products" className="button">
            Manage products
          </Link>
          <Link to="/admin/products/new" className="button secondary">
            Add new product
          </Link>
          <Link to="/admin/orders" className="button">
            Manage orders
          </Link>
        </div>
      </div>
    </PageTransition>
  );
};

export default AdminDashboard;
