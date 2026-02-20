import api from "./api";

export const getCart = async () => {
  const { data } = await api.get("/api/cart");
  return data;
};

export const addItem = async (productId, qty) => {
  const { data } = await api.post("/api/cart/add", { productId, qty });
  return data;
};

export const updateItem = async (productId, qty) => {
  const { data } = await api.put("/api/cart/update", { productId, qty });
  return data;
};

export const removeItem = async (productId) => {
  const { data } = await api.delete("/api/cart/remove", {
    data: { productId },
  });
  return data;
};
