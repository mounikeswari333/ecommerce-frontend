import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import PageTransition from "../../components/PageTransition/PageTransition";
import formatPrice from "../../utils/formatPrice";
import "./Cart.css";

const Cart = () => {
  const { items, total, updateQty, removeFromCart } = useCart();

  if (items.length === 0) {
    return (
      <PageTransition>
        <div className="cart-empty">
          <h2>Your cart is empty</h2>
          <Link className="button" to="/products">
            Go shopping
          </Link>
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <div className="cart-page">
        <h2>Your cart</h2>
        <div className="cart-items">
          {items.map((item) => (
            <div key={item.product} className="cart-item">
              <div className="cart-image" aria-hidden="true">
                <img src={item.image} alt={item.name} />
                <span className="cart-image-label">{item.name}</span>
              </div>
              <div className="cart-item-info">
                <h4>{item.name}</h4>
                <p>{formatPrice(item.price)}</p>
                <span className="cart-line-total">
                  {formatPrice(item.price * item.qty)}
                </span>
              </div>
              <div className="cart-qty">
                <label htmlFor={`qty-${item.product}`}>Qty</label>
                <input
                  id={`qty-${item.product}`}
                  type="number"
                  min="1"
                  value={item.qty}
                  onChange={(e) => updateQty(item.product, e.target.value)}
                />
              </div>
              <button
                className="cart-remove"
                type="button"
                onClick={() => removeFromCart(item.product)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
        <div className="cart-summary">
          <div>
            <p className="cart-summary-label">Total</p>
            <h3>{formatPrice(total)}</h3>
          </div>
          <div className="cart-summary-actions">
            <Link className="button" to="/checkout">
              Proceed to checkout
            </Link>
            <Link className="button secondary" to="/products">
              Back to shopping
            </Link>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Cart;
