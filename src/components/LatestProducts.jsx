import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, ArrowUpRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ProductCard from "./ProductCard";
import { getProducts } from "../services/productsApi";

export default function LatestProducts() {
  const navigate = useNavigate();
  const scrollerRef = useRef(null);

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  function scrollBy(px) {
    scrollerRef.current?.scrollBy({ left: px, behavior: "smooth" });
  }

  useEffect(() => {
    let mounted = true;

    async function load() {
      try {
        setLoading(true);
        setError("");
        const data = await getProducts();

        // data might be { products: [...] } depending on API
        const list = Array.isArray(data) ? data : data?.products || [];

        if (mounted) setProducts(list);
      } catch (e) {
        if (mounted) setError(e?.message || "Failed to load products");
      } finally {
        if (mounted) setLoading(false);
      }
    }

    load();
    return () => {
      mounted = false;
    };
  }, []);

  function onLike(p) {
    console.log("Liked:", p);
    alert(`Liked ✅: ${p.name}`);
  }

  function onAdd(p) {
    console.log("Added to cart:", p);
    alert(`Added to cart ✅: ${p.name}`);
  }

  return (
    <section className="mx-auto max-w-7xl px-4 mt-10">
      {/* Header */}
      <div className="flex items-end justify-between gap-3">
        <div>
          <p className="text-xs font-semibold tracking-widest text-slate-500">
            THIS WEEK
          </p>
          <h2 className="mt-1 text-2xl font-extrabold text-slate-900">
            Latest Products
          </h2>
          <p className="mt-1 text-sm text-slate-600">
            Fresh picks you’ll actually want to wear.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => scrollBy(-380)}
            className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm hover:bg-slate-50 active:scale-95 disabled:opacity-50"
            aria-label="Scroll left"
            disabled={loading || products.length === 0}
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <button
            onClick={() => scrollBy(380)}
            className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm hover:bg-slate-50 active:scale-95 disabled:opacity-50"
            aria-label="Scroll right"
            disabled={loading || products.length === 0}
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          <button
            onClick={() => navigate("/products")}
            className="ml-2 hidden sm:inline-flex items-center gap-2 rounded-2xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white shadow-lg hover:bg-slate-800 active:scale-[0.99]"
          >
            View All <ArrowUpRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Content states */}
      {loading && (
        <div className="mt-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-semibold text-slate-800">Loading products…</p>
          <p className="mt-1 text-sm text-slate-600">
            Please wait while we fetch the latest items.
          </p>

          {/* simple skeleton row */}
          <div className="mt-5 flex gap-4 overflow-hidden">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="w-[240px] sm:w-[260px] md:w-[280px] shrink-0 rounded-3xl border border-slate-200 bg-slate-50"
              >
                <div className="aspect-[4/5] animate-pulse bg-slate-200/60" />
                <div className="p-4">
                  <div className="h-3 w-20 animate-pulse rounded bg-slate-200/60" />
                  <div className="mt-3 h-4 w-44 animate-pulse rounded bg-slate-200/60" />
                  <div className="mt-4 h-4 w-28 animate-pulse rounded bg-slate-200/60" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {!loading && error && (
        <div className="mt-6 rounded-3xl border border-red-200 bg-red-50 p-6">
          <p className="text-sm font-bold text-red-700">Couldn’t load products</p>
          <p className="mt-1 text-sm text-red-700/90">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 rounded-2xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white"
          >
            Retry
          </button>
        </div>
      )}

      {!loading && !error && products.length === 0 && (
        <div className="mt-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-bold text-slate-900">No products found</p>
          <p className="mt-1 text-sm text-slate-600">
            Once the API has products, they will appear here automatically.
          </p>
        </div>
      )}

      {/* Slider */}
      {!loading && !error && products.length > 0 && (
        <div className="relative mt-6">
          <div
            ref={scrollerRef}
            className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {products.map((p) => (
              <div
                key={p.id}
                className="w-[240px] sm:w-[260px] md:w-[280px] snap-start"
              >
                <ProductCard product={p} onLike={onLike} onAdd={onAdd} />
              </div>
            ))}
          </div>

          {/* Mobile View All */}
          <button
            onClick={() => navigate("/products")}
            className="mt-2 w-full sm:hidden rounded-2xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white"
          >
            View All Products
          </button>
        </div>
      )}
    </section>
  );
}
