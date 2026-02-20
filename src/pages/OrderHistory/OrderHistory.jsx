import { useEffect, useState } from "react";
import { fetchMyOrders, deleteOrder } from "../../services/orderService";
import Loader from "../../components/Loader/Loader";
import PageTransition from "../../components/PageTransition/PageTransition";
import formatPrice from "../../utils/formatPrice";
import useToast from "../../hooks/useToast";
import Toast from "../../components/Toast/Toast";
import "./OrderHistory.css";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { message, showToast } = useToast();

  const loadOrders = async () => {
    setLoading(true);
    try {
      const data = await fetchMyOrders();
      setOrders(data);
    } catch (error) {
      showToast("Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const handleDelete = async (orderId) => {
    if (!window.confirm("Are you sure you want to delete this order?")) {
      return;
    }
    try {
      await deleteOrder(orderId);
      showToast("Order deleted successfully");
      loadOrders();
    } catch (error) {
      showToast("Failed to delete order");
    }
  };

  return (
    <PageTransition>
      <div className="order-history">
        <h2>My Orders</h2>
        {loading ? (
          <Loader label="Loading orders" />
        ) : orders.length === 0 ? (
          <div className="empty-orders">
            <p>You haven't placed any orders yet.</p>
          </div>
        ) : (
          <div className="order-history-list">
            {orders.map((order) => (
              <div key={order._id} className="order-history-card">
                <div className="order-header">
                  <div className="order-id">
                    <span className="order-label">Order ID:</span>
                    <span className="order-value">{order._id}</span>
                  </div>
                  <span
                    className={`order-status ${order.orderStatus.toLowerCase()}`}
                  >
                    {order.orderStatus}
                  </span>
                </div>

                <div className="order-info">
                  <div className="order-detail">
                    <svg
                      className="detail-icon"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <div>
                      <p className="detail-label">Total Amount</p>
                      <p className="detail-value">
                        {formatPrice(order.totalAmount)}
                      </p>
                    </div>
                  </div>

                  <div className="order-detail">
                    <svg
                      className="detail-icon"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                      />
                    </svg>
                    <div>
                      <p className="detail-label">Payment Method</p>
                      <p className="detail-value">{order.paymentMethod}</p>
                    </div>
                  </div>

                  <div className="order-detail">
                    <svg
                      className="detail-icon"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <div>
                      <p className="detail-label">Payment Status</p>
                      <p className="detail-value">{order.paymentStatus}</p>
                    </div>
                  </div>

                  <div className="order-detail">
                    <svg
                      className="detail-icon"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <div>
                      <p className="detail-label">Order Date</p>
                      <p className="detail-value">
                        {new Date(order.createdAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                  </div>

                  <div className="order-detail full-width">
                    <svg
                      className="detail-icon"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    <div>
                      <p className="detail-label">Delivery Address</p>
                      <p className="detail-value">
                        {order.address}, {order.city} - {order.pincode}
                      </p>
                    </div>
                  </div>
                </div>

                {order.items?.length > 0 && (
                  <div className="order-items">
                    <h4>Items ({order.items.length})</h4>
                    <div className="items-grid">
                      {order.items.map((item, index) => (
                        <div key={index} className="order-item">
                          <span className="item-name">
                            {item.productName}
                            <span className="item-quantity">
                              x{item.quantity}
                            </span>
                          </span>
                          <span className="item-price">
                            {formatPrice(item.price * item.quantity)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="order-actions">
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(order._id)}
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                    Delete Order
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
        <Toast message={message} />
      </div>
    </PageTransition>
  );
};

export default OrderHistory;
