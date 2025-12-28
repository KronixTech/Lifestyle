import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Trash2, ShoppingBag, Plus, Minus } from "lucide-react";
import { useCart } from "../context/CartContext";
import CheckoutModal from "../components/CheckoutModal";

export default function Cart() {
  const navigate = useNavigate();
  const { items, cartCount, subtotal, updateQty, removeFromCart, clearCart } = useCart();

  const [checkoutOpen, setCheckoutOpen] = useState(false);

  const shipping = subtotal >= 999 || subtotal === 0 ? 0 : 99;
  const total = subtotal + shipping;

  const summary = useMemo(
    () => ({
      count: cartCount,
      subtotal,
      shipping,
      total,
    }),
    [cartCount, subtotal, shipping, total]
  );

  function handlePay(payload) {
    console.log("Razorpay placeholder payload:", payload);
  
    // Build a fake order object (placeholder)
    const order = {
      orderId: "LS-" + Math.floor(100000 + Math.random() * 900000),
      paid: true,
      total: payload?.summary?.total || total,
      count: payload?.summary?.count || cartCount,
      customer: payload?.customer || null,
      createdAt: new Date().toISOString(),
    };
  
    // Clear cart after "successful payment"
    clearCart();
  
    // Close modal
    setCheckoutOpen(false);
  
    // Navigate to success page with order data
    navigate("/order-success", { state: { order } });
  }
  

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900">Your Cart</h1>
          <p className="mt-1 text-sm text-slate-600">
            You have <span className="font-semibold">{cartCount}</span> item(s) in your bag.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold hover:bg-slate-50"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </button>

          {items.length > 0 && (
            <button
              onClick={clearCart}
              className="inline-flex items-center gap-2 rounded-2xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
            >
              <Trash2 className="h-4 w-4" /> Clear Cart
            </button>
          )}
        </div>
      </div>

      {/* Empty state */}
      {items.length === 0 ? (
        <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-sm">
          <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-slate-900 text-white">
            <ShoppingBag className="h-6 w-6" />
          </div>

          <h2 className="mt-4 text-lg font-extrabold text-slate-900">Your cart is empty</h2>
          <p className="mt-2 text-sm text-slate-600">
            Add products to your cart and they’ll show up here.
          </p>

          <button
            onClick={() => navigate("/products")}
            className="mt-6 rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800"
          >
            Browse Products
          </button>
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-[1fr_360px]">
          {/* Items */}
          <div className="space-y-4">
            {items.map(({ product, qty }) => (
              <div
                key={product.id}
                className="flex gap-4 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm"
              >
                {/* Image */}
                <div className="h-28 w-24 overflow-hidden rounded-2xl bg-slate-100">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-cover"
                    loading="lazy"
                    draggable="false"
                  />
                </div>

                {/* Details */}
                <div className="flex flex-1 flex-col justify-between">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-xs font-semibold text-slate-500">{product.category}</p>
                      <h3 className="mt-1 text-sm font-extrabold text-slate-900">
                        {product.name}
                      </h3>

                      <div className="mt-2 flex items-center gap-2">
                        <p className="text-sm font-extrabold text-slate-900">₹{product.price}</p>
                        {product.mrp && (
                          <p className="text-xs text-slate-500 line-through">₹{product.mrp}</p>
                        )}
                      </div>
                    </div>

                    <button
                      onClick={() => removeFromCart(product.id)}
                      className="rounded-2xl border border-slate-200 bg-white p-2 hover:bg-slate-50 active:scale-95"
                      aria-label="Remove item"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>

                  {/* Quantity + line total */}
                  <div className="mt-3 flex items-center justify-between gap-3">
                    <div className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-2 py-1">
                      <button
                        onClick={() => updateQty(product.id, qty - 1)}
                        className="rounded-xl p-2 hover:bg-slate-50 active:scale-95"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="h-4 w-4" />
                      </button>

                      <span className="min-w-[28px] text-center text-sm font-bold">{qty}</span>

                      <button
                        onClick={() => updateQty(product.id, qty + 1)}
                        className="rounded-xl p-2 hover:bg-slate-50 active:scale-95"
                        aria-label="Increase quantity"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>

                    <p className="text-sm font-extrabold text-slate-900">₹{product.price * qty}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <aside className="h-fit rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-base font-extrabold text-slate-900">Order Summary</h2>

            <div className="mt-4 space-y-2 text-sm">
              <Row label="Subtotal" value={`₹${subtotal}`} />
              <Row label="Shipping" value={shipping === 0 ? "Free" : `₹${shipping}`} />
              <div className="my-3 border-t border-slate-200" />
              <Row label="Total" value={`₹${total}`} strong />
            </div>

            {shipping !== 0 && subtotal > 0 && (
              <div className="mt-4 rounded-2xl bg-slate-50 p-3 text-xs text-slate-600">
                Add <span className="font-bold">₹{999 - subtotal}</span> more to get{" "}
                <span className="font-bold">FREE shipping</span>.
              </div>
            )}

            <button
              onClick={() => setCheckoutOpen(true)}
              className="mt-5 w-full rounded-2xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white hover:bg-slate-800 active:scale-[0.99]"
            >
              Proceed to Checkout
            </button>

            <button
              onClick={() => navigate("/products")}
              className="mt-3 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-900 hover:bg-slate-50 active:scale-[0.99]"
            >
              Continue Shopping
            </button>
          </aside>
        </div>
      )}

      <CheckoutModal
        open={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
        summary={summary}
        onPay={handlePay}
      />
    </div>
  );
}

function Row({ label, value, strong }) {
  return (
    <div className="flex items-center justify-between">
      <span className={`text-slate-700 ${strong ? "font-bold" : ""}`}>{label}</span>
      <span className={`text-slate-900 ${strong ? "font-extrabold" : "font-semibold"}`}>
        {value}
      </span>
    </div>
  );
}
