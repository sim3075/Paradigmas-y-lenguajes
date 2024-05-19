import Header from "@/app/components/Header";
import { SignIn } from "@clerk/nextjs";
import Image from "next/image";
import Transition from "@/app/components/Transition";

export default function Page() {
  return (
    <Transition>
      <Header isHome={true} />
      <div className="absolute inset-0 z-[-1]">
        <div className="flex h-screen w-1/2">
          <Image src="/login-bg.jpg" alt="background" fill />
          <div className="absolute inset-0 bg-gray-950 opacity-50"></div>
        </div>
      </div>
      <div className="flex justify-center p-5">
        <SignIn path="/sign-in" />
      </div>
    </Transition>
  );
}
