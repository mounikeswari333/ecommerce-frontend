import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { createOrder } from "../../services/orderService";
import PageTransition from "../../components/PageTransition/PageTransition";
import formatPrice from "../../utils/formatPrice";
import "./Checkout.css";

const Checkout = () => {
  const { items, total, clearCart } = useCart();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
    paymentMethod: "cod",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const orderItems = items.map((item) => ({
        productId: item.product,
        productName: item.name,
        price: item.price,
        quantity: item.qty,
      }));
      const order = await createOrder({
        customerName: form.fullName,
        phone: form.phone,
        address: form.address,
        city: form.city,
        pincode: form.pincode,
        paymentMethod: form.paymentMethod,
        items: orderItems,
        totalAmount: total,
        paymentStatus: "Success",
        orderStatus: "Placed",
        createdAt: new Date().toISOString(),
      });
      clearCart();
      navigate(`/payment-success/${order._id}`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <PageTransition>
      <div className="checkout-page">
        <h2>Checkout</h2>
        <div className="checkout-layout">
          <form className="checkout-form" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Full name"
              value={form.fullName}
              onChange={(e) => setForm({ ...form, fullName: e.target.value })}
              required
            />
            <input
              type="tel"
              placeholder="Phone number"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              required
            />
            <input
              type="text"
              placeholder="Address"
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
              required
            />
            <input
              type="text"
              placeholder="City"
              value={form.city}
              onChange={(e) => setForm({ ...form, city: e.target.value })}
              required
            />
            <input
              type="text"
              placeholder="Pincode"
              value={form.pincode}
              onChange={(e) => setForm({ ...form, pincode: e.target.value })}
              required
            />
            <select
              value={form.paymentMethod}
              onChange={(e) =>
                setForm({ ...form, paymentMethod: e.target.value })
              }
            >
              <option value="cod">Cash on Delivery</option>
              <option value="online">Online Payment (mock)</option>
            </select>
            <button className="button" type="submit">
              Place order
            </button>
          </form>
          <div className="checkout-summary">
            <h3>Order summary</h3>
            {items.map((item) => (
              <div key={item.product} className="checkout-line">
                <span>{item.name}</span>
                <span>{formatPrice(item.price * item.qty)}</span>
              </div>
            ))}
            <div className="checkout-total">
              <strong>Total</strong>
              <strong>{formatPrice(total)}</strong>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Checkout;
