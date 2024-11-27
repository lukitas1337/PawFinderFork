import AdoptSection from "../components/AdoptSection";
import ChoseSection from "../components/ChoseSection";
import Hero from "../components/Hero";
import Questionare from "../components/Questionare";
import { useUserAuth } from "../contexts/UserAuthContext";

function Home() {
  const { user } = useUserAuth();
  return (
    <main className="my-[15rem] relative">
      <Hero />
      <ChoseSection />
      <AdoptSection />
      {user && !user.questionnaire && <Questionare />}
    </main>
  );
}

export default Home;
