import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useAuth } from "./AuthContext";
import {
  getWishlist,
  addWishlistItem,
  removeWishlistItem,
} from "../services/wishlistService";
import dummyProducts from "../data/dummyProducts";

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const { token } = useAuth();
  const [products, setProducts] = useState([]);

  const loadLocalWishlist = () => {
    const stored = localStorage.getItem("nc_wishlist");
    return stored ? JSON.parse(stored) : [];
  };

  const saveLocalWishlist = (nextItems) => {
    localStorage.setItem("nc_wishlist", JSON.stringify(nextItems));
  };

  const fetchWishlist = async () => {
    if (!token) {
      setProducts(loadLocalWishlist());
      return;
    }
    const data = await getWishlist();
    setProducts(data.products || []);
  };

  useEffect(() => {
    fetchWishlist();
  }, [token]);

  const addToWishlist = async (product) => {
    const productId = typeof product === "string" ? product : product?._id;
    if (!productId) return;

    if (token) {
      try {
        const data = await addWishlistItem(productId);
        setProducts(data.products || []);
        return;
      } catch (error) {
        // Fallback to local wishlist if API fails.
      }
    }

    const baseProduct =
      typeof product === "string"
        ? dummyProducts.find((item) => item._id === productId)
        : product;
    if (!baseProduct) return;

    const current = loadLocalWishlist();
    if (!current.some((item) => item._id === productId)) {
      current.push(baseProduct);
    }
    saveLocalWishlist(current);
    setProducts(current);
  };

  const removeFromWishlist = async (product) => {
    const productId = typeof product === "string" ? product : product?._id;
    if (!productId) return;

    if (token) {
      try {
        const data = await removeWishlistItem(productId);
        setProducts(data.products || []);
        return;
      } catch (error) {
        // Fallback to local wishlist if API fails.
      }
    }

    const current = loadLocalWishlist().filter(
      (item) => item._id !== productId,
    );
    saveLocalWishlist(current);
    setProducts(current);
  };

  const wishlistCount = useMemo(() => products.length, [products]);

  return (
    <WishlistContext.Provider
      value={{ products, wishlistCount, addToWishlist, removeFromWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);
