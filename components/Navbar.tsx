"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import { PrimaryButton } from "./ui/Button";

const Navbar = () => {
  const session = useSession();

  return (
    <div className="bg-neutral-100 p-4">
      <div className="flex justify-between max-w-6xl mx-auto">
        <div className="text-xl font-bold flex flex-col justify-center">
          ShiftyFi
        </div>
        <div>
          {session.data?.user ? (
            <PrimaryButton
              onClick={() => {
                signOut();
              }}
            >
              Log out
            </PrimaryButton>
          ) : (
            <PrimaryButton
              onClick={() => {
                signIn("google");
              }}
            >
              Get Started
            </PrimaryButton>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
