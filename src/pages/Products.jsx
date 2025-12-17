import { useEffect, useMemo, useState } from "react";
import ProductCard from "../components/ProductCard";
import { getProducts } from "../services/productsApi";
import { FILTERS } from "../data/filtersConfig";

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

  useEffect(() => {
    getProducts().then(setProducts);
  }, []);

  function toggleFilter(type, value) {
    setFilters((prev) => {
      const exists = prev[type].includes(value);
      return {
        ...prev,
        [type]: exists
          ? prev[type].filter((v) => v !== value)
          : [...prev[type], value],
      };
    });
  }

  function clearFilter(type) {
    setFilters((prev) => ({ ...prev, [type]: [] }));
  }

  const filteredProducts = useMemo(() => {
    let list = [...products];

    // search
    if (query)
      list = list.filter((p) =>
        p.name.toLowerCase().includes(query.toLowerCase())
      );

    // category
    if (filters.category.length)
      list = list.filter((p) =>
        filters.category.includes(p.category)
      );

    // sizes
    if (filters.sizes.length)
      list = list.filter((p) =>
        p.sizes?.some((s) => filters.sizes.includes(s))
      );

    // season
    if (filters.season.length)
      list = list.filter((p) =>
        p.season?.some((s) => filters.season.includes(s))
      );

    // discount
    if (filters.discount.length)
      list = list.filter((p) =>
        filters.discount.some((d) => p.discount >= d)
      );

    // occasion
    if (filters.occasion.length)
      list = list.filter((p) =>
        p.occasion?.some((o) => filters.occasion.includes(o))
      );

    // pattern
    if (filters.pattern.length)
      list = list.filter((p) =>
        filters.pattern.includes(p.pattern)
      );

    // sorting
    if (sort === "low")
      list.sort((a, b) => a.price - b.price);
    if (sort === "high")
      list.sort((a, b) => b.price - a.price);
    if (sort === "new")
      list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    return list;
  }, [products, query, filters, sort]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">
      
      {/* FILTER SIDEBAR */}
      <aside className="space-y-6">
        <h2 className="text-lg font-extrabold">Filters</h2>

        <FilterBlock title="CATEGORY" items={FILTERS.CATEGORY}
          selected={filters.category}
          onToggle={(v) => toggleFilter("category", v)}
          onClear={() => clearFilter("category")}
        />

        <FilterBlock title="SIZES" items={FILTERS.SIZES}
          selected={filters.sizes}
          onToggle={(v) => toggleFilter("sizes", v)}
          onClear={() => clearFilter("sizes")}
        />

        <FilterBlock title="SEASON" items={FILTERS.SEASON}
          selected={filters.season}
          onToggle={(v) => toggleFilter("season", v)}
          onClear={() => clearFilter("season")}
        />

        <FilterBlock title="DISCOUNT" items={FILTERS.DISCOUNT.map(d=>`${d}% and above`)}
          selected={filters.discount.map(String)}
          onToggle={(v) => toggleFilter("discount", parseInt(v))}
          onClear={() => clearFilter("discount")}
        />

        <FilterBlock title="OCCASION" items={FILTERS.OCCASION}
          selected={filters.occasion}
          onToggle={(v) => toggleFilter("occasion", v)}
          onClear={() => clearFilter("occasion")}
        />

        <FilterBlock title="PATTERN" items={FILTERS.PATTERN}
          selected={filters.pattern}
          onToggle={(v) => toggleFilter("pattern", v)}
          onClear={() => clearFilter("pattern")}
        />
      </aside>

      {/* PRODUCTS */}
      <main>
        <div className="flex items-center justify-between mb-4">
          <input
            placeholder="Search products..."
            className="rounded-xl border px-4 py-2 w-64"
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

        <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </main>
    </div>
  );
}

function FilterBlock({ title, items, selected, onToggle, onClear }) {
  return (
    <div>
      <div className="flex justify-between mb-2">
        <h3 className="font-bold text-sm">{title}</h3>
        <button onClick={onClear} className="text-xs text-slate-500">
          Clear All
        </button>
      </div>
      <div className="space-y-2">
        {items.map((i) => (
          <label key={i} className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={selected.includes(i)}
              onChange={() => onToggle(i)}
            />
            {i}
          </label>
        ))}
      </div>
    </div>
  );
}
