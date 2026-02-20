import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useAuth } from "./AuthContext";
import {
  addItem,
  getCart,
  removeItem,
  updateItem,
} from "../services/cartService";
import dummyProducts from "../data/dummyProducts";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { token } = useAuth();
  const [items, setItems] = useState([]);

  const loadLocalCart = () => {
    const stored = localStorage.getItem("nc_cart");
    return stored ? JSON.parse(stored) : [];
  };

  const saveLocalCart = (nextItems) => {
    localStorage.setItem("nc_cart", JSON.stringify(nextItems));
  };

  const fetchCart = async () => {
    if (!token) {
      setItems(loadLocalCart());
      return;
    }
    const data = await getCart();
    setItems(data.items || []);
  };

  useEffect(() => {
    fetchCart();
  }, [token]);

  const addToCart = async (product, qty = 1) => {
    const productId = typeof product === "string" ? product : product?._id;
    if (!productId) return;

    if (token) {
      try {
        const data = await addItem(productId, qty);
        setItems(data.items || []);
        return;
      } catch (error) {
        // Fallback to local cart if API fails.
      }
    }

    const baseProduct =
      typeof product === "string"
        ? dummyProducts.find((item) => item._id === productId)
        : product;
    if (!baseProduct) return;

    const current = loadLocalCart();
    const existing = current.find((item) => item.product === productId);
    if (existing) {
      existing.qty += Number(qty || 1);
    } else {
      current.push({
        product: productId,
        name: baseProduct.name,
        image: baseProduct.image?.url || baseProduct.image,
        price: baseProduct.price,
        qty: Number(qty || 1),
      });
    }
    saveLocalCart(current);
    setItems(current);
  };

  const updateQty = async (productId, qty) => {
    if (token) {
      try {
        const data = await updateItem(productId, qty);
        setItems(data.items || []);
        return;
      } catch (error) {
        // Fallback to local cart if API fails.
      }
    }

    const current = loadLocalCart();
    const item = current.find((entry) => entry.product === productId);
    if (item) item.qty = Number(qty || 1);
    saveLocalCart(current);
    setItems(current);
  };

  const removeFromCart = async (productId) => {
    if (token) {
      try {
        const data = await removeItem(productId);
        setItems(data.items || []);
        return;
      } catch (error) {
        // Fallback to local cart if API fails.
      }
    }

    const current = loadLocalCart().filter(
      (entry) => entry.product !== productId,
    );
    saveLocalCart(current);
    setItems(current);
  };

  const cartCount = useMemo(
    () => items.reduce((sum, item) => sum + item.qty, 0),
    [items],
  );

  const total = useMemo(
    () => items.reduce((sum, item) => sum + item.qty * item.price, 0),
    [items],
  );

  const clearCart = () => {
    localStorage.removeItem("nc_cart");
    setItems([]);
  };

  return (
    <CartContext.Provider
      value={{
        items,
        cartCount,
        total,
        addToCart,
        updateQty,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
