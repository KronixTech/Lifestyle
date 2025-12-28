import { useEffect, useMemo, useState } from "react";
import { X, ShieldCheck, Truck, ReceiptIndianRupee } from "lucide-react";

export default function CheckoutModal({ open, onClose, summary, onPay }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [pincode, setPincode] = useState("");

  const canPay = useMemo(() => {
    return (
      name.trim().length >= 2 &&
      phone.trim().length >= 8 &&
      address.trim().length >= 8 &&
      city.trim().length >= 2 &&
      pincode.trim().length >= 5 &&
      (summary?.total || 0) > 0
    );
  }, [name, phone, address, city, pincode, summary]);

  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") onClose?.();
    }
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  function handlePay() {
    if (!canPay) return;

    onPay?.({
      customer: { name, phone, address, city, pincode },
      summary,
    });
  }

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <button
        aria-label="Close checkout"
        onClick={onClose}
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
      />

      <div className="relative mx-auto mt-10 w-[94%] max-w-3xl">
        <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-2xl">
          {/* Header */}
          <div className="flex items-start justify-between gap-3 border-b border-slate-100 px-6 py-5">
            <div>
              <p className="text-xs font-semibold tracking-widest text-slate-500">
                CHECKOUT
              </p>
              <h2 className="mt-1 text-xl font-extrabold text-slate-900">
                Razorpay Payment (Placeholder)
              </h2>
              <p className="mt-1 text-sm text-slate-600">
                This is UI-only for now. We’ll connect the real Razorpay flow later.
              </p>
            </div>

            <button
              onClick={onClose}
              className="rounded-full p-2 hover:bg-slate-100 active:scale-95"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Body */}
          <div className="grid gap-0 md:grid-cols-[1fr_340px]">
            {/* Left: Customer details */}
            <div className="px-6 py-6">
              <h3 className="text-sm font-extrabold text-slate-900">
                Delivery Details
              </h3>

              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <Input label="Full Name" value={name} setValue={setName} placeholder="Rohan Henry" />
                <Input
                  label="Phone Number"
                  value={phone}
                  setValue={setPhone}
                  placeholder="9876543210"
                  inputMode="tel"
                />
                <div className="sm:col-span-2">
                  <Textarea
                    label="Address"
                    value={address}
                    setValue={setAddress}
                    placeholder="House / Street / Area"
                  />
                </div>
                <Input label="City" value={city} setValue={setCity} placeholder="Warrensburg" />
                <Input
                  label="Pincode"
                  value={pincode}
                  setValue={setPincode}
                  placeholder="64093"
                  inputMode="numeric"
                />
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                <MiniCard
                  icon={<ShieldCheck className="h-4 w-4" />}
                  title="Secure"
                  desc="Encrypted & trusted checkout"
                />
                <MiniCard
                  icon={<Truck className="h-4 w-4" />}
                  title="Fast Dispatch"
                  desc="Packed and shipped quickly"
                />
                <MiniCard
                  icon={<ReceiptIndianRupee className="h-4 w-4" />}
                  title="Invoice"
                  desc="Email/SMS receipt later"
                />
              </div>
            </div>

            {/* Right: Summary */}
            <div className="border-t border-slate-100 bg-slate-50 px-6 py-6 md:border-t-0 md:border-l md:border-slate-100">
              <h3 className="text-sm font-extrabold text-slate-900">
                Order Summary
              </h3>

              <div className="mt-4 space-y-2 text-sm">
                <Row label="Items" value={`${summary?.count || 0}`} />
                <Row label="Subtotal" value={`₹${summary?.subtotal || 0}`} />
                <Row
                  label="Shipping"
                  value={summary?.shipping === 0 ? "Free" : `₹${summary?.shipping || 0}`}
                />
                <div className="my-3 border-t border-slate-200" />
                <Row label="Total" value={`₹${summary?.total || 0}`} strong />
              </div>

              <button
                onClick={handlePay}
                disabled={!canPay}
                className={`mt-5 w-full rounded-2xl py-3 text-sm font-semibold transition active:scale-[0.99] ${
                  canPay
                    ? "bg-slate-900 text-white hover:bg-slate-800"
                    : "bg-slate-200 text-slate-500 cursor-not-allowed"
                }`}
              >
                Pay with Razorpay
              </button>

              <p className="mt-3 text-xs text-slate-600">
                In the final version, clicking this will open Razorpay checkout.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Input({ label, value, setValue, placeholder, inputMode }) {
  return (
    <label className="block">
      <span className="text-xs font-semibold text-slate-600">{label}</span>
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        inputMode={inputMode}
        className="mt-1 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-slate-400"
      />
    </label>
  );
}

function Textarea({ label, value, setValue, placeholder }) {
  return (
    <label className="block">
      <span className="text-xs font-semibold text-slate-600">{label}</span>
      <textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        rows={3}
        className="mt-1 w-full resize-none rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-slate-400"
      />
    </label>
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

function MiniCard({ icon, title, desc }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-3">
      <div className="flex items-center gap-2 text-slate-900">
        <div className="grid h-7 w-7 place-items-center rounded-xl bg-slate-900 text-white">
          {icon}
        </div>
        <p className="text-xs font-extrabold">{title}</p>
      </div>
      <p className="mt-2 text-xs text-slate-600">{desc}</p>
    </div>
  );
}
