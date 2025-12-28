import { apiClient } from "../config/apiClient";

export async function fetchProducts({ collection, limit = 20, skip = 0 } = {}) {
  const params = {};
  if (collection) params.collection = collection;
  if (typeof limit === "number") params.limit = limit;
  if (typeof skip === "number") params.skip = skip;

  const res = await apiClient.get("/api", { params });

  return res.data;
}

export const getProducts = fetchProducts;
