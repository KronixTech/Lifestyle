import { sampleProducts } from "../data/sampleProducts";

// Toggle this to true when you get the real API
const USE_REAL_API = false;

// Put their base URL here later
const BASE_URL = "https://example.com/api";

export async function getProducts() {
  if (!USE_REAL_API) {
    // mimic network delay so UI feels real
    await new Promise((r) => setTimeout(r, 300));
    return sampleProducts;
  }

  const res = await fetch(`${BASE_URL}/products`);
  if (!res.ok) throw new Error("Failed to load products");
  return res.json();
}
