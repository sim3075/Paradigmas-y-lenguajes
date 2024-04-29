import Hero from "./components/Hero";
import Header from "./components/Header";

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
