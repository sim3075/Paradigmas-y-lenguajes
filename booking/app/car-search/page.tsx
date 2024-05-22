/* eslint-disable @next/next/no-img-element */
import { notFound } from "next/navigation";
import Header from "../components/Header";
import { scrapper } from "@/lib/scrapper";
import Link from "next/link";
type Props = {
  searchParams: carParams;
};

export type carParams = {
  location: string;
  pickupDate: string;
  returnDate: string;
  brand: string;
};

async function SearchPage({ searchParams }: Props) {
  if (!searchParams.location) return notFound();

  console.log(
    `localhost:3000/api/car/search?origin=${searchParams.location}&brand=${searchParams.brand}`
  );
  const results = fetch(
    `http://localhost:3000/api/car/search?origin=${searchParams.location}&brand=${searchParams.brand}`
  ).then(async (res) => {
    await res.json();
  });

  if (!results) return <div>No results...</div>;

  return (
    <section>
      <Header isHome={false} />
      <div className="mx-auto max-w-7xl p-6 lg:px-8">
        <h1 className="text-4xl font-bold pb-3">
          Tus resultados de alquiler de carros
        </h1>

        <h2 className="pb-3">
          Fecha de recogida del carro
          <span className="italic ml-2">{searchParams.pickupDate}</span>
        </h2>

        <hr className="mb-5" />

        <h3 className="font-semibold text-xl">
          {/* Aquí se muestra la lista de resultados de la búsqueda*/}
        </h3>

        {/*<div className="space-y-2 mt-5">
          {results..map((item, i) => (
            <div
              key={i}
              className="flex space-y-2 justify-between space-x-4 p-5 border rounded-lg"
            >
              <img
                src={item.url}
                alt="image of property"
                className="h-44 w-44 rounded-lg"
              />

              <div className="flex flex-1 space-x-5 justify-between">
                <div>
                  <Link
                    href={item.link}
                    className="font-bold text-blue-500 hover:text-blue-600 hover:underline"
                  >
                    {item.title}
                  </Link>
                  <p className="text-xs">{item.description}</p>
                </div>

                <div className="flex flex-col justify-between">
                  <div className="flex items-start justify-end space-x-2 text-right">
                    <div>
                      <p className="font-bold">{item.rating_word}</p>
                      <p className="text-xs">{item.rating_count}</p>
                    </div>

                    <p className="flex items-center justify-center font-bold text-sm w-10 h-10 text-white bg-blue-900 rounded-lg flex-shrink-0">
                      {item.rating || "N/A"}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-xs ">{item.booking_metadata}</p>
                    <p className="text-2xl font-bold">{item.price}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>*/}
      </div>
    </section>
  );
}

export default SearchPage;
