"use client";
import { UserButton, useUser } from "@clerk/nextjs";
import React from "react";

function Travel() {
  const user = useUser();
  return (
    <div>
      <h1>Travel</h1>
      <UserButton afterSignOutUrl="/" />
    </div>
  );
}

export default Travel;
