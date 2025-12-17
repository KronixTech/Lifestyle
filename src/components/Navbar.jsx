import { useMemo, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Heart, ShoppingBag, User, Search, Menu, X, Sparkles } from "lucide-react";
import LoginModal from "./LoginModal";

function classNames(...c) {
  return c.filter(Boolean).join(" ");
}

const navLinkBase =
  "px-3 py-2 rounded-xl text-sm font-semibold transition hover:bg-white/60 hover:shadow-sm";

export default function Navbar() {
  const [loginOpen, setLoginOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  // Temporary counts (later connect to context/store)
  const likedCount = 2;
  const cartCount = 3;

  const activeClass = "bg-white shadow-sm text-slate-900";
  const inactiveClass = "text-slate-700";

  const brand = useMemo(() => {
    return (
      <div className="flex items-center gap-2">
        <div className="grid h-10 w-10 place-items-center rounded-2xl bg-slate-900 text-white shadow-lg">
          <Sparkles className="h-5 w-5" />
        </div>
        <div className="leading-tight">
          <div className="text-sm font-extrabold tracking-wide">LIFESTYLE</div>
          <div className="text-[11px] text-slate-500">menswear • essentials</div>
        </div>
      </div>
    );
  }, []);

  function submitSearch(e) {
    e.preventDefault();
    if (!query.trim()) return;
    // for now route to products, later you can pass query as URL param
    navigate("/products");
    setMobileOpen(false);
  }

  function handleLogin(payload) {
    console.log("Logged in (fake):", payload);
    alert("Login success ✅ (temporary)");
  }

  return (
    <>

      {/* Navbar */}
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/70 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-4 py-3">
          <div className="flex items-center justify-between gap-3">
            {/* Left: Brand */}
            <NavLink to="/" className="shrink-0">
              {brand}
            </NavLink>

            {/* Center: Desktop Nav */}
            <nav className="hidden md:flex items-center gap-2 rounded-2xl bg-slate-50 p-1">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  classNames(navLinkBase, isActive ? activeClass : inactiveClass)
                }
              >
                Home
              </NavLink>
              <NavLink
                to="/products"
                className={({ isActive }) =>
                  classNames(navLinkBase, isActive ? activeClass : inactiveClass)
                }
              >
                Products
              </NavLink>
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  classNames(navLinkBase, isActive ? activeClass : inactiveClass)
                }
              >
                About
              </NavLink>
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  classNames(navLinkBase, isActive ? activeClass : inactiveClass)
                }
              >
                Contact
              </NavLink>
            </nav>

            {/* Right: Search + Actions */}
            <div className="flex items-center gap-2">
              {/* Search (desktop) */}
              <form
                onSubmit={submitSearch}
                className="hidden lg:flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-3 py-2 shadow-sm"
              >
                <Search className="h-4 w-4 text-slate-400" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search shirts, jeans, hoodies..."
                  className="w-64 bg-transparent text-sm outline-none placeholder:text-slate-400"
                />
                <button
                  type="submit"
                  className="rounded-xl bg-slate-900 px-3 py-1.5 text-xs font-semibold text-white hover:bg-slate-800"
                >
                  Search
                </button>
              </form>

              {/* Icons */}
              <button
                onClick={() => setLoginOpen(true)}
                className="rounded-2xl border border-slate-200 bg-white p-2 shadow-sm hover:bg-slate-50 active:scale-95"
                aria-label="Login"
              >
                <User className="h-5 w-5" />
              </button>

              <NavLink
                to="/liked"
                className="relative rounded-2xl border border-slate-200 bg-white p-2 shadow-sm hover:bg-slate-50 active:scale-95"
                aria-label="Liked products"
              >
                <Heart className="h-5 w-5" />
                {likedCount > 0 && (
                  <span className="absolute -top-1 -right-1 grid h-5 w-5 place-items-center rounded-full bg-slate-900 text-[10px] font-bold text-white">
                    {likedCount}
                  </span>
                )}
              </NavLink>

              <NavLink
                to="/cart"
                className="relative rounded-2xl border border-slate-200 bg-white p-2 shadow-sm hover:bg-slate-50 active:scale-95"
                aria-label="Cart"
              >
                <ShoppingBag className="h-5 w-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 grid h-5 w-5 place-items-center rounded-full bg-slate-900 text-[10px] font-bold text-white">
                    {cartCount}
                  </span>
                )}
              </NavLink>

              {/* Mobile menu */}
              <button
                onClick={() => setMobileOpen((v) => !v)}
                className="md:hidden rounded-2xl border border-slate-200 bg-white p-2 shadow-sm hover:bg-slate-50 active:scale-95"
                aria-label="Open menu"
              >
                {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>

          {/* Mobile panel */}
          {mobileOpen && (
            <div className="mt-3 rounded-3xl border border-slate-200 bg-white p-4 shadow-xl md:hidden">
              {/* Mobile search */}
              <form onSubmit={submitSearch} className="flex items-center gap-2">
                <div className="flex flex-1 items-center gap-2 rounded-2xl border border-slate-200 bg-white px-3 py-2">
                  <Search className="h-4 w-4 text-slate-400" />
                  <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search products..."
                    className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
                  />
                </div>
                <button
                  type="submit"
                  className="rounded-2xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white"
                >
                  Go
                </button>
              </form>

              {/* Links */}
              <div className="mt-4 grid grid-cols-2 gap-2">
                <NavLink
                  to="/"
                  onClick={() => setMobileOpen(false)}
                  className="rounded-2xl bg-slate-50 px-3 py-3 text-sm font-semibold text-slate-800"
                >
                  Home
                </NavLink>
                <NavLink
                  to="/products"
                  onClick={() => setMobileOpen(false)}
                  className="rounded-2xl bg-slate-50 px-3 py-3 text-sm font-semibold text-slate-800"
                >
                  Products
                </NavLink>
                <NavLink
                  to="/about"
                  onClick={() => setMobileOpen(false)}
                  className="rounded-2xl bg-slate-50 px-3 py-3 text-sm font-semibold text-slate-800"
                >
                  About
                </NavLink>
                <NavLink
                  to="/contact"
                  onClick={() => setMobileOpen(false)}
                  className="rounded-2xl bg-slate-50 px-3 py-3 text-sm font-semibold text-slate-800"
                >
                  Contact
                </NavLink>

                <button
                  onClick={() => {
                    setMobileOpen(false);
                    setLoginOpen(true);
                  }}
                  className="col-span-2 rounded-2xl bg-slate-900 px-3 py-3 text-sm font-semibold text-white"
                >
                  Login / Create Account
                </button>
              </div>
            </div>
          )}
        </div>
      </header>

      <LoginModal open={loginOpen} onClose={() => setLoginOpen(false)} onLogin={handleLogin} />
    </>
  );
}
