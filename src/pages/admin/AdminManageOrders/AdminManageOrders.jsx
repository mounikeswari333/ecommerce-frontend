import { useEffect, useState } from "react";
import {
  fetchAllOrders,
  updateOrderStatus,
} from "../../../services/orderService";
import Loader from "../../../components/Loader/Loader";
import PageTransition from "../../../components/PageTransition/PageTransition";
import formatPrice from "../../../utils/formatPrice";
import "./AdminManageOrders.css";

const AdminManageOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("all");

  const loadOrders = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchAllOrders();
      setOrders(data || []);
    } catch (err) {
      console.error("Error loading orders:", err);
      setError(
        err.response?.data?.message || err.message || "Failed to load orders",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const getStartOfToday = () => {
    const start = new Date();
    start.setHours(0, 0, 0, 0);
    return start;
  };

  const getStartOfWeek = () => {
    const start = new Date();
    const day = start.getDay();
    const diff = (day + 6) % 7;
    start.setDate(start.getDate() - diff);
    start.setHours(0, 0, 0, 0);
    return start;
  };

  const filteredOrders = orders.filter((order) => {
    if (filter === "today") {
      return new Date(order.createdAt) >= getStartOfToday();
    }
    if (filter === "week") {
      return new Date(order.createdAt) >= getStartOfWeek();
    }
    return true;
  });

  const handleStatus = async (id, status) => {
    await updateOrderStatus(id, status);
    loadOrders();
  };

  if (loading) return <Loader label="Loading orders" />;

  if (error) {
    return (
      <PageTransition>
        <div className="admin-manage-orders">
          <h2>Manage orders</h2>
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
            <button onClick={loadOrders} style={{ marginTop: "10px" }}>
              Retry
            </button>
          </div>
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <div className="admin-manage-orders">
        <div className="admin-manage-orders-header">
          <h2>Manage orders</h2>
          <div className="admin-manage-orders-filter">
            <label htmlFor="order-filter">Filter</label>
            <select
              id="order-filter"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="all">All</option>
              <option value="today">Today</option>
              <option value="week">This week</option>
            </select>
          </div>
        </div>
        <div className="admin-manage-orders-list">
          {filteredOrders.map((order) => (
            <div key={order._id} className="admin-manage-orders-card">
              <div>
                <p>
                  <strong>Customer:</strong> {order.customerName}
                </p>
                <p>
                  <strong>Total:</strong> {formatPrice(order.totalAmount)}
                </p>
                <p>
                  <strong>Payment:</strong> {order.paymentMethod}
                </p>
                <p>
                  <strong>Address:</strong> {order.address}, {order.city}{" "}
                  {order.pincode}
                </p>
                <p>
                  <strong>Payment status:</strong> {order.paymentStatus}
                </p>
                {order.items?.length ? (
                  <div className="admin-order-items">
                    <p>
                      <strong>Items:</strong>
                    </p>
                    <ul>
                      {order.items.map((item) => (
                        <li key={`${order._id}-${item.productId}`}>
                          {item.productName} x {item.quantity} ·{" "}
                          {formatPrice(item.price)}
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </div>
              <select
                value={order.orderStatus}
                onChange={(e) => handleStatus(order._id, e.target.value)}
              >
                <option value="Placed">Placed</option>
                <option value="Shipped">Shipped</option>
                <option value="Delivered">Delivered</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
          ))}
        </div>
      </div>
    </PageTransition>
  );
};

export default AdminManageOrders;
