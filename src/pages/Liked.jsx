import { useNavigate } from "react-router-dom";
import { ArrowLeft, HeartOff, Trash2 } from "lucide-react";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";

export default function Liked() {
  const navigate = useNavigate();

  const { likedList, likedCount, removeFromWishlist, clearWishlist } =
    useWishlist();

  const { addToCart } = useCart();

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900">
            Liked Products
          </h1>
          <p className="mt-1 text-sm text-slate-600">
            You have <span className="font-semibold">{likedCount}</span> liked
            item(s).
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold hover:bg-slate-50"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </button>

          {likedCount > 0 && (
            <button
              onClick={clearWishlist}
              className="inline-flex items-center gap-2 rounded-2xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
            >
              <Trash2 className="h-4 w-4" /> Clear All
            </button>
          )}
        </div>
      </div>

      {likedCount === 0 ? (
        <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-sm">
          <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-slate-900 text-white">
            <HeartOff className="h-6 w-6" />
          </div>
          <h2 className="mt-4 text-lg font-extrabold text-slate-900">
            No liked products
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Tap the heart icon on any product to save it here.
          </p>
          <button
            onClick={() => navigate("/products")}
            className="mt-6 rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800"
          >
            Browse Products
          </button>
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {likedList.map((p) => (
            <div
              key={p.id}
              className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm"
            >
              <div className="relative aspect-[4/5] bg-slate-100">
                <img
                  src={p.image}
                  alt={p.name}
                  className="h-full w-full object-cover"
                  loading="lazy"
                  draggable="false"
                />

                <button
                  onClick={() => removeFromWishlist(p.id)}
                  className="absolute right-3 top-3 rounded-2xl bg-white/90 p-2 shadow hover:bg-white active:scale-95"
                  aria-label="Remove from wishlist"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>

              <div className="p-4">
                <p className="text-xs font-semibold text-slate-500">{p.category}</p>
                <h3 className="mt-1 line-clamp-1 text-sm font-extrabold text-slate-900">
                  {p.name}
                </h3>

                <div className="mt-2 flex items-center justify-between">
                  <p className="text-base font-extrabold text-slate-900">₹{p.price}</p>
                  {p.mrp && (
                    <p className="text-sm text-slate-500 line-through">₹{p.mrp}</p>
                  )}
                </div>

                <button
                  onClick={() => addToCart(p, 1)}
                  className="mt-4 w-full rounded-2xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800 active:scale-[0.99]"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
