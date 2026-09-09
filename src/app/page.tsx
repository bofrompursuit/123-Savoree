import AppGate from "@/components/AppGate";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import RecipeCarousel from "@/components/RecipeCarousel";
import ToqueeTravelsSection from "@/components/ToqueeTravelsSection";
import AIRecipeSection from "@/components/AIRecipeSection";
import CommuniteeSection from "@/components/CommuniteeSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <AppGate>
      <Header />
      <main className="flex flex-1 flex-col">
        <Hero />
        <RecipeCarousel />
        <ToqueeTravelsSection />
        <AIRecipeSection />
        <CommuniteeSection />
      </main>
      <Footer />
    </AppGate>
  );
}
