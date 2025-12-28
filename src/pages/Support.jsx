import { Link } from "react-router-dom";
import { HelpCircle, Package, RefreshCcw, Truck } from "lucide-react";

export default function Support() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <Header
        title="Customer Support"
        desc="Quick help for orders, delivery, returns, and payments (UI-only)."
      />

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <Card
          icon={<Package className="h-5 w-5" />}
          title="Order Issues"
          desc="Wrong item, missing item, or order not confirmed."
        />
        <Card
          icon={<Truck className="h-5 w-5" />}
          title="Delivery Status"
          desc="Track your shipment and delivery timeline."
        />
        <Card
          icon={<RefreshCcw className="h-5 w-5" />}
          title="Returns & Refunds"
          desc="Request return and understand refund processing."
        />
        <Card
          icon={<HelpCircle className="h-5 w-5" />}
          title="Payments"
          desc="Payment failed, deducted amount, or retry payment."
        />
      </div>

      <div className="mt-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-sm font-extrabold text-slate-900">Need help right now?</h2>
        <p className="mt-2 text-sm text-slate-600">
          You can reach us via the{" "}
          <Link className="font-semibold text-slate-900 hover:underline" to="/contact">
            Contact Us
          </Link>{" "}
          page. We respond during working hours.
        </p>
      </div>
    </div>
  );
}

function Header({ title, desc }) {
  return (
    <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
      <h1 className="text-2xl font-extrabold text-slate-900">{title}</h1>
      <p className="mt-2 text-sm text-slate-600">{desc}</p>
    </div>
  );
}

function Card({ icon, title, desc }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="grid h-10 w-10 place-items-center rounded-2xl bg-slate-900 text-white">
          {icon}
        </div>
        <div>
          <p className="text-sm font-extrabold text-slate-900">{title}</p>
          <p className="text-sm text-slate-600">{desc}</p>
        </div>
      </div>
    </div>
  );
}
