import { Skeleton } from "@/components/ui/skeleton";
import Header from "../components/Header";

function LoadingResults() {
  return (
    <section>
      <Header isHome={false} />
      <div className="mx-auto max-w-7xl">
        <p className="text-center animate-pulse font-bold text-[#013B94] pt-10">
          Danos un momento - Estamos buscando las mejores ofertas para ti desde
          Booking!
        </p>
      </div>

      <div className="flex justify-center py-10">
        <div className="w-10 h-10 bg-[#013B94] rounded-full animate-bounce"></div>
      </div>

      <div className="space-y-2 p-5">
        {[...Array(10)].map((_, i) => (
          <div key={i} className="flex space-x-2 mx-auto max-w-7xl">
            <Skeleton className="h-20 w-20 md:h-44 md:w-44 rounded-lg" />
            <Skeleton className="h-44 w-full rounded-lg" />
          </div>
        ))}
      </div>
    </section>
  );
}
export default LoadingResults;
