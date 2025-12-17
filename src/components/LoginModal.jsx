import { useEffect, useMemo, useState } from "react";
import { X, Lock, Phone, Mail } from "lucide-react";

function LoginModal({ open, onClose, onLogin }) {
  const [mode, setMode] = useState("phone");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const canSubmit = useMemo(() => {
    if (mode === "phone") return phone.length >= 8 && password.length >= 4;
    return email.includes("@") && password.length >= 4;
  }, [mode, phone, email, password]);

  useEffect(() => {
    function esc(e) {
      if (e.key === "Escape") onClose();
    }
    if (open) window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, [open, onClose]);

  if (!open) return null;

  function handleSubmit(e) {
    e.preventDefault();
    if (!canSubmit) return;
    onLogin({ mode, phone, email });
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative mx-auto mt-28 w-[92%] max-w-md">
        <div className="rounded-3xl bg-white shadow-2xl">
          <div className="flex justify-between items-center px-6 py-4">
            <h2 className="text-xl font-bold">Welcome back</h2>
            <button onClick={onClose}>
              <X />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="px-6 pb-6 space-y-4">
            {mode === "phone" ? (
              <div className="relative">
                <Phone className="absolute left-3 top-3 text-slate-400" />
                <input
                  className="w-full pl-10 py-2 border rounded-xl"
                  placeholder="Phone number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
            ) : (
              <div className="relative">
                <Mail className="absolute left-3 top-3 text-slate-400" />
                <input
                  className="w-full pl-10 py-2 border rounded-xl"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            )}

            <div className="relative">
              <Lock className="absolute left-3 top-3 text-slate-400" />
              <input
                type="password"
                className="w-full pl-10 py-2 border rounded-xl"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              disabled={!canSubmit}
              className="w-full bg-black text-white py-2 rounded-xl disabled:opacity-50"
            >
              Sign in
            </button>

            <button
              type="button"
              onClick={() => setMode(mode === "phone" ? "email" : "phone")}
              className="text-sm text-slate-500 hover:underline"
            >
              Use {mode === "phone" ? "email" : "phone"} instead
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginModal;
