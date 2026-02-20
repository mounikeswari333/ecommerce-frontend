import api from "./api";

export const sendChatMessage = async (message) => {
  const { data } = await api.post("/api/chat", { message });
  return data;
};
