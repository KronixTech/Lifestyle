import { useEffect, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CheckCircle2, ArrowRight, ReceiptIndianRupee } from "lucide-react";

export default function OrderSuccess() {
  const navigate = useNavigate();
  const { state } = useLocation();

  const order = useMemo(() => {
    return (
      state?.order || {
        orderId: "LS-" + Math.floor(100000 + Math.random() * 900000),
        paid: true,
        total: 0,
        count: 0,
        customer: null,
        createdAt: new Date().toISOString(),
      }
    );
  }, [state]);

  useEffect(() => {

  }, []);

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
        <div className="flex items-start gap-4">
          <div className="grid h-12 w-12 place-items-center rounded-2xl bg-green-600 text-white">
            <CheckCircle2 className="h-6 w-6" />
          </div>

          <div className="flex-1">
            <h1 className="text-2xl font-extrabold text-slate-900">
              Order placed successfully!
            </h1>
            <p className="mt-1 text-sm text-slate-600">
              Payment confirmed (placeholder). Your order is now being processed.
            </p>
          </div>
        </div>

        {/* Details */}
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <Card title="Order ID" value={order.orderId} />
          <Card title="Payment Status" value={order.paid ? "Paid" : "Pending"} />
          <Card title="Items" value={`${order.count} item(s)`} />
          <Card
            title="Total"
            value={`₹${order.total}`}
            icon={<ReceiptIndianRupee className="h-4 w-4" />}
          />
        </div>

        {/* Customer */}
        {order.customer && (
          <div className="mt-6 rounded-3xl border border-slate-200 bg-slate-50 p-5">
            <p className="text-sm font-extrabold text-slate-900">Delivery To</p>
            <p className="mt-2 text-sm text-slate-700">
              <span className="font-semibold">{order.customer.name}</span> •{" "}
              {order.customer.phone}
            </p>
            <p className="mt-1 text-sm text-slate-700">
              {order.customer.address}, {order.customer.city} -{" "}
              {order.customer.pincode}
            </p>
          </div>
        )}

        {/* Actions */}
        <div className="mt-7 flex flex-col gap-3 sm:flex-row">
          <button
            onClick={() => navigate("/products")}
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800 active:scale-[0.99]"
          >
            Continue Shopping <ArrowRight className="h-4 w-4" />
          </button>

          <button
            onClick={() => navigate("/")}
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-900 hover:bg-slate-50 active:scale-[0.99]"
          >
            Go Home
          </button>
        </div>

        <p className="mt-5 text-xs text-slate-500">
          Note: This is a demo success screen. Later we’ll connect real Razorpay
          order/payment verification.
        </p>
      </div>
    </div>
  );
}

function Card({ title, value, icon }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5">
      <p className="text-xs font-semibold text-slate-500">{title}</p>
      <div className="mt-2 flex items-center gap-2">
        {icon}
        <p className="text-base font-extrabold text-slate-900">{value}</p>
      </div>
    </div>
  );
}
