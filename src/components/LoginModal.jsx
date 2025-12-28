import { useEffect, useMemo, useState } from "react";
import { X, Phone, Lock, UserPlus } from "lucide-react";

export default function LoginModal({ open, onClose, onLogin, onRegister }) {
  const [mode, setMode] = useState("login"); // "login" | "register"
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState(""); 
  const [otp, setOtp] = useState(""); 
  const [useOtp, setUseOtp] = useState(false);

  // Basic validation
  const phoneOk = useMemo(() => phone.trim().length >= 8, [phone]);

  const canSubmit = useMemo(() => {
    if (!phoneOk) return false;
    if (useOtp) return otp.trim().length >= 4;
    // password login/register 
    return password.trim().length >= 4;
  }, [phoneOk, useOtp, otp, password]);

  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") onClose?.();
    }
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  useEffect(() => {
    if (!open) return;
    // reset sensitive fields on open
    setPassword("");
    setOtp("");
  }, [open]);

  if (!open) return null;

  function handleSubmit(e) {
    e.preventDefault();
    if (!canSubmit) return;

    const payload = {
      mode,
      phone: phone.trim(),
      authType: useOtp ? "otp" : "password",
      otp: useOtp ? otp.trim() : undefined,
      password: !useOtp ? password.trim() : undefined,
    };

    if (mode === "login") {
      onLogin?.(payload);
      alert("Login success ✅ (temporary)");
    } else {
      onRegister?.(payload);
      alert("Account created ✅ (temporary)");
    }

    onClose?.();
  }

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <button
        aria-label="Close"
        onClick={onClose}
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
      />

      {/* Modal */}
      <div className="relative mx-auto mt-24 w-[92%] max-w-md">
        <div className="rounded-3xl border border-white/10 bg-white shadow-2xl overflow-hidden">
          <div className="px-6 pt-6 pb-5">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-2xl bg-slate-900 text-white">
                  {mode === "login" ? (
                    <Phone className="h-5 w-5" />
                  ) : (
                    <UserPlus className="h-5 w-5" />
                  )}
                </div>
                <div>
                  <h2 className="text-xl font-extrabold text-slate-900">
                    {mode === "login" ? "Welcome Back" : "Create Account"}
                  </h2>
                  <p className="text-sm text-slate-600">
                    {mode === "login"
                      ? "Login with your registered mobile number."
                      : "Register using your mobile number."}
                  </p>
                </div>
              </div>

              <button
                onClick={onClose}
                className="rounded-full p-2 hover:bg-slate-100 active:scale-95"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Phone input */}
            <form onSubmit={handleSubmit} className="mt-6 space-y-3">
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

              <div className="flex items-center justify-between">
                <p className="text-xs text-slate-500">
                  {useOtp ? "Using OTP verification" : "Using password"}
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setUseOtp((v) => !v);
                    setPassword("");
                    setOtp("");
                  }}
                  className="text-xs font-semibold text-slate-800 hover:text-slate-900"
                >
                  {useOtp ? "Use password" : "Use OTP"}
                </button>
              </div>

              {/* Password or OTP */}
              {useOtp ? (
                <>
                  <div className="relative">
                    <input
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      placeholder="Enter OTP"
                      className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-slate-400"
                      inputMode="numeric"
                    />
                  </div>

                  <button
                    type="button"
                    onClick={() => alert("Send OTP API later ✅")}
                    disabled={!phoneOk}
                    className={`w-full rounded-2xl py-3 text-sm font-semibold transition active:scale-[0.99] ${
                      phoneOk
                        ? "bg-slate-100 text-slate-900 hover:bg-slate-200"
                        : "bg-slate-200 text-slate-500 cursor-not-allowed"
                    }`}
                  >
                    Send OTP
                  </button>
                </>
              ) : (
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder={mode === "login" ? "Password" : "Create password"}
                    type="password"
                    className="w-full rounded-2xl border border-slate-200 bg-white px-10 py-3 text-sm outline-none focus:border-slate-400"
                  />
                </div>
              )}

              <button
                type="submit"
                disabled={!canSubmit}
                className={`w-full rounded-2xl py-3 text-sm font-semibold transition active:scale-[0.99] ${
                  canSubmit
                    ? "bg-slate-900 text-white hover:bg-slate-800"
                    : "bg-slate-200 text-slate-500 cursor-not-allowed"
                }`}
              >
                {mode === "login" ? "Sign in With Phone" : "Create Account"}
              </button>

              {/* Bottom */}
              <div className="flex items-center justify-between text-xs text-slate-600">
                {mode === "login" ? (
                  <>
                    <button
                      type="button"
                      onClick={() => alert("Forgot password/OTP flow later ✅")}
                      className="hover:text-slate-900"
                    >
                      Forgot?
                    </button>

                    <button
                      type="button"
                      onClick={() => setMode("register")}
                      className="font-semibold text-slate-900 hover:underline"
                    >
                      New here? Create an account
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      type="button"
                      onClick={() => setMode("login")}
                      className="font-semibold text-slate-900 hover:underline"
                    >
                      Already have an account? Login
                    </button>
                  </>
                )}
              </div>

              <p className="text-[11px] text-slate-500 leading-4">
                By continuing, you agree to Lifestyle’s{" "}
                <span className="font-semibold text-slate-800">Terms of Use</span>{" "}
                and{" "}
                <span className="font-semibold text-slate-800">Privacy Policy</span>.
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
