import { createContext, useContext, useEffect, useMemo, useState } from "react";

const CartContext = createContext(null);
const STORAGE_KEY = "lifestyle_cart_v2";

function makeKey(productId, size) {
  return `${productId}__${size || "NA"}`;
}

export function CartProvider({ children }) {
  // { [key]: { key, productId, size, product, qty } }
  const [itemsMap, setItemsMap] = useState({});

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setItemsMap(JSON.parse(raw));
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(itemsMap));
    } catch {}
  }, [itemsMap]);

  const items = useMemo(() => Object.values(itemsMap), [itemsMap]);

  const cartCount = useMemo(
    () => items.reduce((sum, it) => sum + (it.qty || 0), 0),
    [items]
  );

  const subtotal = useMemo(
    () =>
      items.reduce((sum, it) => {
        const price = Number(it?.product?.price || 0);
        return sum + price * (it.qty || 0);
      }, 0),
    [items]
  );

  /**
   * Add to cart (size-aware)
   * addToCart(product, 1, "M")
   */
  function addToCart(product, qty = 1, size) {
    if (!product?.id) return;

    const key = makeKey(product.id, size);
    setItemsMap((prev) => {
      const existing = prev[key];
      const nextQty = (existing?.qty || 0) + qty;

      return {
        ...prev,
        [key]: {
          key,
          productId: product.id,
          size: size || null,
          product,
          qty: nextQty,
        },
      };
    });
  }

  /**
   * Remove item by cart item key
   */
  function removeFromCart(itemKey) {
    setItemsMap((prev) => {
      const copy = { ...prev };
      delete copy[itemKey];
      return copy;
    });
  }

  /**
   * Update qty by item key
   */
  function updateQty(itemKey, qty) {
    setItemsMap((prev) => {
      if (qty <= 0) {
        const copy = { ...prev };
        delete copy[itemKey];
        return copy;
      }
      const existing = prev[itemKey];
      if (!existing) return prev;
      return { ...prev, [itemKey]: { ...existing, qty } };
    });
  }

  function clearCart() {
    setItemsMap({});
  }

  // Helper: check if an item exists
  function hasItem(productId, size) {
    const key = makeKey(productId, size);
    return Boolean(itemsMap[key]);
  }

  const value = useMemo(
    () => ({
      items,
      cartCount,
      subtotal,
      addToCart,
      removeFromCart,
      updateQty,
      clearCart,
      hasItem,
    }),
    [items, cartCount, subtotal, itemsMap]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
