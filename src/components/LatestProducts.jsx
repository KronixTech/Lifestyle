import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";
import { getProducts } from "../services/productsApi";

function normalizeApiProduct(p) {
  const id = p?._id;

  const name = p?.productname || "Product";
  const price = Number(p?.offerprice && p.offerprice > 0 ? p.offerprice : p?.productprice ?? 0);
  const mrp =
    p?.offerprice && Number(p.offerprice) > 0
      ? Number(p.productprice ?? 0)
      : null;

  const image =
    p?.productImages?.[0]?.url ||
    "https://via.placeholder.com/600x750?text=Product";

  const discount =
    mrp && mrp > price ? Math.round(((mrp - price) / mrp) * 100) : 0;

  return {
    id,
    name,
    image,
    price,
    mrp,
    discount,
    // for filters/pages 
    sizes: Array.isArray(p?.productsizes) ? p.productsizes : [],
    season: p?.season ? [p.season] : [],
    occasion: p?.productoccasion ? [p.productoccasion] : [],
    pattern: p?.productpattern || "",
    collections: Array.isArray(p?.collections) ? p.collections : [],
    createdAt: p?.createdAt,
    raw: p,
  };
}

export default function LatestProducts() {
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const [products, setProducts] = useState([]);

  useEffect(() => {
    let active = true;

    async function load() {
      try {
        setLoading(true);
        setErr("");

        const data = await getProducts({ limit: 50, skip: 0 });
        const list = Array.isArray(data) ? data : [];

        const normalized = list.map(normalizeApiProduct);

        const latestOnly = normalized.filter((p) =>
          p.collections?.includes("Latest Products")
        );

        if (active) setProducts(latestOnly);
      } catch (e) {
        if (active) setErr("Could not load products. Please try again.");
      } finally {
        if (active) setLoading(false);
      }
    }

    load();
    return () => (active = false);
  }, []);

  const visible = useMemo(() => products.slice(0, 12), [products]);

  return (
    <section className="mx-auto max-w-7xl px-4 mt-10">
      <div className="flex items-end justify-between gap-3">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900">Latest Products</h2>
          <p className="mt-1 text-sm text-slate-600">
            Fresh drops from the latest collection.
          </p>
        </div>

        <Link
          to="/products"
          className="rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-900 hover:bg-slate-50"
        >
          View All
        </Link>
      </div>

      {loading && (
        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="h-[320px] rounded-3xl border border-slate-200 bg-white animate-pulse" />
          ))}
        </div>
      )}

      {!loading && err && (
        <div className="mt-6 rounded-3xl border border-slate-200 bg-white p-6 text-sm text-slate-700">
          {err}
        </div>
      )}

      {!loading && !err && (
        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {visible.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </section>
  );
}
