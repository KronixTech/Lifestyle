import HomeHeroCarousel from "../components/HomeHeroCarousel";
import LatestProducts from "../components/LatestProducts";

export default function Home() {
  return (
    <div className="pb-12">
      <HomeHeroCarousel />
      <LatestProducts />

      {/* Next sections will come here */}
      <div className="mx-auto max-w-7xl px-4 mt-10">
        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-8">
          <h2 className="text-xl font-extrabold text-slate-900">
            Next: Promo Banner + Featured Categories
          </h2>
          <p className="mt-2 text-slate-600">
            Say “Next: Promo Banner” and I’ll create a creative banner section (not like screenshot).
          </p>
        </div>
      </div>
    </div>
  );
}
