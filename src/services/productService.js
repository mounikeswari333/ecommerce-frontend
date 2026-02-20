import api from "./api";

export const fetchProducts = async (params) => {
  const { data } = await api.get("/api/products", { params });
  return data;
};

export const fetchProduct = async (id) => {
  const { data } = await api.get(`/api/products/${id}`);
  return data;
};

export const createProduct = async (formData) => {
  const { data } = await api.post("/api/products", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
};

export const updateProduct = async (id, formData) => {
  const { data } = await api.put(`/api/products/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
};

export const deleteProduct = async (id) => {
  const { data } = await api.delete(`/api/products/${id}`);
  return data;
};
