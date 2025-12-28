import { useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { homeBanners } from "../data/homeBanners";

export default function HomeHeroCarousel() {
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();

  const slides = useMemo(() => homeBanners, []);

  function prev() {
    setIndex((i) => (i === 0 ? slides.length - 1 : i - 1));
  }
  function next() {
    setIndex((i) => (i === slides.length - 1 ? 0 : i + 1));
  }

  // Auto-play
  useEffect(() => {
    const t = setInterval(() => {
      setIndex((i) => (i === slides.length - 1 ? 0 : i + 1));
    }, 5000);
    return () => clearInterval(t);
  }, [slides.length]);

  const s = slides[index];

  return (
    <section className="mx-auto max-w-7xl px-4 pt-6 pb-2">
      <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-xl">
        {/* Background glow */}
        <div className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-slate-900/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-slate-900/10 blur-3xl" />

        <div className="grid items-stretch gap-0 lg:grid-cols-2">
          {/* Left content */}
          <div className="relative p-6 sm:p-10">
            <div className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold text-white">
              <Sparkles className="h-4 w-4" />
              {s.eyebrow}
              <span className="rounded-full bg-white/15 px-2 py-0.5 text-[11px]">
                {s.tag}
              </span>
            </div>

            <h1 className="mt-5 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              {s.title}
            </h1>

            <p className="mt-3 max-w-lg text-sm leading-6 text-slate-600 sm:text-base">
              {s.desc}
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <button
                onClick={() => navigate("/products")}
                className="rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-slate-800 active:scale-[0.99]"
              >
                {s.ctaPrimary}
              </button>

              <button
                onClick={() => navigate("/about")}
                className="rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-slate-50 active:scale-[0.99]"
              >
                {s.ctaSecondary}
              </button>
            </div>

            {/* Dots */}
            <div className="mt-8 flex items-center gap-2">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  aria-label={`Go to slide ${i + 1}`}
                  className={`h-2.5 rounded-full transition ${
                    i === index ? "w-10 bg-slate-900" : "w-2.5 bg-slate-300 hover:bg-slate-400"
                  }`}
                />
              ))}
            </div>

            {/* Arrows */}
            <div className="mt-6 flex items-center gap-2 lg:hidden">
              <button
                onClick={prev}
                className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm hover:bg-slate-50 active:scale-95"
                aria-label="Previous"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={next}
                className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm hover:bg-slate-50 active:scale-95"
                aria-label="Next"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Right image */}
          <div className="relative min-h-[260px] lg:min-h-[420px]">
            {/* Image */}
            <img
              src={s.image}
              alt={s.title}
              className="h-full w-full object-cover"
              draggable="false"
            />

            {/* Dark gradient */}
            <div className="absolute inset-0 bg-gradient-to-tr from-black/25 via-transparent to-black/10" />

            {/* Desktop arrows */}
            <div className="absolute inset-x-4 bottom-4 hidden items-center justify-between lg:flex">
              <button
                onClick={prev}
                className="rounded-2xl bg-white/80 p-3 shadow-md backdrop-blur hover:bg-white active:scale-95"
                aria-label="Previous slide"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>

              <button
                onClick={next}
                className="rounded-2xl bg-white/80 p-3 shadow-md backdrop-blur hover:bg-white active:scale-95"
                aria-label="Next slide"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Small feature badges row */}
      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        <Badge title="Fast Delivery" desc="Quick dispatch & tracking updates." />
        <Badge title="Easy Returns" desc="Hassle-free return policy." />
        <Badge title="Secure Checkout" desc="Trusted & encrypted payments." />
      </div>
    </section>
  );
}

function Badge({ title, desc }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <p className="text-sm font-bold text-slate-900">{title}</p>
      <p className="mt-1 text-sm text-slate-600">{desc}</p>
    </div>
  );
}
