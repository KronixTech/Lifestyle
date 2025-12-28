import { Link } from "react-router-dom";
import { Instagram, Twitter, Facebook, Mail, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-14 border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-10">
        <div className="grid gap-8 md:grid-cols-4">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2">
              <div className="grid h-10 w-10 place-items-center rounded-2xl bg-slate-900 text-white">
                <span className="text-sm font-extrabold">L</span>
              </div>
              <div>
                <p className="text-sm font-extrabold text-slate-900">Lifestyle</p>
                <p className="text-[11px] font-semibold text-slate-500 -mt-0.5">
                  Modern Menswear Store
                </p>
              </div>
            </div>

            <p className="mt-4 text-sm text-slate-600 leading-6">
              Lifestyle is built for clean, confident everyday fits. Smooth shopping,
              fast checkout, and premium basics.
            </p>

            <div className="mt-4 flex items-center gap-2">
              <a
                href="#"
                className="rounded-2xl border border-slate-200 p-2 hover:bg-slate-50"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="rounded-2xl border border-slate-200 p-2 hover:bg-slate-50"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="rounded-2xl border border-slate-200 p-2 hover:bg-slate-50"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-extrabold text-slate-900">Quick Links</h3>
            <ul className="mt-4 space-y-2 text-sm text-slate-600">
              <li><Link className="hover:text-slate-900" to="/">Home</Link></li>
              <li><Link className="hover:text-slate-900" to="/products">Products</Link></li>
              <li><Link className="hover:text-slate-900" to="/liked">Liked Products</Link></li>
              <li><Link className="hover:text-slate-900" to="/cart">Cart</Link></li>
            </ul>
          </div>

          {/* Policies */}
          <div>
            <h3 className="text-sm font-extrabold text-slate-900">Policies</h3>
            <ul className="mt-4 space-y-2 text-sm text-slate-600">
              <li><Link className="hover:text-slate-900" to="/terms">Terms & Conditions</Link></li>
              <li><Link className="hover:text-slate-900" to="/refund">Refund & Cancellation</Link></li>
              <li><Link className="hover:text-slate-900" to="/support">Customer Support</Link></li>
              <li><Link className="hover:text-slate-900" to="/contact">Contact Us</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-extrabold text-slate-900">Contact</h3>

            <div className="mt-4 space-y-3 text-sm text-slate-600">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>+91 90000 00000</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>support@lifestyle.com</span>
              </div>
              <p className="text-xs text-slate-500 leading-5">
                Working hours: Mon–Sat, 10 AM – 7 PM (IST)
              </p>
            </div>

            <div className="mt-4 rounded-3xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-xs font-semibold text-slate-700">
                Newsletter (UI-only)
              </p>
              <div className="mt-2 flex gap-2">
                <input
                  className="w-full rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-slate-400"
                  placeholder="Your phone / email"
                />
                <button className="rounded-2xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800">
                  Join
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-slate-200 pt-6 text-xs text-slate-500 md:flex-row">
          <p>© {new Date().getFullYear()} Lifestyle. All rights reserved.</p>
          <p className="text-center md:text-right">
            Built with React + Tailwind • Payments via Razorpay (placeholder)
          </p>
        </div>
      </div>
    </footer>
  );
}
