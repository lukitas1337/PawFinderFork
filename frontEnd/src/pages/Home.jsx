import AdoptSection from "../components/AdoptSection";
import ChoseSection from "../components/ChoseSection";
import Hero from "../components/Hero";

function Home() {
  return (
    <main className="my-[15rem]">
      <Hero />
      <ChoseSection />
      <AdoptSection />
    </main>
  );
}

export default Home;
