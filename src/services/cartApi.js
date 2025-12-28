import { apiClient } from "../config/apiClient";

export async function addToCart({ userId, productId, quantity = 1, size }) {

  const payload = { userId, productId, quantity, size };
  const res = await apiClient.post("/api/cart/add", payload); 
  return res.data;
}

export async function getCart(userId) {
  const res = await apiClient.get(`/api/cart/${userId}`); 
  return res.data;
}
