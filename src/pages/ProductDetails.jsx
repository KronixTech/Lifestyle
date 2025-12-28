import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Heart, ArrowLeft, ShieldCheck } from "lucide-react";
import { getProducts } from "../services/productsApi";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

function normalizeApiProduct(p) {
  const id = p?._id;

  const name = p?.productname || "Product";
  const price = Number(
    p?.offerprice && Number(p.offerprice) > 0 ? p.offerprice : p?.productprice ?? 0
  );
  const mrp =
    p?.offerprice && Number(p.offerprice) > 0 ? Number(p.productprice ?? 0) : null;

  const images = Array.isArray(p?.productImages)
    ? p.productImages.map((x) => x?.url).filter(Boolean)
    : [];

  const discount =
    mrp && mrp > price ? Math.round(((mrp - price) / mrp) * 100) : 0;

  return {
    id,
    name,
    price,
    mrp,
    discount,
    images: images.length ? images : ["https://via.placeholder.com/900x1100?text=Product"],
    description: p?.productdescription || "",
    material: p?.productmaterial || "",
    color: p?.productcolor || "",
    sleeve: p?.productsleevelength || "",
    availability: p?.productavailability || "",
    sizes: Array.isArray(p?.productsizes) ? p.productsizes : [],
    season: p?.season || "",
    occasion: p?.productoccasion || "",
    pattern: p?.productpattern || "",
    collections: Array.isArray(p?.collections) ? p.collections : [],
    createdAt: p?.createdAt,
    raw: p,
  };
}

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { addToCart, hasItem } = useCart();
  const { isLiked, toggleWishlist } = useWishlist();

  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const [product, setProduct] = useState(null);

  const [activeImage, setActiveImage] = useState(0);
  const [size, setSize] = useState("");
  const [qty, setQty] = useState(1);
  const [toast, setToast] = useState("");

  useEffect(() => {
    let active = true;

    async function load() {
      try {
        setLoading(true);
        setErr("");

        const data = await getProducts({ limit: 500, skip: 0 });
        const list = Array.isArray(data) ? data : [];

        const found = list.find((p) => p?._id === id);
        if (!found) throw new Error("Product not found");

        const normalized = normalizeApiProduct(found);

        if (!active) return;

        setProduct(normalized);
        setActiveImage(0);

        if (normalized.sizes?.length === 1) setSize(normalized.sizes[0]);
      } catch (e) {
        if (!active) return;
        setErr("Could not load product details.");
      } finally {
        if (active) setLoading(false);
      }
    }

    load();
    return () => {
      active = false;
    };
  }, [id]);

  const liked = useMemo(() => (product ? isLiked(product.id) : false), [product, isLiked]);

  const canAdd = useMemo(() => {
    if (!product) return false;
    if (product.sizes?.length && !size) return false;
    return true;
  }, [product, size]);

  function handleAddToCart() {
    if (!product) return;

    if (product.sizes?.length && !size) {
      setToast("Please select a size.");
      return;
    }

    addToCart(product, qty, size || undefined);
    setToast("Added to cart ✅");
    setTimeout(() => {
      navigate("/cart");
    }, 500);
  }

  function handleLike() {
    if (!product) return;
    toggleWishlist(product);
  }

  const alreadyInCart = useMemo(() => {
    if (!product) return false;
    return hasItem(product.id, size || null);
  }, [product, size, hasItem]);

  if (loading) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-10">
        <div className="h-10 w-40 rounded-2xl bg-slate-200 animate-pulse" />
        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <div className="h-[520px] rounded-[2rem] bg-slate-200 animate-pulse" />
          <div className="h-[520px] rounded-[2rem] bg-slate-200 animate-pulse" />
        </div>
      </div>
    );
  }

  if (err || !product) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-10">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold hover:bg-slate-50"
        >
          <ArrowLeft className="h-4 w-4" /> Back
        </button>

        <div className="mt-6 rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
          <h1 className="text-lg font-extrabold text-slate-900">Oops</h1>
          <p className="mt-2 text-sm text-slate-600">{err || "Product not found."}</p>
          <Link
            to="/products"
            className="mt-4 inline-flex rounded-2xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-800"
          >
            Go to Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <div className="flex items-center justify-between gap-3">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold hover:bg-slate-50"
        >
          <ArrowLeft className="h-4 w-4" /> Back
        </button>

        <Link
          to="/products"
          className="rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold hover:bg-slate-50"
        >
          View All
        </Link>
      </div>

      <div className="mt-6 grid gap-8 lg:grid-cols-2">
        {/* LEFT: Gallery */}
        <div className="rounded-[2rem] border border-slate-200 bg-white p-4 shadow-sm">
          <div className="relative overflow-hidden rounded-[1.75rem] bg-slate-100">
            <img
              src={product.images[activeImage]}
              alt={product.name}
              className="h-[520px] w-full object-cover"
              draggable="false"
            />

            {product.discount > 0 && (
              <div className="absolute left-4 top-4 rounded-2xl bg-slate-900 px-3 py-1 text-xs font-semibold text-white">
                {product.discount}% OFF
              </div>
            )}
          </div>

          {/* thumbnails */}
          <div className="mt-4 flex gap-3 overflow-x-auto pb-1">
            {product.images.map((url, i) => (
              <button
                key={url + i}
                onClick={() => setActiveImage(i)}
                className={`h-20 w-20 flex-shrink-0 overflow-hidden rounded-2xl border ${
                  activeImage === i ? "border-slate-900" : "border-slate-200"
                }`}
              >
                <img src={url} alt="" className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* RIGHT: Details */}
        <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-2xl font-extrabold text-slate-900">{product.name}</h1>
              <p className="mt-2 text-sm text-slate-600">
                {product.collections?.length ? product.collections.join(" • ") : "Lifestyle Menswear"}
              </p>
            </div>

            <button
              onClick={handleLike}
              className={`grid h-11 w-11 place-items-center rounded-2xl border transition ${
                liked
                  ? "border-red-200 bg-red-50 text-red-600"
                  : "border-slate-200 bg-white text-slate-900 hover:bg-slate-50"
              }`}
              title={liked ? "Unlike" : "Like"}
            >
              <Heart className={`h-5 w-5 ${liked ? "fill-current" : ""}`} />
            </button>
          </div>

          {/* Price */}
          <div className="mt-5 flex items-end gap-3">
            <p className="text-2xl font-extrabold text-slate-900">₹{product.price}</p>
            {product.mrp && (
              <p className="text-sm font-semibold text-slate-500 line-through">
                ₹{product.mrp}
              </p>
            )}
            {product.discount > 0 && (
              <p className="text-sm font-bold text-emerald-700">{product.discount}% OFF</p>
            )}
          </div>

          {/* Size */}
          {product.sizes?.length > 0 && (
            <div className="mt-6">
              <div className="flex items-center justify-between">
                <p className="text-sm font-extrabold text-slate-900">Select Size</p>
                {size ? (
                  <p className="text-xs font-semibold text-slate-500">Selected: {size}</p>
                ) : (
                  <p className="text-xs font-semibold text-rose-600">Required</p>
                )}
              </div>

              <div className="mt-3 flex flex-wrap gap-2">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSize(s)}
                    className={`rounded-2xl px-4 py-2 text-sm font-semibold border transition ${
                      size === s
                        ? "border-slate-900 bg-slate-900 text-white"
                        : "border-slate-200 bg-white hover:bg-slate-50"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Qty */}
          <div className="mt-6 flex items-center justify-between">
            <p className="text-sm font-extrabold text-slate-900">Quantity</p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="h-10 w-10 rounded-2xl border border-slate-200 hover:bg-slate-50 font-bold"
              >
                −
              </button>
              <div className="min-w-10 text-center text-sm font-extrabold">{qty}</div>
              <button
                onClick={() => setQty((q) => q + 1)}
                className="h-10 w-10 rounded-2xl border border-slate-200 hover:bg-slate-50 font-bold"
              >
                +
              </button>
            </div>
          </div>

          {/* Add to cart */}
          <div className="mt-7 flex flex-col gap-3">
            <button
              onClick={handleAddToCart}
              disabled={!canAdd}
              className={`rounded-2xl px-5 py-3 text-sm font-semibold transition ${
                !canAdd
                  ? "bg-slate-200 text-slate-500 cursor-not-allowed"
                  : "bg-slate-900 text-white hover:bg-slate-800 active:scale-[0.99]"
              }`}
            >
              {alreadyInCart ? "Add More to Bag" : "Add to Bag"}
            </button>

            <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
              <ShieldCheck className="h-4 w-4" />
              Secure checkout • Easy returns
            </div>

            {toast && (
              <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700">
                {toast}
              </div>
            )}
          </div>

          {/* Info */}
          <div className="mt-8 grid gap-3 rounded-3xl border border-slate-200 bg-white p-5">
            <InfoRow label="Material" value={product.material || "—"} />
            <InfoRow label="Color" value={product.color || "—"} />
            <InfoRow label="Sleeve" value={product.sleeve || "—"} />
            <InfoRow label="Occasion" value={product.occasion || "—"} />
            <InfoRow label="Pattern" value={product.pattern || "—"} />
            <InfoRow label="Season" value={product.season || "—"} />
            <InfoRow label="Availability" value={product.availability || "—"} />
          </div>

          {product.description && (
            <div className="mt-6 rounded-3xl border border-slate-200 bg-white p-5">
              <p className="text-sm font-extrabold text-slate-900">Description</p>
              <p className="mt-2 text-sm leading-6 text-slate-600">{product.description}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function InfoRow({ label, value }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <p className="text-xs font-semibold text-slate-500">{label}</p>
      <p className="text-sm font-semibold text-slate-900 text-right">{value}</p>
    </div>
  );
}
