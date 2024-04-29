"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import SearchBox from "./SearchBox";
import { UserButton, useUser } from "@clerk/nextjs";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  //Comprobamos si el usuario está autenticado en la aplicacion
  const { isSignedIn, user } = useUser();

  const headerMenu = [
    {
      id: 1,
      name: "Hotel",
      path: "/hotel",
    },
    {
      id: 2,
      name: "Flight",
      path: "/flight",
    },
    {
      id: 3,
      name: "Train",
      path: "/train",
    },
    {
      id: 4,
      name: "Travel",
      path: "/travel",
    },
    {
      id: 5,
      name: "Car Rental",
      path: "/car",
    },
  ];

  return (
    <div className="p-2 pb-0.5 pl-3 border-b-[4px] border-gray-200">
      <div className="flex items-center">
        <motion.div
          className="flex items-center gap-1"
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Image src="/logo.png" alt="logo-booktrip" width={70} height={70} />
          <Link href={"/"}>
            <span className="font-bold text-[24px]">BookTrip</span>
          </Link>
          {/*<Image src="/logo-w.png" alt="logo" width={90} height={70} />*/}
        </motion.div>
        <div className="md:hidden flex justify-center">
          <div className="absolute right-3 top-5">
            <button onClick={toggleMenu}>
              <Image src="/menu-icon.png" alt="Menu" width={32} height={32} />
            </button>
          </div>
        </div>
        {/* Menu normal de pantallas grandes*/}
        <motion.div
          className="hidden md:flex items-center gap-6 ml-7"
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          {headerMenu.map((item) => (
            <div key={item.id} className="flex items-center gap-2">
              <Link href={item.path}>
                <h2 className="font-md text-[19px]">{item.name}</h2>
              </Link>
            </div>
          ))}
        </motion.div>
        <div className="flex-grow">
          <div className="flex justify-center mr-20 ">
            <SearchBox /> {/* Barra de busqueda de lugares */}
          </div>
        </div>
        {!isSignedIn ? (
          <div className="hidden md:flex">
            <div className="flex justify-center gap-10 mr-5">
              <Link href="sign-up">Register</Link>
              <Link href="sign-in">Login</Link>
            </div>
          </div>
        ) : (
          <div className="flex justify-center gap-3">
            <p>{user.username}</p>
            <UserButton afterSignOutUrl="/" />
          </div>
        )}
      </div>
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="md:hidden fixed top-14 right-3 bg-[#1f57a2] shadow-lg rounded-md p-4 z-50"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
          >
            {headerMenu.map((item) => (
              <div key={item.id} className="flex items-center gap-2 mt-3">
                <Link href={item.path}>
                  <h2 className="font-bold text-[19px]">{item.name}</h2>
                </Link>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Header;
