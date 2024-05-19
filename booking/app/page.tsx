import Hero from "./components/Hero";
import Header from "./components/Header";
import Transition from "./components/Transition";

//var a = new_flight("SYD","BKK","2024-07-01","2")
export default function Home() {
  return (
    <Transition>
      <div className="relative">
        <Header isHome={true} />
        <div className="absolute inset-0 z-[-1]">
          <Hero />
        </div>
      </div>
    </Transition>
  );
}
