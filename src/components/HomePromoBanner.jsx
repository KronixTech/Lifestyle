import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import banner4 from "../assets/banners/banner4.jpg";

export default function HomePromoBanner() {
  const navigate = useNavigate();

  return (
    <section className="mx-auto max-w-7xl px-4 mt-14">
      <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-r from-slate-900 to-slate-800 text-white shadow-xl">
        {/* Decorative gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.12),transparent_40%)]" />

        <div className="relative grid gap-8 p-8 md:grid-cols-2 md:p-12">
          {/* Left content */}
          <div className="flex flex-col justify-center">
            <p className="text-xs font-semibold tracking-widest text-slate-300">
              LIMITED EDITION
            </p>

            <h2 className="mt-3 text-3xl font-extrabold leading-tight md:text-4xl">
              Upgrade Your <br />
              Everyday Style
            </h2>

            <p className="mt-4 max-w-md text-sm text-slate-300 leading-6">
              Discover premium essentials made for comfort, durability, and
              confidence. Curated collections designed for daily wear.
            </p>

            <div className="mt-6">
              <button
                onClick={() => navigate("/products")}
                className="inline-flex items-center gap-2 rounded-2xl bg-white px-6 py-3 text-sm font-semibold text-slate-900 hover:bg-slate-100 active:scale-[0.98]"
              >
                Shop the Collection <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-3xl bg-slate-700 aspect-[4/3] md:aspect-[16/10]">
            <img
              src={banner4}
              alt="Lifestyle collection"
              className="absolute inset-0 h-full w-full object-cover"
              loading="lazy"
              draggable="false"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
