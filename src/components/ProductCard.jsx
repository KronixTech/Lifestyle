import { Heart, ShoppingBag, Star } from "lucide-react";

function pctOff(price, mrp) {
  if (!mrp || mrp <= price) return 0;
  return Math.round(((mrp - price) / mrp) * 100);
}

export default function ProductCard({ product, onLike, onAdd }) {
  const off = pctOff(product.price, product.mrp);

  return (
    <div className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:shadow-xl">
      {/* Image */}
      <div className="relative aspect-[4/5] overflow-hidden bg-slate-100">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
          loading="lazy"
          draggable="false"
        />

        {/* Badge */}
        {product.badge && (
          <div className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-slate-900 shadow backdrop-blur">
            {product.badge}
          </div>
        )}

        {/* Discount */}
        {off > 0 && (
          <div className="absolute right-3 top-3 rounded-full bg-slate-900 px-3 py-1 text-xs font-bold text-white shadow">
            {off}% OFF
          </div>
        )}

        {/* Hover actions */}
        <div className="pointer-events-none absolute inset-x-3 bottom-3 flex translate-y-3 items-center gap-2 opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <button
            onClick={() => onAdd?.(product)}
            className="pointer-events-auto flex-1 rounded-2xl bg-slate-900 px-3 py-2 text-sm font-semibold text-white hover:bg-slate-800 active:scale-[0.99]"
          >
            <span className="inline-flex items-center justify-center gap-2">
              <ShoppingBag className="h-4 w-4" /> Add
            </span>
          </button>
          <button
            onClick={() => onLike?.(product)}
            className="pointer-events-auto rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-900 hover:bg-slate-50 active:scale-[0.99]"
            aria-label="Like product"
          >
            <Heart className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <p className="text-xs font-semibold text-slate-500">{product.category}</p>
        <h3 className="mt-1 line-clamp-1 text-sm font-extrabold text-slate-900">
          {product.name}
        </h3>

        <div className="mt-2 flex items-center justify-between">
          <div className="flex items-end gap-2">
            <p className="text-base font-extrabold text-slate-900">₹{product.price}</p>
            {product.mrp && (
              <p className="text-sm text-slate-500 line-through">₹{product.mrp}</p>
            )}
          </div>

          <div className="flex items-center gap-1 text-xs font-semibold text-slate-700">
            <Star className="h-4 w-4" />
            <span>{product.rating}</span>
            <span className="text-slate-400">({product.reviews})</span>
          </div>
        </div>
      </div>
    </div>
  );
}
