/* eslint-disable @next/next/no-img-element */
"use client";
import React from "react";
import Header from "../components/Header";
import { trending_data } from "@/data/trending";
import SearchForm from "../components/SearchForm";
import { motion } from "framer-motion";

function Travel() {
  return (
    <div>
      <Header isHome={false} />

      <main className="bg-[#054868]">
        <section className="max-w-7xl mx-auto p-5">
          <h2 className="font-bold text-5xl text-white">
            Busca tu nuevo destino
          </h2>
          <h3 className="text-white py-5 text-xl">
            Encuentra los mejores precios para tus viajes
          </h3>
        </section>

        <section className="m-4 mt-0  px-2 lg:px-4">
          <SearchForm />
        </section>

        <section className="max-w-7xl mx-auto mt-10 p-6 bg-white rounded-lg">
          <div className="pt-5">
            <h3 className="text-xl font-bold">Destinos populares</h3>
            <p className="font-light">
              Descubre los destinos más populares de la semana
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
            {trending_data.map((item) => (
              <motion.div
                key={item.id}
                className="space-y-1 shrink-0 cursor-pointer ml-3"
                whileHover={{ scale: 1.03 }}
              >
                <img
                  key={item.id}
                  className="w-80 h-72 object-cover rounded-lg pb-2"
                  src={item.src}
                  alt="trending"
                />
                <p className="font-bold">{item.title}</p>
                <p className="text-sm">{item.location}</p>
                <p className="text-sm">{item.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </section>
      </main>
    </div>
  );
}

export default Travel;
