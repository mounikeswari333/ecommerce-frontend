import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import { useTheme } from "../../context/ThemeContext";
import { CgProfile } from "react-icons/cg";
import "./Navbar.css";

const Navbar = () => {
  const { user, logout } = useAuth();
  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="navbar">
      <Link to="/" className="navbar-logo">
        NovaCart
      </Link>
      <nav className="navbar-links">
        <NavLink to="/products">Shop</NavLink>
        <NavLink to="/wishlist">Wishlist ({wishlistCount})</NavLink>
        <NavLink to="/cart">Cart ({cartCount})</NavLink>
        {user && <NavLink to="/orders">My Orders</NavLink>}
        {!user && <NavLink to="/login">Login</NavLink>}
        {user?.role === "admin" && <NavLink to="/admin">Admin</NavLink>}
      </nav>
      <div className="navbar-actions">
        <button
          type="button"
          className="navbar-theme-toggle"
          onClick={toggleTheme}
        >
          {theme === "dark" ? "Light" : "Dark"}
        </button>
        {user && (
          <>
            <Link to="/profile" className="navbar-profile-icon" title="Profile">
              <CgProfile />
            </Link>
            <button type="button" className="navbar-logout" onClick={logout}>
              Logout
            </button>
          </>
        )}
      </div>
    </header>
  );
};

export default Navbar;
