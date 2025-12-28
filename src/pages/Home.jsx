import HomeHeroCarousel from "../components/HomeHeroCarousel";
import LatestProducts from "../components/LatestProducts";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import HomePromoBanner from "../components/HomePromoBanner";


export default function Home() {
  return (
    <div className="pb-12">
      <HomeHeroCarousel />
      <LatestProducts />

     <HomePromoBanner />
    </div>
  );
}
