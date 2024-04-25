"use client";
import { UserButton, useUser } from "@clerk/nextjs";
import React from "react";

function Trips() {
  const user = useUser();
  return (
    <div>
      <h1>Trips</h1>
      <UserButton afterSignOutUrl="/" />
    </div>
  );
}

export default Trips;
