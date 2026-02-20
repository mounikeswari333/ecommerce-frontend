import api from "./api";

export const getWishlist = async () => {
  const { data } = await api.get("/api/wishlist");
  return data;
};

export const addWishlistItem = async (productId) => {
  const { data } = await api.post("/api/wishlist/add", { productId });
  return data;
};

export const removeWishlistItem = async (productId) => {
  const { data } = await api.delete("/api/wishlist/remove", {
    data: { productId },
  });
  return data;
};
