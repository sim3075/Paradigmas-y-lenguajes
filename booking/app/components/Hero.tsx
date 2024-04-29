import React from "react";
import Image from "next/image";
import { Signika_Negative } from "next/font/google";

const signika_font = Signika_Negative({ subsets: ["latin"] });

function Hero() {
  return (
    <div className="hero">
      <div className="relative h-screen">
        <Image src="/background.jpg" alt="background" fill />
        <div className="absolute inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
          <div className="text-center md:text-left text-white">
            <h1 className="text-6xl font-extrabold mb-4">
              <div className={signika_font.className}>
                EL VIAJE <br /> COMIENZA CON <br /> UN SOLO PASO
              </div>
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
