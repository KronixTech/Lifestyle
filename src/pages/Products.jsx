import { useEffect, useMemo, useState } from "react";
import ProductCard from "../components/ProductCard";
import { getProducts } from "../services/productsApi";
import { FILTERS } from "../data/filtersConfig";

const PRICE_OPTIONS = [
  { label: "Under ₹500", key: "under500" },
  { label: "₹500 - ₹1000", key: "500-1000" },
  { label: "₹1000 - ₹1500", key: "1000-1500" },
  { label: "Above ₹1500", key: "above1500" },
];

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

  // your API fields:
  const sizes = Array.isArray(p?.productsizes) ? p.productsizes : [];
  const season = p?.season ? [p.season] : [];
  const occasion = p?.productoccasion ? [p.productoccasion] : [];
  const pattern = p?.productpattern || "";
  const collections = Array.isArray(p?.collections) ? p.collections : [];

  const createdAt = p?.createdAt || p?.updatedAt || new Date().toISOString();

  return {
    id,
    name,
    image,
    price,
    mrp,
    discount,
    sizes,
    season,
    occasion,
    pattern,
    collections,
    createdAt,
    raw: p,
  };
}

function matchPriceBucket(price, bucketKey) {
  if (bucketKey === "under500") return price < 500;
  if (bucketKey === "500-1000") return price >= 500 && price <= 1000;
  if (bucketKey === "1000-1500") return price > 1000 && price <= 1500;
  if (bucketKey === "above1500") return price > 1500;
  return true;
}

export default function Products() {
  const [products, setProducts] = useState([]);
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("popular");

  const [filters, setFilters] = useState({
    
    category: [],
    price: [],
    sizes: [],
    season: [],
    discount: [],
    occasion: [],
    pattern: [],
  });

  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    let active = true;

    async function load() {
      try {
        setLoading(true);
        setErr("");

        const data = await getProducts({ limit: 200, skip: 0 });
        const list = Array.isArray(data) ? data : [];
        const normalized = list.map(normalizeApiProduct);

        if (active) setProducts(normalized);
      } catch (e) {
        if (active) setErr("Failed to load products. Please try again.");
      } finally {
        if (active) setLoading(false);
      }
    }

    load();
    return () => (active = false);
  }, []);

  function toggleFilter(type, value) {
    setFilters((prev) => {
      const exists = prev[type].includes(value);
      return {
        ...prev,
        [type]: exists ? prev[type].filter((v) => v !== value) : [...prev[type], value],
      };
    });
  }

  function clearFilter(type) {
    setFilters((prev) => ({ ...prev, [type]: [] }));
  }

  const filteredProducts = useMemo(() => {
    let list = [...products];

    // search
    if (query) {
      const q = query.toLowerCase();
      list = list.filter((p) => (p.name || "").toLowerCase().includes(q));
    }

    // CATEGORY → match collections
    if (filters.category.length) {
      list = list.filter((p) => p.collections?.some((c) => filters.category.includes(c)));
    }

    // PRICE
    if (filters.price.length) {
      list = list.filter((p) => filters.price.some((bucket) => matchPriceBucket(p.price, bucket)));
    }

    // sizes
    if (filters.sizes.length) {
      list = list.filter((p) => p.sizes?.some((s) => filters.sizes.includes(s)));
    }

    // season
    if (filters.season.length) {
      list = list.filter((p) => p.season?.some((s) => filters.season.includes(s)));
    }

    // discount
    if (filters.discount.length) {
      list = list.filter((p) => filters.discount.some((d) => (p.discount || 0) >= d));
    }

    // occasion
    if (filters.occasion.length) {
      list = list.filter((p) => p.occasion?.some((o) => filters.occasion.includes(o)));
    }

    // pattern
    if (filters.pattern.length) {
      list = list.filter((p) => filters.pattern.includes(p.pattern));
    }

    // sorting
    if (sort === "low") list.sort((a, b) => a.price - b.price);
    if (sort === "high") list.sort((a, b) => b.price - a.price);
    if (sort === "new") list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    return list;
  }, [products, query, filters, sort]);

  
  const dynamicCollections = useMemo(() => {
    const set = new Set();
    products.forEach((p) => p.collections?.forEach((c) => set.add(c)));
    return Array.from(set);
  }, [products]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">
      {/* FILTER SIDEBAR */}
      <aside className="space-y-6">
        <h2 className="text-lg font-extrabold">Filters</h2>

        {/* CATEGORY */}
        <FilterBlock
          title="CATEGORY"
          items={dynamicCollections.length ? dynamicCollections : FILTERS.CATEGORY}
          selected={filters.category}
          onToggle={(v) => toggleFilter("category", v)}
          onClear={() => clearFilter("category")}
        />

        <FilterBlock
          title="PRICE"
          items={PRICE_OPTIONS.map((p) => p.label)}
          selected={filters.price.map((k) => PRICE_OPTIONS.find((x) => x.key === k)?.label).filter(Boolean)}
          onToggle={(label) => {
            const key = PRICE_OPTIONS.find((x) => x.label === label)?.key;
            if (key) toggleFilter("price", key);
          }}
          onClear={() => clearFilter("price")}
        />

        <FilterBlock
          title="SIZES"
          items={FILTERS.SIZES}
          selected={filters.sizes}
          onToggle={(v) => toggleFilter("sizes", v)}
          onClear={() => clearFilter("sizes")}
        />

        <FilterBlock
          title="SEASON"
          items={FILTERS.SEASON}
          selected={filters.season}
          onToggle={(v) => toggleFilter("season", v)}
          onClear={() => clearFilter("season")}
        />

        <FilterBlock
          title="DISCOUNT"
          items={FILTERS.DISCOUNT.map((d) => `${d}% and above`)}
          selected={filters.discount.map(String)}
          onToggle={(v) => toggleFilter("discount", parseInt(v))}
          onClear={() => clearFilter("discount")}
        />

        <FilterBlock
          title="OCCASION"
          items={FILTERS.OCCASION}
          selected={filters.occasion}
          onToggle={(v) => toggleFilter("occasion", v)}
          onClear={() => clearFilter("occasion")}
        />

        <FilterBlock
          title="PATTERN"
          items={FILTERS.PATTERN}
          selected={filters.pattern}
          onToggle={(v) => toggleFilter("pattern", v)}
          onClear={() => clearFilter("pattern")}
        />
      </aside>

      {/* PRODUCTS */}
      <main>
        <div className="flex items-center justify-between mb-4 gap-3">
          <input
            placeholder="Search products..."
            className="rounded-xl border px-4 py-2 w-full max-w-xs"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />

          <select
            className="rounded-xl border px-4 py-2"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="popular">Popular</option>
            <option value="low">Price: Low to High</option>
            <option value="high">Price: High to Low</option>
            <option value="new">Newest First</option>
          </select>
        </div>

        {loading && (
          <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 12 }).map((_, i) => (
              <div
                key={i}
                className="h-[320px] rounded-3xl border border-slate-200 bg-white animate-pulse"
              />
            ))}
          </div>
        )}

        {!loading && err && (
          <div className="rounded-3xl border border-slate-200 bg-white p-6 text-sm text-slate-700">
            {err}
          </div>
        )}

        {!loading && !err && (
          <>
            {filteredProducts.length === 0 ? (
              <div className="rounded-3xl border border-slate-200 bg-white p-8 text-sm text-slate-700">
                No products found for your filter/search.
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}

function FilterBlock({ title, items, selected, onToggle, onClear }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex justify-between mb-2">
        <h3 className="font-extrabold text-sm">{title}</h3>
        <button onClick={onClear} className="text-xs text-slate-500 hover:text-slate-900">
          Clear All
        </button>
      </div>

      <div className="space-y-2">
        {items.map((i) => (
          <label key={i} className="flex items-center gap-2 text-sm text-slate-700">
            <input
              type="checkbox"
              checked={selected.includes(i) || selected.includes(String(i))}
              onChange={() => onToggle(i)}
              className="h-4 w-4"
            />
            {i}
          </label>
        ))}
      </div>
    </div>
  );
}
