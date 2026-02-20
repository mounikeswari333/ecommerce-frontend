import api from "./api";

export const registerUser = async (formData) => {
  const { data } = await api.post("/api/auth/register", formData);
  return data;
};

export const loginUser = async (formData) => {
  const { data } = await api.post("/api/auth/login", formData);
  return data;
};
