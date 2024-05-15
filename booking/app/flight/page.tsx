/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState } from "react";
import Header from "../components/Header";
import { trendingFlight_data } from "@/data/trendingFlight_data";
import { motion } from "framer-motion";
import SearchFormFlight from "../components/FlightForm";

interface FlightSelection {
  location: string;
  destination: string;
}

function Flight() {
  const [selectedCity, setSelectedCity] = useState("Bogotá");
  const [selectedFlight, setSelectedFlight] = useState<FlightSelection | null>(
    null
  );

  const filteredFlights = trendingFlight_data.filter(
    (flight) => flight.location.split(",")[0] === selectedCity
  );

  const handleFlightSelection = (location: string, destination: string) => {
    setSelectedFlight({ location, destination });
  };

  return (
    <div>
      <Header isHome={false} />

      <main className="bg-[#054868]">
        <section className="max-w-7xl mx-auto p-5">
          <h2 className="font-bold text-5xl text-white">Vuelos</h2>
          <h3 className="text-white py-5 text-xl">
            Encuentra los mejores precios para tus vuelos
          </h3>
        </section>

        <section className="m-4 mt-0 px-2 lg:px-4">
          <SearchFormFlight selectedFlight={selectedFlight} />
        </section>

        <section className="max-w-7xl mx-auto mt-10 p-6 bg-white rounded-lg">
          <div className="pt-5">
            <h3 className="text-xl font-bold">
              Vuelos populares desde {selectedCity}
            </h3>
            <p className="font-light">
              Descubre los vuelos más populares de la semana
            </p>
            <p className="font-light">
              <select
                className="bg-white border border-gray-300 rounded px-4 py-2 mt-2 mb-4"
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
              >
                <option value="Bogotá">Bogotá</option>
                <option value="Medellín">Medellín</option>
              </select>
            </p>
          </div>
          <motion.div
            className="flex space-x-4 py-5 overflow-x-scroll"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.6,
              delay: 0.4,
              ease: [0, 0.71, 0.2, 1.01],
            }}
          >
            {filteredFlights.map((item) => (
              <motion.div
                key={item.id}
                className="space-y-1 shrink-0 cursor-pointer ml-3"
                whileHover={{ scale: 1.03 }}
                onClick={() =>
                  handleFlightSelection(item.location, item.destination)
                }
              >
                <img
                  key={item.id}
                  className="w-80 h-72 object-cover rounded-lg pb-2"
                  src={item.src}
                  alt="trending"
                />
                <p className="font-bold">{item.destination}</p>
                <p className="font-bold">{item.price}</p>
                <p className="text-sm">{item.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </section>
      </main>
    </div>
  );
}

export default Flight;
