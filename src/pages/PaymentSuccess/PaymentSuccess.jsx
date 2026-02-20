import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import PageTransition from "../../components/PageTransition/PageTransition";
import Loader from "../../components/Loader/Loader";
import { fetchOrderById } from "../../services/orderService";
import formatPrice from "../../utils/formatPrice";
import "./PaymentSuccess.css";

const PaymentSuccess = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchOrderById(id);
        setOrder(data);
      } catch (error) {
        console.error(error);
      }
    };
    load();
  }, [id]);

  if (!order) return <Loader label="Loading order" />;

  const totalAmount = order.totalAmount;
  const address = order.address || "";
  const city = order.city || "";
  const pincode = order.pincode || "";
  const fullName = order.customerName || "Customer";
  const phone = order.phone || "";

  return (
    <PageTransition>
      <div className="payment-success-container">
        <motion.div
          className="payment-success-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="success-icon">
            <motion.svg
              viewBox="0 0 52 52"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            >
              <circle className="success-circle" cx="26" cy="26" r="25" />
              <motion.path
                className="success-check"
                d="M14.1 27.2l7.1 7.2 16.7-16.8"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              />
            </motion.svg>
          </div>

          <h1 className="success-title">Payment Successful!</h1>
          <p className="success-subtitle">
            Your order has been placed successfully
          </p>

          <div className="order-details-box">
            <div className="detail-row">
              <span className="detail-label">Order ID</span>
              <span className="detail-value">{order._id}</span>
            </div>
            <div className="detail-row highlight">
              <span className="detail-label">Amount Paid</span>
              <span className="detail-value amount">
                {formatPrice(totalAmount)}
              </span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Customer Name</span>
              <span className="detail-value">{fullName}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Phone</span>
              <span className="detail-value">{phone}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Delivery Address</span>
              <span className="detail-value">
                {address}, {city} - {pincode}
              </span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Order Date</span>
              <span className="detail-value">
                {new Date(order.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Payment Status</span>
              <span className="detail-value">
                <span className="status-badge">{order.paymentStatus}</span>
              </span>
            </div>
          </div>

          {order.items?.length > 0 && (
            <div className="order-items-section">
              <h3>Order Items</h3>
              <div className="items-list">
                {order.items.map((item, index) => (
                  <div key={index} className="item-row">
                    <span className="item-name">
                      {item.productName}{" "}
                      <span className="item-qty">x{item.quantity}</span>
                    </span>
                    <span className="item-price">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="success-actions">
            <Link to="/" className="button primary">
              Continue Shopping
            </Link>
            <Link to="/orders" className="button secondary">
              View My Orders
            </Link>
          </div>
        </motion.div>
      </div>
    </PageTransition>
  );
};

export default PaymentSuccess;
