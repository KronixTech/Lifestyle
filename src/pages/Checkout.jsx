import { useMemo, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ShieldCheck, CreditCard, X, CheckCircle2, AlertTriangle } from "lucide-react";
import { useCart } from "../context/CartContext";

export default function Checkout() {
  const navigate = useNavigate();
  const { items, cartCount, subtotal } = useCart();

  const shipping = cartCount > 0 ? 0 : 0;
  const total = subtotal + shipping;

  const [open, setOpen] = useState(false);

  // placeholder states
  const [step, setStep] = useState("idle"); // idle | processing | success | failed

  const orderId = useMemo(() => {
    // dummy order id for UI
    return `order_${Math.random().toString(36).slice(2, 10)}${Date.now().toString().slice(-4)}`;
  }, []);

  if (!items || items.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-10">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-10 text-center shadow-sm">
          <h1 className="text-2xl font-extrabold text-slate-900">Checkout</h1>
          <p className="mt-2 text-sm text-slate-600">Your bag is empty.</p>
          <Link
            to="/products"
            className="mt-6 inline-flex rounded-2xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white hover:bg-slate-800"
          >
            Shop Products
          </Link>
        </div>
      </div>
    );
  }

  function openModal() {
    setStep("idle");
    setOpen(true);
  }

  function closeModal() {
    if (step === "processing") return;
    setOpen(false);
  }

  async function simulatePaymentSuccess() {
    setStep("processing");
    await sleep(900);
    setStep("success");
    await sleep(700);
    setOpen(false);

    // Next step: redirect to success page (we'll build next)
    navigate("/order-success", {
      state: { orderId, amount: total },
    });
  }

  async function simulatePaymentFail() {
    setStep("processing");
    await sleep(700);
    setStep("failed");
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900">Checkout</h1>
          <p className="mt-1 text-sm text-slate-600">
            Review your order and proceed to payment.
          </p>
        </div>

        <Link
          to="/cart"
          className="inline-flex w-fit rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold hover:bg-slate-50"
        >
          Back to Bag
        </Link>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_380px]">
        {/* LEFT: Items summary */}
        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-extrabold text-slate-900">Order Items</h2>

          <div className="mt-4 space-y-4">
            {items.map((it) => (
              <div key={it.key} className="flex gap-4">
                <div className="h-20 w-16 overflow-hidden rounded-2xl bg-slate-100">
                  <img
                    src={it.product.image}
                    alt={it.product.name}
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="flex-1">
                  <p className="text-sm font-extrabold text-slate-900">
                    {it.product.name}
                  </p>
                  <div className="mt-1 flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-600">
                    {it.size ? (
                      <span className="rounded-xl border border-slate-200 bg-white px-2 py-1">
                        Size: {it.size}
                      </span>
                    ) : null}
                    <span className="rounded-xl border border-slate-200 bg-white px-2 py-1">
                      Qty: {it.qty}
                    </span>
                  </div>
                </div>

                <div className="text-sm font-extrabold text-slate-900">
                  ₹{money(Number(it.product.price || 0) * (it.qty || 0))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT: Payment summary */}
        <aside className="h-fit rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-extrabold text-slate-900">Payment</h2>

          <div className="mt-5 space-y-3 text-sm">
            <Row label="Subtotal" value={`₹${money(subtotal)}`} />
            <Row label="Shipping" value={shipping === 0 ? "Free" : `₹${money(shipping)}`} />
            <div className="my-3 border-t border-slate-200" />
            <div className="flex items-center justify-between">
              <p className="text-sm font-extrabold text-slate-900">Total</p>
              <p className="text-base font-extrabold text-slate-900">₹{money(total)}</p>
            </div>
          </div>

          <button
            onClick={openModal}
            className="mt-6 w-full rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800 active:scale-[0.99]"
          >
            Pay with Razorpay (Demo)
          </button>

          <div className="mt-4 flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
            <ShieldCheck className="h-4 w-4" />
            Secure payment • SSL protected
          </div>

          <p className="mt-4 text-xs text-slate-500">
            Demo mode: this is a placeholder payment UI for client preview.
          </p>
        </aside>
      </div>

      {/* Razorpay Modal Placeholder */}
      {open && (
        <div className="fixed inset-0 z-[60] grid place-items-center bg-black/40 p-4">
          <div className="w-full max-w-md overflow-hidden rounded-[2rem] bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
              <div className="flex items-center gap-2">
                <div className="grid h-10 w-10 place-items-center rounded-2xl bg-slate-900 text-white">
                  <CreditCard className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-extrabold text-slate-900">Razorpay</p>
                  <p className="text-xs text-slate-500">Demo Checkout</p>
                </div>
              </div>

              <button
                onClick={closeModal}
                className="rounded-2xl p-2 hover:bg-slate-50"
                title="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="px-5 py-5">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-semibold text-slate-500">Merchant</p>
                  <p className="text-xs font-extrabold text-slate-900">Lifestyle</p>
                </div>
                <div className="mt-2 flex items-center justify-between">
                  <p className="text-xs font-semibold text-slate-500">Order ID</p>
                  <p className="text-xs font-semibold text-slate-900">{orderId}</p>
                </div>
                <div className="mt-2 flex items-center justify-between">
                  <p className="text-xs font-semibold text-slate-500">Amount</p>
                  <p className="text-sm font-extrabold text-slate-900">₹{money(total)}</p>
                </div>
              </div>

              {step === "failed" && (
                <div className="mt-4 flex items-start gap-2 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-800">
                  <AlertTriangle className="mt-0.5 h-4 w-4" />
                  <div>
                    <p className="font-extrabold">Payment failed</p>
                    <p className="text-xs opacity-80">
                      Demo failure screen. Try again or choose success.
                    </p>
                  </div>
                </div>
              )}

              <div className="mt-4 grid gap-3">
                <button
                  disabled={step === "processing"}
                  onClick={simulatePaymentSuccess}
                  className={`w-full rounded-2xl px-5 py-3 text-sm font-semibold text-white transition ${
                    step === "processing"
                      ? "bg-slate-400 cursor-not-allowed"
                      : "bg-emerald-600 hover:bg-emerald-500"
                  }`}
                >
                  {step === "processing" ? "Processing..." : "Simulate Success"}
                </button>

                <button
                  disabled={step === "processing"}
                  onClick={simulatePaymentFail}
                  className={`w-full rounded-2xl border px-5 py-3 text-sm font-semibold transition ${
                    step === "processing"
                      ? "border-slate-200 text-slate-400 cursor-not-allowed"
                      : "border-slate-200 text-slate-900 hover:bg-slate-50"
                  }`}
                >
                  Simulate Failure
                </button>

                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <CheckCircle2 className="h-4 w-4" />
                  Card / UPI / Wallet screens will be added when real integration is enabled.
                </div>
              </div>
            </div>

            <div className="border-t border-slate-200 px-5 py-4 text-xs text-slate-500">
              This is a UI placeholder. Real Razorpay integration comes later.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Row({ label, value }) {
  return (
    <div className="flex items-center justify-between">
      <p className="text-slate-600">{label}</p>
      <p className="font-semibold text-slate-900">{value}</p>
    </div>
  );
}

function money(n) {
  const num = Number(n || 0);
  return num.toFixed(0);
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}
