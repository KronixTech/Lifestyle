import { useEffect, useMemo, useState } from "react";
import { X, Lock, Phone, Mail } from "lucide-react";

export default function LoginModal({ open, onClose, onLogin }) {
  const [mode, setMode] = useState("phone"); // "phone" | "email"
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const canSubmit = useMemo(() => {
    if (mode === "phone") return phone.trim().length >= 8 && password.length >= 4;
    return email.includes("@") && password.length >= 4;
  }, [mode, phone, email, password]);

  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") onClose?.();
    }
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  useEffect(() => {
    if (!open) return;
    // reset when opening for clean UX
    setPassword("");
  }, [open]);

  if (!open) return null;

  function handleSubmit(e) {
    e.preventDefault();
    if (!canSubmit) return;

    const payload =
      mode === "phone"
        ? { mode, phone: phone.trim(), password }
        : { mode, email: email.trim(), password };

    // For now just simulate login success
    onLogin?.(payload);
    onClose?.();
  }

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <button
        aria-label="Close login modal"
        onClick={onClose}
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
      />

      {/* Modal */}
      <div className="relative mx-auto mt-24 w-[92%] max-w-md">
        <div className="rounded-3xl border border-white/10 bg-white shadow-2xl">
          <div className="px-6 pt-6 pb-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold tracking-widest text-slate-500">
                  LIFESTYLE ACCESS
                </p>
                <h2 className="mt-1 text-2xl font-bold text-slate-900">
                  Welcome back 👋
                </h2>
                <p className="mt-1 text-sm text-slate-600">
                  Sign in to save likes, view cart, and checkout faster.
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

            {/* Mode Switch */}
            <div className="mt-5 grid grid-cols-2 rounded-2xl bg-slate-50 p-1">
              <button
                type="button"
                onClick={() => setMode("phone")}
                className={`rounded-xl px-3 py-2 text-sm font-semibold transition ${
                  mode === "phone" ? "bg-white shadow-sm" : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Phone
              </button>
              <button
                type="button"
                onClick={() => setMode("email")}
                className={`rounded-xl px-3 py-2 text-sm font-semibold transition ${
                  mode === "email" ? "bg-white shadow-sm" : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Email
              </button>
            </div>

            <form onSubmit={handleSubmit} className="mt-5 space-y-3">
              {/* Phone/Email */}
              {mode === "phone" ? (
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Mobile number"
                    className="w-full rounded-2xl border border-slate-200 bg-white px-10 py-3 text-sm outline-none focus:border-slate-400"
                    inputMode="tel"
                  />
                </div>
              ) : (
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email address"
                    className="w-full rounded-2xl border border-slate-200 bg-white px-10 py-3 text-sm outline-none focus:border-slate-400"
                    inputMode="email"
                  />
                </div>
              )}

              {/* Password */}
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  type="password"
                  className="w-full rounded-2xl border border-slate-200 bg-white px-10 py-3 text-sm outline-none focus:border-slate-400"
                />
              </div>

              <button
                type="submit"
                disabled={!canSubmit}
                className={`w-full rounded-2xl py-3 text-sm font-semibold transition active:scale-[0.99] ${
                  canSubmit
                    ? "bg-slate-900 text-white hover:bg-slate-800"
                    : "bg-slate-200 text-slate-500 cursor-not-allowed"
                }`}
              >
                Sign in
              </button>

              <div className="flex items-center justify-between text-xs text-slate-500">
                <button
                  type="button"
                  className="hover:text-slate-700"
                  onClick={() => alert("Forgot password flow later ✅")}
                >
                  Forgot password?
                </button>
                <button
                  type="button"
                  className="hover:text-slate-700"
                  onClick={() => alert("Create account flow later ✅")}
                >
                  Create account
                </button>
              </div>
            </form>
          </div>

          <div className="rounded-b-3xl border-t border-slate-100 bg-slate-50 px-6 py-4">
            <p className="text-xs text-slate-600">
              By continuing, you agree to Lifestyle’s{" "}
              <span className="font-semibold text-slate-800">Terms</span> and{" "}
              <span className="font-semibold text-slate-800">Privacy Policy</span>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
