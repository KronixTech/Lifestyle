import { createContext, useContext, useEffect, useMemo, useState } from "react";

const WishlistContext = createContext(null);

const STORAGE_KEY = "lifestyle_wishlist_v1";

export function WishlistProvider({ children }) {
  const [likedMap, setLikedMap] = useState({}); // { [productId]: productObject }

  // Load from localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setLikedMap(JSON.parse(raw));
    } catch {
      // ignore
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(likedMap));
    } catch {
      // ignore
    }
  }, [likedMap]);

  const likedList = useMemo(() => Object.values(likedMap), [likedMap]);
  const likedCount = likedList.length;

  function isLiked(id) {
    return Boolean(likedMap?.[id]);
  }

  function addToWishlist(product) {
    if (!product?.id) return;
    setLikedMap((prev) => ({ ...prev, [product.id]: product }));
  }

  function removeFromWishlist(productId) {
    setLikedMap((prev) => {
      const copy = { ...prev };
      delete copy[productId];
      return copy;
    });
  }

  function toggleWishlist(product) {
    if (!product?.id) return;
    setLikedMap((prev) => {
      const exists = Boolean(prev[product.id]);
      if (exists) {
        const copy = { ...prev };
        delete copy[product.id];
        return copy;
      }
      return { ...prev, [product.id]: product };
    });
  }

  function clearWishlist() {
    setLikedMap({});
  }

  const value = useMemo(
    () => ({
      likedList,
      likedCount,
      isLiked,
      addToWishlist,
      removeFromWishlist,
      toggleWishlist,
      clearWishlist,
    }),
    [likedList, likedCount, likedMap]
  );

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used inside WishlistProvider");
  return ctx;
}
