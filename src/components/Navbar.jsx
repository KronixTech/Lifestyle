import { useEffect, useMemo, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Heart, ShoppingBag, User, Search } from "lucide-react";

import LoginModal from "./LoginModal";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const navigate = useNavigate();

  const { likedCount } = useWishlist();
  const { cartCount } = useCart();

  const [loginOpen, setLoginOpen] = useState(false);
  const [search, setSearch] = useState("");

  const navClass = useMemo(
    () => (isActive) =>
      `text-sm font-semibold transition ${
        isActive ? "text-slate-900" : "text-slate-600 hover:text-slate-900"
      }`,
    []
  );

  function handleSearchSubmit(e) {
    e.preventDefault();
    navigate("/products");
  }

  function handleLogin(payload) {
    console.log("Login (fake for now):", payload);
  }

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3">
          {/* Left: Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="grid h-10 w-10 place-items-center rounded-2xl bg-slate-900 text-white">
              <span className="text-sm font-extrabold">L</span>
            </div>
            <div className="leading-tight">
              <p className="text-sm font-extrabold text-slate-900">Lifestyle</p>
              <p className="text-[11px] font-semibold text-slate-500 -mt-0.5">
                Menswear Store
              </p>
            </div>
          </Link>

          {/* Center: Links */}
          <nav className="hidden items-center gap-6 md:flex">
            <NavLink to="/" className={({ isActive }) => navClass(isActive)}>
              Home
            </NavLink>
            <NavLink
              to="/products"
              className={({ isActive }) => navClass(isActive)}
            >
              Products
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) => navClass(isActive)}
            >
              About Us
            </NavLink>
          </nav>

          {/* Right: Search + Icons */}
          <div className="flex items-center gap-2">
            {/* Search */}
            <form onSubmit={handleSearchSubmit} className="hidden lg:block">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search products..."
                  className="w-[320px] rounded-2xl border border-slate-200 bg-white px-10 py-2.5 text-sm outline-none focus:border-slate-400"
                />
              </div>
            </form>

            {/* Login */}
            <button
              onClick={() => setLoginOpen(true)}
              className="rounded-2xl border border-slate-200 bg-white p-2.5 shadow-sm hover:bg-slate-50 active:scale-95"
              aria-label="Login"
            >
              <User className="h-5 w-5 text-slate-800" />
            </button>

            {/* Wishlist */}
            <button
              onClick={() => navigate("/liked")}
              className="relative rounded-2xl border border-slate-200 bg-white p-2.5 shadow-sm hover:bg-slate-50 active:scale-95"
              aria-label="Liked products"
            >
              <Heart className="h-5 w-5 text-slate-800" />
              {likedCount > 0 && (
                <span className="absolute -right-2 -top-2 grid h-5 min-w-[20px] place-items-center rounded-full bg-red-600 px-1 text-[11px] font-extrabold text-white">
                  {likedCount}
                </span>
              )}
            </button>

            {/* Cart */}
            <button
              onClick={() => navigate("/cart")}
              className="relative rounded-2xl border border-slate-200 bg-white p-2.5 shadow-sm hover:bg-slate-50 active:scale-95"
              aria-label="Cart"
            >
              <ShoppingBag className="h-5 w-5 text-slate-800" />
              {cartCount > 0 && (
                <span className="absolute -right-2 -top-2 grid h-5 min-w-[20px] place-items-center rounded-full bg-slate-900 px-1 text-[11px] font-extrabold text-white">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile search */}
        <div className="mx-auto max-w-7xl px-4 pb-3 lg:hidden">
          <form onSubmit={handleSearchSubmit}>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search products..."
                className="w-full rounded-2xl border border-slate-200 bg-white px-10 py-2.5 text-sm outline-none focus:border-slate-400"
              />
            </div>
          </form>
        </div>
      </header>

      {/* Login Modal */}
      <LoginModal
        open={loginOpen}
        onClose={() => setLoginOpen(false)}
        onLogin={handleLogin}
        onRegister={(payload) => console.log("Register (fake):", payload)}
      />
    </>
  );
}
