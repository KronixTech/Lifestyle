import { useEffect, useMemo, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { CheckCircle2, Package, Home, ShoppingBag } from "lucide-react";
import { useCart } from "../context/CartContext";

export default function OrderSuccess() {
  const navigate = useNavigate();
  const location = useLocation();
  const { clearCart } = useCart();

  // ✅ avoid clearing twice in React StrictMode dev
  const clearedRef = useRef(false);

  const { orderId, amount } = useMemo(() => {
    // data sent from Checkout navigate("/order-success", { state: { orderId, amount } })
    const state = location.state || {};
    return {
      orderId: state.orderId || `order_${Math.random().toString(36).slice(2, 10)}`,
      amount: state.amount ?? null,
    };
  }, [location.state]);

  useEffect(() => {
    if (clearedRef.current) return;
    clearedRef.current = true;
    clearCart();
  }, [clearCart]);

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
        <div className="flex items-start gap-4">
          <div className="grid h-12 w-12 place-items-center rounded-2xl bg-emerald-600 text-white">
            <CheckCircle2 className="h-6 w-6" />
          </div>

          <div className="flex-1">
            <h1 className="text-2xl font-extrabold text-slate-900">
              Payment Successful 🎉
            </h1>
            <p className="mt-2 text-sm text-slate-600">
              Your order has been placed successfully. We’ll start processing it shortly.
            </p>

            <div className="mt-5 grid gap-3 rounded-3xl border border-slate-200 bg-slate-50 p-5 text-sm">
              <InfoRow label="Order ID" value={orderId} />
              <InfoRow
                label="Amount Paid"
                value={amount !== null ? `₹${Number(amount).toFixed(0)}` : "—"}
              />
              <InfoRow label="Status" value="Confirmed" />
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                to="/products"
                className="inline-flex items-center gap-2 rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800"
              >
                <ShoppingBag className="h-4 w-4" />
                Continue Shopping
              </Link>

              <Link
                to="/"
                className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-900 hover:bg-slate-50"
              >
                <Home className="h-4 w-4" />
                Go Home
              </Link>

              <button
                onClick={() => navigate("/orders")}
                className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-900 hover:bg-slate-50"
                title="We’ll build orders page later"
              >
                <Package className="h-4 w-4" />
                View Orders (Later)
              </button>
            </div>

            <p className="mt-6 text-xs text-slate-500">
              Note: This is a demo flow. Real order tracking will be added once backend orders API is connected.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoRow({ label, value }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <p className="text-xs font-semibold text-slate-500">{label}</p>
      <p className="text-sm font-semibold text-slate-900 break-all text-right">
        {value}
      </p>
    </div>
  );
}
