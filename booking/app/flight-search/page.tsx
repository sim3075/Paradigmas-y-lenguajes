/* eslint-disable @next/next/no-img-element */
import { notFound } from "next/navigation";
import Header from "../components/Header";
import { scrapper } from "@/lib/scrapper";
import Link from "next/link";
type Props = {
  searchParams: flightParams;
};

export type flightParams = {
  origin: string;
  destination: string;
  departureDate: string;
  passengers: string;
};

async function SearchPage({ searchParams }: Props) {
  if (!searchParams.origin) return notFound();

  //console.log(
  //  `localhost:3000/api/car/search?origin=${searchParams.location}&brand=${searchParams.brand}`
  //);
  const results = await fetch(
    `http://localhost:3000/api/flight/search?origin=${searchParams.origin}&destination=${searchParams.destination}&departureDate=${searchParams.departureDate}&passengers=${searchParams.passengers}`
  );

  const data = await results.json();

  if (!results) return <div>No results...</div>;

  return (
    <section>
      <Header isHome={false} />
      <div className="mx-auto max-w-7xl p-6 lg:px-8">
        <h1 className="text-4xl font-bold pb-3">
          Tus resultados de vuelos de avión
        </h1>

        <h2 className="pb-3">
          Fecha de salida de los vueos
          <span className="italic ml-2">{searchParams.departureDate}</span>
        </h2>

        <hr className="mb-5" />

        <h3 className="font-semibold text-xl">
          {/* Aquí se muestra la lista de resultados de la búsqueda*/}
        </h3>

        <div className="space-y-2 mt-5">
          {data.map((item: any, i: any) => (
            <div
              key={i}
              className="flex space-y-2 justify-between space-x-4 p-5 border rounded-lg"
            >
              <img
                src={item.photo}
                alt="image of property"
                className="h-44 w-54 rounded-lg"
              />

              <div className="flex flex-1 space-x-5 justify-between">
                <div>
                  <p className="text-xl text-bold">
                    {item.brand} en {item.city}
                  </p>
                  <p className="text-sm">{item.description}</p>
                </div>

                <div className="flex flex-col justify-between">
                  <div className="flex items-start justify-end space-x-2 text-right">
                    <div>
                      <p className="font-bold">Calificación</p>
                      <p className="text-xs">Excelente</p>
                    </div>

                    <p className="flex items-center justify-center font-bold text-sm w-10 h-10 text-white bg-blue-900 rounded-lg flex-shrink-0">
                      {item.rating || "N/A"}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-lg ">Asientos: {item.seats}</p>
                    <p className="text-2xl font-bold">{item.price}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default SearchPage;
