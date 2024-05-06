import Hero from "./components/Hero";
import Header from "./components/Header";
import { new_flight } from "./api/flight/services/amadeus";

//var a = new_flight("SYD","BKK","2024-07-01","2")
export default function Home() {

  return (
    <div className="relative">
      <Header />
      <div className="absolute inset-0 z-[-1]">
        <Hero />
      </div>
    </div>
  );
}
