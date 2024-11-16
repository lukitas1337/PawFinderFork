import AdobtSection from "../components/AdobtSection";
import ChoseSection from "../components/ChoseSection";
import Hero from "../components/Hero";

function Home() {
  return (
    <main className="my-[15rem]">
      <Hero />
      <ChoseSection />
      <AdobtSection />
    </main>
  );
}

export default Home;
