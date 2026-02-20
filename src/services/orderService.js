import api from "./api";

export const createOrder = async (payload) => {
  const { data } = await api.post("/api/orders", payload);
  return data.order || data;
};

export const fetchMyOrders = async () => {
  const { data } = await api.get("/api/orders/myorders");
  return data;
};

export const fetchAllOrders = async () => {
  const { data } = await api.get("/api/orders");
  return data;
};

export const fetchOrderById = async (id) => {
  const { data } = await api.get(`/api/orders/${id}`);
  return data;
};

export const updateOrderStatus = async (id, status) => {
  const { data } = await api.put(`/api/orders/${id}/status`, { status });
  return data;
};

export const deleteOrder = async (id) => {
  const { data } = await api.delete(`/api/orders/${id}`);
  return data;
};
